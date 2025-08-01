import { create } from 'zustand'

interface AuthState {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

interface PermissionState {
  permissionInitialized: boolean
  permissions: string[]
  setPermissionInitialized: (value: boolean) => void
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

export const usePermissionStore = create<PermissionState>(set => ({
  permissionInitialized: false,
  permissions: [],
  setPermissionInitialized: value => set({ permissionInitialized: value }),
  setPermissions: value => set({ permissions: value }),
}))
