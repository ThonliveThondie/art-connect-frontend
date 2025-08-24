import {create} from 'zustand';

export const useStore = create((set) => ({
  userType: localStorage.getItem('userType') ?? null,
  userId: localStorage.getItem('userId') ?? null,
  token: localStorage.getItem('token') ?? null,
  setUserType: (type) => {
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
    set({userType: type});
  },
  setUserId: (userId) => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
    set({userId});
  },
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({token});
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    set({userType: null, userId: null, token: null});
  },
}));
