import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import EmojiPalette from '../../../assets/images/emoji-palette.svg?react';
import EmojiEyes from '../../../assets/images/emoji-eyes.svg?react';
import EmojiBag from '../../../assets/images/emoji-bag.svg';
import DesignerCard from './DesignerCard';
import {aiRefreshApi} from '../../../api/ai/recommend';
import {useStore} from '../../../store/useStore';

export default function AIResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state?.searchQuery ?? '';
  const initialRecommendResult = location.state?.recommendResult;
  const taRef = useRef(null);

  // 상태 관리
  const [recommendResult, setRecommendResult] = useState(initialRecommendResult);
  const [refreshingIndex, setRefreshingIndex] = useState(null); // 새로고침 중인 디자이너 인덱스

  // Zustand store에서 토큰 가져오기
  const token = useStore((state) => state.token);

  // API 응답 데이터에서 proposal 추출
  const proposal = recommendResult?.proposal || {};
  const recommendedDesigners = recommendResult?.recommendedDesigners || [];
  const sessionId = recommendResult?.sessionId;

  // API 데이터를 기반으로 summaryData 구성
  const summaryData = [
    {
      icon: <EmojiPalette />,
      title: '디자인 방향',
      content: proposal.designDirection || '디자인 방향 정보가 없습니다.',
    },
    {
      icon: <EmojiEyes />,
      title: '타겟 고객',
      content: proposal.targetCustomer || '타겟 고객 정보가 없습니다.',
    },
    {
      icon: <img src={EmojiBag} alt="가방 이모지" className="w-4 h-4" />,
      title: '필요한 디자인',
      content: proposal.requiredDesigns || '필요한 디자인 정보가 없습니다.',
    },
  ];

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = '24px';
    const h = Math.max(el.scrollHeight, 24);
    el.style.height = h + 'px';
  }, [searchQuery]);

  // 개별 디자이너 새로고침 함수
  const handleRefreshSingleDesigner = async (designerIndex) => {
    if (!sessionId || !token || refreshingIndex !== null) {
      return;
    }

    setRefreshingIndex(designerIndex);

    try {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      // 새로운 디자이너 추천 API 호출
      const result = await aiRefreshApi(sessionId, token);

      console.log('새로고침 API 응답:', result); // 디버깅용 로그

      const newDesigners = Array.isArray(result) ? result : result?.recommendedDesigners || [];

      if (newDesigners.length > 0) {
        // 새로운 디자이너가 있으면 해당 인덱스의 디자이너만 교체
        const newDesigner = newDesigners[0]; // 첫 번째 새로운 디자이너 사용

        setRecommendResult((prev) => ({
          ...prev,
          recommendedDesigners: prev.recommendedDesigners.map((designer, index) =>
            index === designerIndex ? newDesigner : designer
          ),
        }));
      }
    } catch (error) {
      // 인증 오류인 경우 로그인 페이지로 리디렉션
      if (error.message.includes('401') || error.message.includes('인증')) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/login');
        return;
      }

      // 기타 오류 처리
      alert(error.message || '새로운 디자이너 추천 요청 중 오류가 발생했습니다.');
    } finally {
      setRefreshingIndex(null);
    }
  };

  useEffect(() => {
    if (!location.state || !initialRecommendResult) {
      // state가 없거나 recommendResult가 없으면 AI 입력 페이지로 이동
      navigate('/dashboard/ai', {replace: true});
    }
  }, [location.state, initialRecommendResult, navigate]);

  return (
    <div className="w-full px-[20px] py-[60px]">
      <section className="flex flex-col gap-[32px] mx-auto min-w-[1000px] px-[120px]">
        {/* 입력 (읽기 전용) */}
        <div className="flex flex-col mx-auto w-full rounded-[13px] shadow-[0_3px_20px_rgba(0,0,0,0.1)] px-[28px] py-[30px] gap-[10px]">
          <textarea
            ref={taRef}
            value={searchQuery}
            readOnly
            onLoad={(e) => {
              e.target.style.height = '24px';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className="w-full text-[16px] outline-none resize-none overflow-hidden"
          />
        </div>

        {/* AI 제안 요약 */}
        <div>
          <h3 className="mb-[18px] font-[600] text-[18px]">AI 제안 요약</h3>
          <div className="flex flex-col gap-[12px]">
            {summaryData.map((block, idx) => (
              <div key={idx} className="w-full bg-[#FBFAF9] px-[19px] py-[12px] rounded-[12px]">
                <div className="flex items-center gap-[6px] mb-[12px]">
                  {block.icon}
                  <span className="text-[16px] font-semibold">{block.title}</span>
                </div>

                <p className="text-[14px] leading-relaxed text-gray-700">{block.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 매칭 디자이너 */}
        <div>
          <h3 className="mb-[18px] font-[600] text-[18px]">매칭 디자이너</h3>

          {/* 중앙 레일 + 2열 그리드 + 갭 유동 + 동일 높이 */}
          <div className="mx-auto w-full max-w-[1280px]">
            <div
              className="
                grid grid-cols-1 md:grid-cols-2
                items-stretch
                gap-[clamp(16px,2vw,40px)]
              "
            >
              {recommendedDesigners.length > 0 ? (
                recommendedDesigners.map((designer, index) => (
                  <DesignerCard
                    key={`${designer.userId}-${index}`}
                    designerId={designer.userId}
                    designer={designer}
                    designerIndex={index}
                    onRefresh={() => handleRefreshSingleDesigner(index)}
                    isRefreshing={refreshingIndex === index}
                    sessionId={sessionId}
                  />
                ))
              ) : (
                <div className="col-span-full w-full text-center py-8 text-gray-500">
                  추천할 수 있는 디자이너가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
