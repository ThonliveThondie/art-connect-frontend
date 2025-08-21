import axios from 'axios';
import {useStore} from '@/store/useStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const storeApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

storeApi.interceptors.request.use((config) => {
  try {
    const {token} = useStore.getState();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`; // Bearer ${token}
    }
  } catch {}
  return config;
});

const OPERATING_HOUR_OPTIONS = [
  {label: '평일', value: 'WEEKDAYS'},
  {label: '주말/공휴일', value: 'WEEKENDS'},
  {label: '오전', value: 'MORNING'},
  {label: '오후', value: 'AFTERNOON'},
  {label: '저녁', value: 'EVENING'},
  {label: '심야', value: 'LATE_NIGHT'},
];
const labelToValue = Object.fromEntries(OPERATING_HOUR_OPTIONS.map((o) => [o.label, o.value]));
const toValueArray = (arr) => (Array.isArray(arr) ? arr.map((v) => labelToValue[v] ?? v) : []);

export const normalizeImages = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((it, idx) => {
      if (typeof it === 'string') return {id: `s-${idx}`, url: it};
      const id = it.id ?? it.imageId ?? `gen-${idx}`;
      const url = it.imageUrl ?? it.url ?? '';
      return url ? {id, url} : null;
    })
    .filter(Boolean);
};

export const fetchMyStore = async () => {
  const {data} = await storeApi.get('/api/stores/my');
  return {
    ...data,
    operatingHours: toValueArray(data?.operatingHours ?? []),
    images: normalizeImages(data?.storeImages ?? []),
  };
};

export const saveStore = async (payload) => {
  const body = {
    ...payload,
    operatingHours: toValueArray(payload?.operatingHours ?? []),
  };
  const {data} = await storeApi.post('/api/stores/save/name', body);
  return data;
};

export const uploadStoreImage = async (file) => {
  const fd = new FormData();
  fd.append('images', file);
  const {data} = await storeApi.post('/api/stores/images', fd);
  const norm = normalizeImages([data])[0] || data;
  return norm;
};

export const deleteStoreImage = async (id) => {
  const {data} = await storeApi.delete(`/api/stores/images/${id}`);
  return data;
};
