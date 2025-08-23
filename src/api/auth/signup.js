import apiClient from '../utils/client';

export const signupApi = async ({email, password, userType}) => {
  const {data} = await apiClient.post('/api/auth/sign-up', {email, password, userType});
  return data ?? null;
};
