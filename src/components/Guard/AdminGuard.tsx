import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuthStore } from '../../store/authStore'
import { useToast } from '../../hooks/useToast'

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useAdminAuthStore(state => state.isLogin)
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) navigate('/admin/login')
  }, [isLogin, navigate, showToast])

  if (!isLogin) return null

  return <>{children}</>
}

export default AdminGuard
