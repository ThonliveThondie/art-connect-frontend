import apiClient from '../utils/client';

export const loginApi = async ({email, password}) => {
  const res = await apiClient.post('/login', {email, password});

  const rawAuth = res.headers?.authorization || '';
  const token = rawAuth.replace(/^Bearer\s+/i, '');

  const body = res.data ?? {};

  return {...body, token};
};
