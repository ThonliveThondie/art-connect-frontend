import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginApi = async ({email, password}) => {
  try {
    const res = await axios.post(
      '/login',
      {email, password},
      {
        baseURL: BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data ?? null;
  } catch (err) {
    if (err.respons) {
      const msg = err.respons.data?.message || `로그인 실패 (${err.response.status})`;
      throw new Error(msg);
    }
    throw new Error(err.request || `서버에 연결할 수 없습니다`);
  }
};
