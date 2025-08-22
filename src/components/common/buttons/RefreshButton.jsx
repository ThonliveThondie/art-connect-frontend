import RefreshIcon from '../../../assets/images/refresh-btn.svg?react';
import {useState} from 'react';

export default function RefreshButton({onClick, className = '', disabled = false, hoverText = '다른 디자이너 추천'}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center h-[38px] w-[38px] rounded-full 
          ${disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#E64C4C] hover:bg-[#BC3B3B] cursor-pointer'
          } ${className}`}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <RefreshIcon className={disabled ? 'opacity-50' : ''} />
      </button>

      {isHovered && !disabled && (
        <div className="absolute top-10 bg-black text-white px-[6px] py-[2px] rounded-[4px] text-[12px] font-[600] whitespace-nowrap z-10">
          {hoverText}
        </div>
      )}
    </div>
  );
}
