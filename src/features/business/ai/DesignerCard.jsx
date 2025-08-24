import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import WorkRequestModal from '../../../components/modal/WorkRequest';
import AcceptButton from '../../../components/common/buttons/AcceptButton';
import RefreshButton from '../../../components/common/buttons/RefreshButton';

import SampleImg1 from '../../../assets/samples/image1.jpg';
import SampleImg2 from '../../../assets/samples/image2.jpg';
import DefaultProfile from '../../../assets/icons/default-profile.svg';

export default function DesignerCard({
  designerId = 'designer123',
  designer = null,
  designerIndex,
  onRefresh,
  isRefreshing = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 디자이너 데이터에서 정보 추출
  const nickname = designer?.nickname || '디자이너';
  const specialty = designer?.specialty || '전문 분야 정보 없음';
  const profileImageUrl = designer?.profileImageUrl || DefaultProfile;

  // portfolioImageUrl 배열에서 imageUrl 추출
  const portfolioImages = designer?.portfolioImageUrl?.map((item) => item.imageUrl) || [];

  const handlePortfolioView = () => {
    navigate('/portfolio', {
      state: {viewMode: 'browse', designerId},
    });
  };
  return (
    <>
      {/* 카드: 높이 살짝 축소(패딩/갭/폰트 clamp 하한을 낮춤), w-full로 그리드 셀을 채움 */}
      <div
        className="
          relative flex h-full flex-col
          gap-[clamp(10px,1.0vw,14px)]
          flex-none shrink-0
          rounded-[12px] border border-black/10
          px-[clamp(14px,1.2vw,20px)] py-[clamp(10px,1.0vw,16px)]
          overflow-hidden bg-white
          w-full
        "
      >
        {/* 우상단 액션 버튼: 여백도 살짝 축소 */}
        <div className="absolute top-[clamp(6px,0.8vw,10px)] right-[clamp(10px,1.0vw,16px)] flex items-center gap-[10px]">
          <AcceptButton hoverText="작업 의뢰서 보내기" onClick={() => setIsModalOpen(true)} />
          <RefreshButton
            onClick={onRefresh}
            disabled={isRefreshing}
            hoverText={isRefreshing ? '새로운 디자이너 추천 중...' : '새로운 디자이너 추천'}
          />
        </div>

        {/* 프로필 영역: 이미지/텍스트 크기 살짝 유동, 높이 축소 */}
        <div className="flex items-center gap-[clamp(8px,0.9vw,12px)]">
          <img
            src={profileImageUrl}
            alt="디자이너 프로필"
            className="
              w-[clamp(48px,4vw,60px)] h-[clamp(48px,4vw,60px)]
              rounded-full object-cover bg-[#F6F5F4]
              flex-none shrink-0
            "
            onError={(e) => {
              e.currentTarget.src = DefaultProfile;
            }}
          />
          <div className="flex min-w-0 flex-col gap-[4px]">
            <p className="font-[600] leading-tight truncate text-[clamp(15px,1.1vw,16px)]">{nickname}</p>
            <p className="text-[#5F5E5B] leading-tight truncate text-[clamp(12px,1.0vw,14px)]">{specialty}</p>
          </div>
        </div>

        {/* 포트폴리오 라벨/링크 */}
        <div className="flex items-center gap-[8px]">
          <p className="text-[#5F5E5B] text-[clamp(12px,1.0vw,14px)]">포트폴리오</p>
          <button className="underline text-[clamp(12px,1.0vw,14px)]" onClick={handlePortfolioView}>
            자세히 보기
          </button>
        </div>

        {/* 썸네일 2장: 
            - 반응형 래퍼(div) + aspect-[21/9]로 세로 높이 축소
            - 내부 img는 absolute로 꽉 채우고 object-cover 유지
            - gap도 clamp로 유동 적용 */}
        <div className="flex items-stretch gap-[clamp(8px,1vw,14px)]">
          {portfolioImages.length > 0 ? (
            <>
              <div className="relative flex-1 rounded-[8px] bg-[#F6F5F4] overflow-hidden aspect-[21/9]">
                <img
                  src={portfolioImages[0]}
                  alt="포트폴리오 샘플 1"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = SampleImg1;
                  }}
                />
              </div>

              {portfolioImages[1] ? (
                <div className="relative flex-1 rounded-[8px] bg-[#F6F5F4] overflow-hidden aspect-[21/9]">
                  <img
                    src={portfolioImages[1]}
                    alt="포트폴리오 샘플 2"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = SampleImg2;
                    }}
                  />
                </div>
              ) : (
                <div className="flex-1 rounded-[8px] bg-[#F6F5F4] aspect-[21/9] flex items-center justify-center text-gray-400 text-sm">
                  포트폴리오 이미지 없음
                </div>
              )}
            </>
          ) : (
            <>
              <div className="relative flex-1 rounded-[8px] bg-[#F6F5F4] overflow-hidden aspect-[21/9]">
                <img src={SampleImg1} alt="포트폴리오 샘플 1" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="relative flex-1 rounded-[8px] bg-[#F6F5F4] overflow-hidden aspect-[21/9]">
                <img src={SampleImg2} alt="포트폴리오 샘플 2" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 모달: 기존 기능 유지 */}
      <WorkRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} designerId={designerId} />
    </>
  );
}
