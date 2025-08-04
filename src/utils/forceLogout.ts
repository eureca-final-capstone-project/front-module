import { toast } from 'react-toastify'
import { useAuthStore, usePermissionStore } from '../store/authStore'

export const forceLogout = (message = '이용이 제한된 계정입니다. 다시 로그인해 주세요.') => {
  sessionStorage.removeItem('userAccessToken')
  sessionStorage.removeItem('userId')
  useAuthStore.getState().setIsLogin(false)
  useAuthStore.getState().setUserId(null)
  usePermissionStore.getState().setPermissions([])
  usePermissionStore.getState().setPermissionInitialized(false)

  toast.error(message)
  window.location.href = '/login'
}
