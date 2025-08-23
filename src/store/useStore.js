import {create} from 'zustand';

export const useStore = create((set) => ({
  userType: localStorage.getItem('userType') ?? null,
  token: localStorage.getItem('token') ?? null,
  setUserType: (type) => {
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
    set({userType: type});
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
    set({userType: null, token: null});
  },
}));
