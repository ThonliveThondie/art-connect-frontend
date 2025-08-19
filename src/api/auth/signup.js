import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signupApi = async ({email, password, userType}) => {
  try {
    const res = await axios.post(
      '/api/auth/sign-up',
      {email, password, userType},
      {
        baseURL: BASE_URL,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data ?? null;
  } catch (err) {
    if (err.response) {
      const msg = err.response.data?.message || `회원가입에 실패했습니다. (HTTP ${err.response.status})`;
      throw new Error(msg);
    }

    if (err.request) {
      throw new Error('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
    }

    throw new Error(err.message || '알 수 없는 오류가 발생했습니다.');
  }
};
