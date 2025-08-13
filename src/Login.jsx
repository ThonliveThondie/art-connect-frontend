import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 상단에 추가
import googleIcon from "./membership/icon/default/구글.png";
import googleHoverIcon from "./membership/icon/hover/구글.png";
import naverIcon from "./membership/icon/default/네이버.png";
import naverHoverIcon from "./membership/icon/hover/네이버.png";
import kakaoIcon from "./membership/icon/default/카카오.png";
import kakaoHoverIcon from "./membership/icon/hover/카카오.png";
import Signinbutton from "./membership/로그인페이지로그인버튼/login.png";
import emailbutton from "./membership/이메일/회원가입버튼/email.png";
import emailbuttonhover from "./membership/이메일/회원가입버튼/emailhover.png";
import Signupunderlineicon from "./membership/회원가입/signinunderline.png";

function Login() {
  const navigate = useNavigate(); // 추가
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-screen bg-white relative">
      {/* 로고 - 왼쪽 상단 고정 */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-[28px] font-black font-['Pretendard_Variable'] leading-[38px]">
          ArtConnect
        </h1>
      </div>

      {/* 중앙 컨텐츠 컨테이너 */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* 메인 제목 */}
        <div className="mb-8">
          <h2 className="text-[28px] font-extrabold font-['Pretendard_Variable'] leading-[38px] text-center whitespace-pre-line">
            {"로그인하고 아트커넥트에서\n오늘도 멋진 작업을 이어가세요"}
          </h2>
        </div>

        {/* 로그인 섹션 */}
        <div className="w-full max-w-[514px] bg-white">
          <div className="px-4 py-[27px] space-y-6">
            {/* 로그인 폼 */}
            <div className="space-y-6">
              {/* 이메일 */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@naver.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400 outline-none transition-colors"
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400 outline-none transition-colors"
                />
              </div>

              {/* 이메일/비밀번호 찾기 */}
              <div className="text-right">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  이메일/비밀번호 찾기
                </button>
              </div>

              {/* 로그인 버튼 */}
              <button type="submit" className="w-full group">
                <img
                  src={Signinbutton}
                  alt="로그인"
                  className="w-full group-hover:hidden"
                />
                <img
                  src={Signinbuttonhover}
                  alt="로그인"
                  className="w-full hidden group-hover:block"
                />
              </button>

              {/* 소셜 로그인 */}
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600 mb-4">
                  또는 다음으로 시작하기
                </p>
                <div className="flex justify-center gap-[10px]">
                  {/* Google */}
                  <button className="w-[52px] h-[52px] flex items-center justify-center group">
                    <img
                      src={googleIcon}
                      alt="Google"
                      className="w-[40px] h-[40px] group-hover:hidden"
                    />
                    <img
                      src={googleHoverIcon}
                      alt="Google"
                      className="w-[40px] h-[40px] hidden group-hover:block"
                    />
                  </button>

                  {/* KakaoTalk */}
                  <button className="w-[52px] h-[52px] flex items-center justify-center group">
                    <img
                      src={kakaoIcon}
                      alt="Kakao"
                      className="w-[40px] h-[40px] group-hover:hidden"
                    />
                    <img
                      src={kakaoHoverIcon}
                      alt="Kakao"
                      className="w-[40px] h-[40px] hidden group-hover:block"
                    />
                  </button>

                  {/* Naver */}
                  <button className="w-[52px] h-[52px] flex items-center justify-center group">
                    <img
                      src={naverIcon}
                      alt="Naver"
                      className="w-[40px] h-[40px] group-hover:hidden"
                    />
                    <img
                      src={naverHoverIcon}
                      alt="Naver"
                      className="w-[40px] h-[40px] hidden group-hover:block"
                    />
                  </button>
                </div>
              </div>

              {/* 회원가입 링크 부분 수정 */}
              <div className="text-center flex items-center justify-center gap-2">
                <p className="text-sm font-normal text-gray-600">
                  아직 회원이 아니신가요?
                </p>
                <button className="group" onClick={() => navigate("/signup")}>
                  <img
                    src={Signupunderlineicon}
                    alt="회원가입"
                    className="h-[22px]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
