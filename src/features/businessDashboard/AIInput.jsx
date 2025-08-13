import SendBtnActive from '../../assets/images/send-btn-active.svg';
import SendBtnDefault from '../../assets/images/send-btn-default.svg';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function HomeBusiness() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (inputValue.trim()) {
      navigate('/ai-recommendation-result', {
        state: {searchQuery: inputValue.trim()},
      });
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
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

          <button type="button" className="self-end" disabled={!inputValue.trim()} onClick={handleSubmit}>
            <img src={inputValue.trim() ? SendBtnActive : SendBtnDefault} alt="보내기 버튼" />
          </button>
        </div>
      </section>
    </div>
  );
}
