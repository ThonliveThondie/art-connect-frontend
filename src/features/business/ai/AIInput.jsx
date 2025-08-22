import SendBtnActive from '../../../assets/images/send-btn-active.svg';
import SendBtnDefault from '../../../assets/images/send-btn-default.svg';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {aiRecommendApi} from '../../../api/ai/recommend';
import {useStore} from '../../../store/useStore';

export default function HomeBusiness() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Zustand store에서 토큰 가져오기
  const token = useStore((state) => state.token);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      // AI 추천 API 호출 (토큰 포함)
      const result = await aiRecommendApi(inputValue.trim(), token);
      
      // 결과 페이지로 이동하면서 데이터 전달
      navigate('/dashboard/ai/result', {
        state: { 
          searchQuery: inputValue.trim(),
          recommendResult: result 
        },
      });
    } catch (error) {
      // 인증 오류인 경우 로그인 페이지로 리디렉션
      if (error.message.includes('401') || error.message.includes('인증')) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/login');
        return;
      }
      
      // 기타 오류 처리
      alert(error.message || 'AI 추천 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full px-[20px] py-[60px]">
      <section className="mx-auto min-w-[700px] px-[120px] pb-[64px] mb-[32px]">
        <h1 className="font-[700] text-[28px] text-center mb-[18px]">AI 기반 디자인 추천 받기</h1>

        <p className="text-center text-black/50 text-[18px]">
          매장이나 브랜드에 대한 간단한 정보를 입력하면,
          <br />
          AI가 최적의 디자인 스타일을 제안하고 어울리는 디자이너도 함께 추천해드려요
        </p>

        {/* 입력 영역 */}
        <div
          className="flex flex-col mx-auto w-full rounded-[13px] shadow-[0_3px_20px_rgba(0,0,0,0.1)] 
         mt-[61px] px-[28px] py-[30px] gap-[10px]"
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={(e) => {
              e.target.style.height = '24px'; // 높이 초기화
              e.target.style.height = e.target.scrollHeight + 'px'; // 내용에 맞게 높이 조절
            }}
            onKeyPress={handleKeyPress}
            className="w-full text-[16px] outline-none resize-none overflow-hidden"
            placeholder="예: 따뜻한 감성의 빈티지 카페, 20대 여성 타깃, 아늑하고 편안한 분위기를 원해요."
          />

          <button 
            type="button" 
            className="self-end" 
            disabled={!inputValue.trim() || isLoading} 
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <img src={inputValue.trim() ? SendBtnActive : SendBtnDefault} alt="보내기 버튼" />
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
