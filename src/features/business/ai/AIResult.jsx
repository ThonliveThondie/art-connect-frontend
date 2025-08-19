import {useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import EmojiPalette from '../../../assets/images/emoji-palette.svg?react';
import EmojiEyes from '../../../assets/images/emoji-eyes.svg?react';
import EmojiBag from '../../../assets/images/emoji-bag.svg';
import DesignerCard from './DesignerCard';

export default function AIResult() {
  const summaryData = [
    {
      icon: <EmojiPalette />,
      title: '디자인 방향',
      items: ['따뜻하고 아늑한 분위기', '감성적인 빈티지', '톤다운된 파스텔 계열 색상'],
    },
    {
      icon: <EmojiEyes />,
      title: '타겟 고객',
      items: ['20대 여성', 'SNS 감성 카페를 선호하는 고객층', '기타 등등'],
    },
    {
      icon: <img src={EmojiBag} alt="가방 이모지" className="w-4 h-4" />,
      title: '필요한 디자인',
      items: ['로고', '메뉴판', '포장 디자인'],
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state?.searchQuery ?? '';
  const taRef = useRef(null);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = '24px';
    const h = Math.max(el.scrollHeight, 24);
    el.style.height = h + 'px';
  }, [searchQuery]);

  useEffect(() => {
    if (!location.state) {
      // state가 없으면 AIInput.jsx 페이지로 이동
      // navigate('/ai-input');
    }
  }, [location.state, navigate]);

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
        <div className="">
          <h3 className="mb-[18px] font-[600] text-[18px]">AI 제안 요약</h3>
          <div className="flex gap-[18px]  ">
            {summaryData.map((block, idx) => (
              <div key={idx} className="w-[308px] bg-[#FBFAF9] px-[19px] py-[12px] rounded-[12px] ">
                <div className="flex items-center gap-[4px] mb-[16px]">
                  {block.icon}
                  <span className="text-[16px] font-semibold">{block.title}</span>
                </div>
                <ul className="list-disc list-inside space-y-[10px] tiny-marker">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 매칭 디자이너 */}
        <div>
          <h3 className="mb-[18px] font-[600] text-[18px]">매칭 디자이너</h3>
          <div className="flex gap-10">
            <DesignerCard />
            <DesignerCard />
          </div>
        </div>
      </section>
    </div>
  );
}
