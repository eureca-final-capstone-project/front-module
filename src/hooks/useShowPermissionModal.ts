import { useEffect, useState } from 'react'
import { useAuthStore, usePermissionStore } from '../store/authStore'
import { PERMISSIONS } from '../constants/permission'

export const useShowPermissionModal = () => {
  const { isLogin, userId } = useAuthStore()
  const { permissionInitialized, permissions } = usePermissionStore()

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isLogin || !permissionInitialized || permissions.length === 0) return

    const isRestricted = PERMISSIONS.some(p => !permissions.includes(p))
    const storageKey = `permission_modal_shown_${userId}`
    const alreadyShown = sessionStorage.getItem(storageKey) === 'true'

    if (isRestricted && !alreadyShown) {
      setIsModalOpen(true)
    }
  }, [permissions, permissionInitialized, isLogin, userId])

  return {
    isModalOpen,
    setIsModalOpen,
  }
}
