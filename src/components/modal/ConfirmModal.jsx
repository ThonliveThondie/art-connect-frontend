import React from 'react';

export default function ConfirmModal({isOpen, onClose, onConfirm, isProcessing = false, confirmText = "완료"}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div
        className="
          flex flex-col gap-[20px]
          max-w-[600px] w-full px-[24px] py-[28px]
          bg-white rounded-[8px]
        "
      >
        <h3 className="text-[20px] font-[700]">프로젝트를 완료하시겠습니까?</h3>
        <p className="text-[14px] text-black/50 leading-[22px]">
          프로젝트 완료를 승인하면 더 이상 시안 수정 및 피드백 작성이 불가능합니다. <br />
          신중하게 결정해주세요.
        </p>

        <div className="flex gap-[12px]">
          <button 
            onClick={onClose} 
            disabled={isProcessing}
            className="w-full h-[46px] rounded-[8px] text-[18px] bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            취소
          </button>

          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="w-full h-[46px] rounded-[8px] text-white text-[18px] bg-[#4A90E2] hover:bg-[#3C7DC9] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {confirmText}
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
