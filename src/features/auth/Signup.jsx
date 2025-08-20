import React, {useState, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useStore} from '@/store/useStore'; // 기존 스토어 사용
import {signupApi} from '@/api/auth/signup';

import googleIcon from '@/assets/membership/icon/default/구글.png';
import googleHoverIcon from '@/assets/membership/icon/hover/구글.png';
import naverIcon from '@/assets/membership/icon/default/네이버.png';
import naverHoverIcon from '@/assets/membership/icon/hover/네이버.png';
import kakaoIcon from '@/assets/membership/icon/default/카카오.png';
import kakaoHoverIcon from '@/assets/membership/icon/hover/카카오.png';

import DesignerIcon from '@/assets/membership/회원유형선택버튼/designer.png';
import SosangIcon from '@/assets/membership/회원유형선택버튼/sosang.png';

import Signcomplete from '@/assets/membership/가입완료버튼/complete.png';
import Signcompletehover from '@/assets/membership/가입완료버튼/complete_hover.png';

import Loginunderlineicon from '@/assets/membership/로그인버튼/Loginbutton.png';
import Loginunderlinehovericon from '@/assets/membership/로그인버튼/Loginbuttonhover.png';

import passwordhiddenbutton from '@/assets/membership/비밀번호보기버튼/hidden.png';
import passwordvisiblebutton from '@/assets/membership/비밀번호보기버튼/visible.png';

function Signup() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('artist');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const setUserTypeGlobal = useStore((s) => s.setUserType);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toBackendUserType = (frontendType) => {
    return frontendType === 'artist' ? 'DESIGNER' : 'BUSINESS_OWNER';
  };

  // 정규식 패턴
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 유효성 검사
  const validateEmail = (value) => {
    if (!value.trim()) {
      return ''; // 빈 값일 때는 오류 메시지 표시하지 않음
    }
    if (!emailRegex.test(value)) {
      return '이메일 주소가 올바르지 않아요.';
    }
    return '';
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value) => {
    if (!value.trim()) {
      return ''; // 빈 값일 때는 오류 메시지 표시하지 않음
    }
    return '';
  };

  // 비밀번호 확인 유효성 검사
  const validateConfirmPassword = (value, passwordValue) => {
    if (!value.trim()) {
      return ''; // 빈 값일 때는 오류 메시지 표시하지 않음
    }
    if (value !== passwordValue) {
      return '비밀번호가 일치하지 않아요.';
    }
    return '';
  };

  const formValid = useMemo(() => {
    const emailOk = emailRegex.test(email.trim());
    const passwordOk = password.trim().length > 0; // 조건 삭제: 길이만 1자 이상
    const confirmOk = confirmPassword.trim().length > 0 && confirmPassword === password;
    return emailOk && passwordOk && confirmOk;
  }, [email, password, confirmPassword]);

  // 이메일 입력 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const error = validateEmail(value);
    setErrors((prev) => ({...prev, email: error}));
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const error = validatePassword(value);
    setErrors((prev) => ({...prev, password: error}));

    if (confirmPassword) {
      const confirmError = validateConfirmPassword(confirmPassword, value);
      setErrors((prev) => ({...prev, confirmPassword: confirmError}));
    }
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    const error = validateConfirmPassword(value, password);
    setErrors((prev) => ({...prev, confirmPassword: error}));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = email.trim() ? validateEmail(email) : '이메일 주소가 올바르지 않아요.';
    const passwordError = password.trim() ? '' : '비밀번호를 입력하세요.'; // [수정] 옛 문구([비밀번호 조건]) 제거
    const confirmPasswordError = confirmPassword.trim()
      ? validateConfirmPassword(confirmPassword, password)
      : '비밀번호가 일치하지 않아요.'; // 비어있을 때도 제출 시에는 요구

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!(formValid && !emailError && !passwordError && !confirmPasswordError)) {
      return;
    }

    try {
      await signupApi({
        email,
        password,
        userType: toBackendUserType(userType), // 바로 매핑
      });

      setUserTypeGlobal(userType); // 프론트에서 쓸 타입만 저장

      navigate('/login', {replace: true, state: {email}});
    } catch (err) {
      alert(err?.message || '회원가입 실패');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white relative">
      {/* 로고 */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-[28px] font-black font-['Pretendard_Variable'] leading-[38px]">ArtConnect</h1>
      </div>

      {/* 중앙 컨텐츠 컨테이너 */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* 메인 제목 */}
        <div className="mb-8">
          <h2 className="text-[28px] font-extrabold font-['Pretendard_Variable'] leading-[38px] text-center whitespace-pre-line">
            {'디자이너와 소상공인을 잇는 공간,\n아트커넥트에서 만나보세요!'}
          </h2>
        </div>

        {/* 회원가입 섹션 */}
        <div className="w-full max-w-[514px] bg-white">
          <div className="px-4 py-[27px]">
            {/* 회원가입 폼 */}
            <form onSubmit={handleSubmit}>
              <div>
                {/* 회원 유형 선택 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">회원 유형 선택</label>
                  <div className="flex gap-6">
                    {/* 디자이너 선택 버튼 */}
                    <button
                      type="button"
                      onClick={() => setUserType('artist')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 
                        transition-all duration-200 border-2 rounded-xl
                        ${userType === 'artist' ? 'border-gray-800' : 'border-gray-200'}`}
                    >
                      <img src={DesignerIcon} alt="디자이너" className="w-6 h-6" />
                      <span className="text-gray-900">디자이너</span>
                    </button>

                    {/* 소상공인 선택 버튼 */}
                    <button
                      type="button"
                      onClick={() => setUserType('business')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 
                        transition-all duration-200 border-2 rounded-xl
                        ${userType === 'business' ? 'border-gray-800' : 'border-gray-200'}`}
                    >
                      <img src={SosangIcon} alt="소상공인" className="w-6 h-6" />
                      <span className="text-gray-900">소상공인</span>
                    </button>
                  </div>
                </div>

                {/* 이메일 */}
                <div className="mb-10">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="example@example.com"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-400'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* 비밀번호 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      비밀번호
                    </label>
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="focus:outline-none"
                    >
                      <img
                        src={passwordVisible ? passwordvisiblebutton : passwordhiddenbutton}
                        alt={passwordVisible ? '비밀번호 보임' : '비밀번호 숨김'}
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                  <div className="space-y-[7px]">
                    {/* 비밀번호 입력 필드 */}
                    <input
                      id="password"
                      type={passwordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="비밀번호 입력"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 outline-none transition-colors ${
                        errors.password
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-gray-400'
                      }`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>}

                    {/* 비밀번호 확인 입력 필드 */}
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="비밀번호 확인"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 outline-none transition-colors ${
                        errors.confirmPassword
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-gray-400'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1 ml-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                {/* 가입하기 버튼 */}
                <button
                  type="submit"
                  disabled={!formValid}
                  aria-disabled={!formValid}
                  className={`w-full group mb-6 ${!formValid ? 'opacity-50 pointer-events-none' : ''}`} // [추가] 비활성화 시 호버 차단
                >
                  <img
                    src={Signcomplete}
                    alt="가입하기"
                    className={`w-full ${formValid ? 'group-hover:hidden' : ''}`}
                  />
                  <img
                    src={Signcompletehover}
                    alt="가입하기"
                    className={`w-full hidden ${formValid ? 'group-hover:block' : ''}`}
                  />
                </button>

                {/* 소셜 로그인 */}
                <div className="text-center mb-6">
                  <p className="text-sm font-semibold text-gray-600 mb-4">또는 다음으로 시작하기</p>
                  <div className="flex justify-center gap-[10px]">
                    {/* Google */}
                    <button type="button" className="w-[52px] h-[52px] flex items-center justify-center group">
                      <img src={googleIcon} alt="Google" className="w-[40px] h-[40px] group-hover:hidden" />
                      <img src={googleHoverIcon} alt="Google" className="w-[40px] h-[40px] hidden group-hover:block" />
                    </button>

                    {/* KakaoTalk */}
                    <button type="button" className="w-[52px] h-[52px] flex items-center justify-center group">
                      <img src={kakaoIcon} alt="Kakao" className="w-[40px] h-[40px] group-hover:hidden" />
                      <img src={kakaoHoverIcon} alt="Kakao" className="w-[40px] h-[40px] hidden group-hover:block" />
                    </button>

                    {/* Naver */}
                    <button type="button" className="w-[52px] h-[52px] flex items-center justify-center group">
                      <img src={naverIcon} alt="Naver" className="w-[40px] h-[40px] group-hover:hidden" />
                      <img src={naverHoverIcon} alt="Naver" className="w-[40px] h-[40px] hidden group-hover:block" />
                    </button>
                  </div>
                </div>

                {/* 로그인 링크 */}
                <div className="text-center flex items-center justify-center gap-2">
                  <p className="text-sm font-normal text-gray-600">이미 회원이신가요?</p>
                  <button type="button" className="group" onClick={() => navigate('/login')}>
                    <img src={Loginunderlineicon} alt="로그인" className="h-[22px] group-hover:hidden" />
                    <img src={Loginunderlinehovericon} alt="로그인" className="h-[22px] hidden group-hover:block" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
