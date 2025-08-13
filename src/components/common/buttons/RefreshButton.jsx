import RefreshIcon from '../../../assets/images/refresh-btn.svg?react';
import {useState} from 'react';

export default function RefreshButton({onClick, className = ''}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center justify-center h-[38px] w-[38px] rounded-full bg-[#E64C4C] hover:bg-[#BC3B3B] ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <RefreshIcon />
      </button>

      {isHovered && (
        <div className="absolute top-10 bg-black text-white px-[6px] py-[2px] rounded-[4px] text-[12px] font-[600] whitespace-nowrap z-10">
          다른 디자이너 추천
        </div>
      )}
    </div>
  );
}
