import { create } from 'zustand'

interface AuthState {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
  isLogin: !!sessionStorage.getItem('userAccessToken'),
  setIsLogin: value => set({ isLogin: value }),
}))
