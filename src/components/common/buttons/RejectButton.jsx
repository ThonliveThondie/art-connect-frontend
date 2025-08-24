// src/components/common/buttons/RejectButton.jsx
import RejectIcon from '../../../assets/images/reject-btn.svg?react';
import {useState} from 'react';

export default function RejectButton({onClick, className = '', disabled = false}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center h-[38px] w-[38px] rounded-full border bg-[#E64C4C] hover:bg-[#BC3B3B] text-white transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <RejectIcon />
      </button>

      {/* 호버 시 "거절" 텍스트 표시 */}
      {isHovered && !disabled && (
        <div className="absolute top-10 bg-black text-white px-[6px] py-[2px] rounded-[4px] text-[12px] font-[600] z-10">
          거절
        </div>
      )}
    </div>
  );
}
