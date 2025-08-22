import {create} from 'zustand';

export const useStore = create((set) => ({
  userType: null,
  token: localStorage.getItem('token') ?? null,
  setUserType: (type) => set({userType: type}),
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
    set({userType: null, token: null});
  },
}));
