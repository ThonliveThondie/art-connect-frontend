import apiClient, {postForm} from '../utils/client.js';

const normalizeProfileFromServer = (data) => {
  if (!data || typeof data !== 'object') return data;
  return {
    ...data,
    nickname: data.nickname ?? '',
  };
};

const normalizeProfileToServer = (payload) => {
  if (!payload || typeof payload !== 'object') return payload;
  const {nickname, ...rest} = payload;
  return {
    ...rest,
    nickname: nickname ?? '',
  };
};
export const fetchMyProfile = async () => {
  const {data} = await apiClient.get('/api/mypage/me');
  return normalizeProfileFromServer(data);
};

export const saveDesignerProfile = async (payload) => {
  const body = normalizeProfileToServer(payload);
  const {data} = await apiClient.post('/api/mypage/designer', body);
  return normalizeProfileFromServer(data);
};

export const saveBusinessProfile = async (payload) => {
  const body = normalizeProfileToServer(payload);
  const {data} = await apiClient.post('/api/mypage/business-owner', body);
  return normalizeProfileFromServer(data);
};

export const uploadDesignerProfileImage = async (formData) => {
  const {data} = await apiClient.post('/api/mypage/designer/profile-image', formData);
  return data;
};

export const uploadProfileImage = async (file, userType) => {
  const fd = new FormData();
  fd.append('profileImage', file);

  const endpoint =
    (userType || '').toUpperCase() === 'BUSINESS'
      ? '/api/mypage/business-owner/profile-image'
      : '/api/mypage/designer/profile-image';

  const {data} = await postForm(endpoint, fd);
  return data;
};
