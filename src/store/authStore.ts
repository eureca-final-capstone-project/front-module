import { create } from 'zustand'

interface UserAuthState {
  userId: number | null
  isLogin: boolean
  setUserId: (id: number | null) => void
  setIsLogin: (value: boolean) => void
}

interface AdiminAuthState {
  adminId: number | null
  isLogin: boolean
  setIsLogin: (value: boolean) => void
  setAdminId: (value: number | null) => void
}

interface PermissionState {
  permissionInitialized: boolean
  permissions: string[]
  setPermissionInitialized: (value: boolean) => void
  setPermissions: (value: string[]) => void
}

export const useAuthStore = create<UserAuthState>(set => {
  const storedId = sessionStorage.getItem('userId')
  return {
    userId: storedId !== null ? Number(storedId) : null,
    isLogin: !!sessionStorage.getItem('userAccessToken'),
    setIsLogin: value => set({ isLogin: value }),
    setUserId: value => set({ userId: value }),
  }
})

export const useAdminAuthStore = create<AdiminAuthState>(set => {
  const storedId = sessionStorage.getItem('adminId')
  return {
    adminId: storedId !== null ? Number(storedId) : null,
    isLogin: !!sessionStorage.getItem('adminAccessToken'),
    setIsLogin: value => set({ isLogin: value }),
    setAdminId: value => set({ adminId: value }),
  }
})

export const usePermissionStore = create<PermissionState>(set => ({
  permissionInitialized: false,
  permissions: [],
  setPermissionInitialized: value => set({ permissionInitialized: value }),
  setPermissions: value => set({ permissions: value }),
}))
