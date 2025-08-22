import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const aiRecommendApi = async (prompt, token) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        // 토큰이 있으면 Authorization 헤더 추가
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await axios.post(
            '/api/ai/recommend',
            { prompt },
            {
                baseURL: BASE_URL,
                timeout: 30000, // AI 처리를 위해 타임아웃을 30초로 설정
                headers,
            }
        );

        return res.data ?? null;
    } catch (err) {
        if (err.response) {
            const msg = err.response.data?.message || `AI 추천 요청에 실패했습니다. (HTTP ${err.response.status})`;
            throw new Error(msg);
        }

        if (err.request) {
            throw new Error('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
        }

        throw new Error(err.message || 'AI 추천 요청 중 알 수 없는 오류가 발생했습니다.');
    }
};

export const aiRefreshApi = async (sessionId, token) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        // 토큰이 있으면 Authorization 헤더 추가
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await axios.post(
            '/api/ai/refresh',
            { sessionId },
            {
                baseURL: BASE_URL,
                timeout: 30000, // AI 처리를 위해 타임아웃을 30초로 설정
                headers,
            }
        );

        return res.data ?? null;
    } catch (err) {
        if (err.response) {
            const msg = err.response.data?.message || `새로운 디자이너 추천 요청에 실패했습니다. (HTTP ${err.response.status})`;
            throw new Error(msg);
        }

        if (err.request) {
            throw new Error('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
        }

        throw new Error(err.message || '새로운 디자이너 추천 요청 중 알 수 없는 오류가 발생했습니다.');
    }
};