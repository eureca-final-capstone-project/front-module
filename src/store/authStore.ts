import { create } from 'zustand'

interface AuthState {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

interface PermissionState {
  permissions: string[]
  setPermissions: (value: string[]) => void
}

export const useAuthStore = create<AuthState>(set => ({
  isLogin: !!sessionStorage.getItem('userAccessToken'),
  setIsLogin: value => set({ isLogin: value }),
}))

export const useAdminAuthStore = create<AuthState>(set => ({
  isLogin: !!sessionStorage.getItem('adminAccessToken'),
  setIsLogin: value => set({ isLogin: value }),
}))

export const usePermissionStroe = create<PermissionState>(set => ({
  permissions: [],
  setPermissions: value => set({ permissions: value }),
}))
