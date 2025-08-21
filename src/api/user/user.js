import axios from 'axios';
import {useStore} from '@/store/useStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const userApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

userApi.interceptors.request.use((config) => {
  try {
    const {token} = useStore.getState();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

const normalizeProfileFromServer = (data) => {
  if (!data || typeof data !== 'object') return data;
  const nickName = data.nickName ?? data.nickname ?? '';
  return {...data, nickName};
};

const normalizeProfileToServer = (payload) => {
  if (!payload || typeof payload !== 'object') return payload;
  const {nickname, ...rest} = payload;
  const nickName = payload.nickName ?? nickname;
  return {...rest, ...(nickName !== undefined ? {nickName} : {})};
};

export const fetchMyProfile = async () => {
  const {data} = await userApi.get('/api/mypage/me');
  return normalizeProfileFromServer(data);
};

export const saveDesignerProfile = async (payload) => {
  const body = normalizeProfileToServer(payload);
  const {data} = await userApi.post('/api/mypage/designer', body);
  return normalizeProfileFromServer(data);
};

export const saveBusinessProfile = async (payload) => {
  const body = normalizeProfileToServer(payload);
  const {data} = await userApi.post('/api/mypage/business-owner', body);
  return normalizeProfileFromServer(data);
};

export const uploadDesignerProfileImage = async (formData) => {
  const {data} = await userApi.post('/api/mypage/designer/profile-image', formData);
  return data;
};

export const uploadProfileImage = async (file, userType) => {
  const formData = new FormData();
  formData.append('profileImage', file);
  const endpoint =
    (userType || '').toUpperCase() === 'BUSINESS'
      ? '/api/mypage/business-owner/profile-image'
      : '/api/mypage/designer/profile-image';
  const {data} = await userApi.post(endpoint, formData);
  return data;
};
