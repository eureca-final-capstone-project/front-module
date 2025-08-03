import { Navigate } from 'react-router-dom'
import { usePermissionStore } from '../../store/authStore'
import { useToast } from '../../hooks/useToast'
import { useEffect } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const PermissionGuard = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { showToast } = useToast()
  const permissionInitialized = usePermissionStore(state => state.permissionInitialized)
  const permissions = usePermissionStore(state => state.permissions)

  const hasPermission = permissions.includes(role)

  useEffect(() => {
    if (permissionInitialized && !hasPermission) {
      showToast({ type: 'error', msg: '접근 권한이 없습니다.' })
    }
  }, [permissionInitialized, hasPermission, showToast])

  if (!permissionInitialized) {
    return <LoadingSpinner text="접근 권한 확인 중..." className="h-screen" />
  }

  if (!hasPermission) {
    return <Navigate to="/404" replace />
  }

  return <>{children}</>
}

export default PermissionGuard
