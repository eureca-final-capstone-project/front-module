import { useEffect, useState } from 'react'
import { useAuthStore, usePermissionStore } from '../store/authStore'
import { PERMISSIONS } from '../constants/permission'

export const useShowPermissionModal = () => {
  const isLogin = useAuthStore(state => state.isLogin)
  const { permissionInitialized, permissions } = usePermissionStore()

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isLogin || !permissionInitialized) return

    const isRestricted = PERMISSIONS.some(p => !permissions.includes(p))
    const storageKey = 'permission_modal_shown'
    const alreadyShown = sessionStorage.getItem(storageKey) === 'true'

    if (isRestricted && !alreadyShown) {
      setIsModalOpen(true)
    }
  }, [permissions, permissionInitialized, isLogin])

  return {
    isModalOpen,
    setIsModalOpen,
  }
}
