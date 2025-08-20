import React, {useState, useMemo} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useStore} from '@/store/useStore';
import googleIcon from '@/assets/membership/icon/default/구글.png';
import googleHoverIcon from '@/assets/membership/icon/hover/구글.png';
import naverIcon from '@/assets/membership/icon/default/네이버.png';
import naverHoverIcon from '@/assets/membership/icon/hover/네이버.png';
import kakaoIcon from '@/assets/membership/icon/default/카카오.png';
import kakaoHoverIcon from '@/assets/membership/icon/hover/카카오.png';
import Signinbutton from '@/assets/membership/로그인페이지로그인버튼/login.png';
import Signinbuttonhover from '@/assets/membership/로그인페이지로그인버튼/login_hover.png';
import emailbutton from '@/assets/membership/이메일/회원가입버튼/email.png';
import emailbuttonhover from '@/assets/membership/이메일/회원가입버튼/emailhover.png';
import Signupunderlineicon from '@/assets/membership/회원가입/signinunderline.png';
import passwordhiddenbutton from '@/assets/membership/비밀번호보기버튼/hidden.png';
import passwordvisiblebutton from '@/assets/membership/비밀번호보기버튼/visible.png';
import {loginApi} from '@/api/auth/login';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = location.state?.email || ''; // 회원가입에서 넘긴 이메일

  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // 오류 상태 관리
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const toFrontendUserType = (backendType) => {
    return backendType === 'DESIGNER' ? 'artist' : 'business';
  };

  // 정규식 패턴 (로그인용 - 더 간단한 검증)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // [추가] 폼 전체 유효 여부
  const formValid = useMemo(() => {
    const emailOk = emailRegex.test(email.trim());
    const passwordOk = password.trim().length > 0;
    return emailOk && passwordOk;
  }, [email, password]);

  // 이메일 유효성 검사 (로그인용)
  const validateEmail = (value) => {
    if (!value.trim()) return ''; // 빈 값일 때는 오류 메시지 미표시
    if (!emailRegex.test(value)) return '이메일 주소가 올바르지 않아요.';
    return '';
  };

  // 비밀번호 유효성 검사 (로그인용 - 간단한 검증)
  const validatePassword = (value) => {
    if (!value.trim()) return ''; // 빈 값일 때는 오류 메시지 미표시
    if (value.length < 1) return '비밀번호를 입력해주세요.';
    return '';
  };

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
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 필드 유효성 검사 (제출 시에는 빈 값도 검사)
    const emailError = email.trim() ? validateEmail(email) : '이메일 주소가 올바르지 않아요.';
    const passwordError = password.trim() ? '' : '비밀번호를 입력해주세요.';

    setErrors({
      email: emailError,
      password: passwordError,
    });

    // [수정] formValid로 최종 차단
    if (!(formValid && !emailError && !passwordError)) return;

    loginApi({email, password})
      .then((res) => {
        const mappedType = toFrontendUserType(res?.userType);

        useStore.setState({
          userId: res?.userId ?? null,
          userType: mappedType,
        });

        navigate('/', {replace: true});
      })
      .catch((err) => {
        console.error(err?.message || '로그인 실패');
      });
  };

  return (
    <div className="min-h-screen w-screen bg-white relative">
      {/* 로고 - 왼쪽 상단 고정 */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-[28px] font-black font-['Pretendard_Variable'] leading-[38px]">ArtConnect</h1>
      </div>

      {/* 중앙 컨텐츠 컨테이너 */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* 메인 제목 */}
        <div className="mb-8">
          <h2 className="text-[28px] font-extrabold font-['Pretendard_Variable'] leading-[38px] text-center whitespace-pre-line">
            {'로그인하고 아트커넥트에서\n오늘도 멋진 작업을 이어가세요'}
          </h2>
        </div>

        {/* 로그인 섹션 */}
        <div className="w-full max-w-[514px] bg-white">
          <div className="px-4 py-[27px] space-y-6">
            {/* 로그인 폼 */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* 이메일 */}
                <div>
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

                {/* 비밀번호 - 토글 버튼 추가 */}
                <div>
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
                  <input
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호 입력"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 outline-none transition-colors ${
                      errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-400'
                    }`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>}
                </div>

                {/* 로그인 버튼 */}
                <button
                  type="submit"
                  disabled={!formValid}
                  className={`w-full group ${!formValid ? 'opacity-50 pointer-events-none' : ''}`} // [추가] 비활성화 시 호버 차단
                >
                  <img
                    src={Signinbutton}
                    alt="로그인"
                    className={`w-full ${formValid ? 'group-hover:hidden' : ''}`} // [수정] 호버 시 감춤(활성일 때만)
                  />
                  <img
                    src={Signinbuttonhover}
                    alt="로그인"
                    className={`w-full hidden ${formValid ? 'group-hover:block' : ''}`} // [추가]
                  />
                </button>

                {/* 이메일/비밀번호 찾기 */}
                <div className="text-right">
                  <button type="button" className="text-sm text-gray-500 hover:text-gray-700 underline">
                    이메일/비밀번호 찾기
                  </button>
                </div>

                {/* 소셜 로그인 */}
                <div className="text-center">
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

                {/* 회원가입 링크 */}
                <div className="text-center flex items-center justify-center gap-2">
                  <p className="text-sm font-normal text-gray-600">아직 회원이 아니신가요?</p>
                  <button type="button" className="group" onClick={() => navigate('/signup')}>
                    <img src={Signupunderlineicon} alt="회원가입" className="h-[22px]" />
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

export default Login;
