import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAdminAuthStore } from '../../store/authStore'

const AdminGuestGuard = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useAdminAuthStore(state => state.isLogin)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isLogin) {
      const from = location.state?.from?.pathname || '/admin/dashboard'
      navigate(from, { replace: true })
    }
  }, [isLogin, navigate, location])

  return !isLogin ? children : null
}

export default AdminGuestGuard
