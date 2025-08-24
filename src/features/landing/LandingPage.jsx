import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F7F6] px-10">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6">ArtConnect</h1>
      <p className="mb-6 md:mb-10 text-sm md:text-lg lg:text-xl text-gray-600 text-center">
        소상공인과 디자이너를 연결하는 플랫폼
      </p>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full max-w-xs md:max-w-md lg:max-w-lg">
        <button
          onClick={() => navigate('/login')}
          className="
            w-full md:w-48 lg:w-60
            md:px-7 lg:px-8
            py-2.5 md:py-3.5 lg:py-4
            bg-black text-white rounded-xl hover:bg-gray-800
            transition
          "
        >
          <span className="text-sm md:text-base lg:text-lg">로그인</span>
        </button>

        <button
          onClick={() => navigate('/signup')}
          className="
            w-full md:w-48 lg:w-60
            md:px-7 lg:px-8
            py-2.5 md:py-3.5 lg:py-4
            border border-black rounded-xl hover:bg-gray-100
            transition
          "
        >
          <span className="text-sm md:text-base lg:text-lg">회원가입</span>
        </button>
      </div>
    </div>
  );
}
