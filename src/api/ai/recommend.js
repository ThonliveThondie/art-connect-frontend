import apiClient from '../utils/client';

export const aiRecommendApi = async (prompt) => {
  const {data} = await apiClient.post('/api/ai/recommend', {prompt});
  return data ?? null;
};

export const aiRefreshApi = async (sessionId) => {
  const {data} = await apiClient.post('/api/ai/refresh', {sessionId});
  return data ?? null;
};

// AI 작업의뢰서 생성 API
export const generateWorkRequestApi = async (sessionId) => {
  const {data} = await apiClient.post(`/api/ai/generate-work-request/${sessionId}`);
  return data ?? null;
};