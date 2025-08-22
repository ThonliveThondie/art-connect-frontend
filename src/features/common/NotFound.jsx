import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold mb-3">페이지를 찾을 수 없습니다</h1>
      <p className="text-base text-gray-600 mb-8 text-center">
        입력하신 주소가 올바른지 확인해주세요. 아래 버튼으로 이전 페이지로 이동할 수 있어요.
      </p>

      <button
        onClick={handleBack}
        className="w-64 px-5 py-3 border border-black/50 rounded-xl hover:bg-[#F8F7F6] transition text-base"
      >
        이전 페이지로
      </button>
    </div>
  );
}
