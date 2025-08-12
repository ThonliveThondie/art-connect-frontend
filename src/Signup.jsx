import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "./membership/icon/default/구글.png";
import googleHoverIcon from "./membership/icon/hover/구글.png";
import naverIcon from "./membership/icon/default/네이버.png";
import naverHoverIcon from "./membership/icon/hover/네이버.png";
import kakaoIcon from "./membership/icon/default/카카오.png";
import kakaoHoverIcon from "./membership/icon/hover/카카오.png";
import DesignerIcon from "./membership/회원유형선택버튼/designer.png";
import SosangIcon from "./membership/회원유형선택버튼/sosang.png";
import Signcomplete from "./membership/가입완료버튼/complete.png";
import Signcompletehover from "./membership/가입완료버튼/complete_hover.png";
import Loginunderlineicon from "./membership/로그인버튼/Loginbutton.png";
import Loginunderlinehovericon from "./membership/로그인버튼/Loginbuttonhover.png";
function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("designer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            {"디자이너와 소상공인을 잇는 공간,\n아트커넥트에서 만나보세요!"}
          </h2>
        </div>

        {/* 회원가입 섹션 */}
        <div className="w-full max-w-[514px] bg-white">
          <div className="px-4 py-[27px] space-y-6">
            {/* 회원가입 폼 */}
            <div className="space-y-6">
              {/* 회원 유형 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  회원 유형 선택
                </label>
                <div className="flex gap-6">
                  {" "}
                  {/* gap-4에서 gap-6으로 변경 */}
                  {/* 회원 유형 선택 버튼 */}
                  <button
                    onClick={() => setUserType("designer")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all duration-200 border-2 rounded-xl ${
                      userType === "designer"
                        ? "border-gray-800"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={DesignerIcon}
                      alt="디자이너"
                      className="w-6 h-6"
                    />
                    <span
                      className={`text-gray-900 ${
                        userType === "designer" ? "font-medium" : "font-normal"
                      }`}
                    >
                      디자이너
                    </span>
                  </button>
                  <button
                    onClick={() => setUserType("business")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all duration-200 border-2 rounded-xl ${
                      userType === "business"
                        ? "border-gray-800"
                        : "border-gray-200"
                    }`}
                  >
                    <img src={SosangIcon} alt="소상공인" className="w-6 h-6" />
                    <span
                      className={`text-gray-900 ${
                        userType === "business" ? "font-medium" : "font-normal"
                      }`}
                    >
                      소상공인
                    </span>
                  </button>
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  이메일
                </label>
                {/* 이메일 입력 필드 */}
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
                <div className="space-y-3">
                  {/* 비밀번호 입력 필드들 */}
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400 outline-none transition-colors"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호 확인"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-0 focus:border-gray-400 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 가입하기 버튼 */}
              <button type="submit" className="w-full group">
                <img
                  src={Signcomplete}
                  alt="가입하기"
                  className="w-full group-hover:hidden"
                />
                <img
                  src={Signcompletehover}
                  alt="가입하기"
                  className="w-full hidden group-hover:block"
                />
              </button>

              {/* 소셜 로그인 */}
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600 mb-4">
                  {" "}
                  {/* font-medium에서 font-semibold로 변경 */}
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

              {/* 로그인 링크 */}
              <div className="text-center flex items-center justify-center gap-2">
                <p className="text-sm font-normal text-gray-600">
                  이미 회원이신가요?
                </p>
                <button className="group" onClick={() => navigate("/login")}>
                  <img
                    src={Loginunderlineicon}
                    alt="로그인"
                    className="h-[22px] group-hover:hidden"
                  />
                  <img
                    src={Loginunderlinehovericon}
                    alt="로그인"
                    className="h-[22px] hidden group-hover:block"
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

export default Signup;
