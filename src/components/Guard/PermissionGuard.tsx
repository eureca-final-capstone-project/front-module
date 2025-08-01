import { Navigate } from 'react-router-dom'
import { usePermissionStroe } from '../../store/authStore'
import { useToast } from '../../hooks/useToast'

const PermissionGuard = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { showToast } = useToast()
  const permissionInitialized = usePermissionStroe(state => state.permissionInitialized)
  const permissions = usePermissionStroe(state => state.permissions)

  if (!permissionInitialized) {
    return <div>접근 권한 확인 중...</div>
  }

  const hasPermission = permissions.includes(role)

  if (!hasPermission) {
    showToast({ type: 'error', msg: '접근 권한이 없습니다.' })
    return <Navigate to="/404" replace />
  }

  return <>{children}</>
}

export default PermissionGuard
