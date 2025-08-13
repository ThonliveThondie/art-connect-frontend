import CheckBtn from '../../../assets/images/checkbtn-default.svg';
import CheckBtnHover from '../../../assets/images/checkbtn-hover.svg';
import {useState} from 'react';

export default function AcceptButton({onClick, className = '', disabled = false, hoverText = '수락'}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
      >
        <img src={isHovered && !disabled ? CheckBtnHover : CheckBtn} alt="수락 버튼" className="h-[38px] w-[38px]" />
      </button>

      {isHovered && !disabled && (
        <div className="absolute top-10 bg-black text-white px-[6px] py-[2px] rounded-[4px] text-[12px] font-[600] whitespace-nowrap z-10">
          {hoverText}
        </div>
      )}
    </div>
  );
}
