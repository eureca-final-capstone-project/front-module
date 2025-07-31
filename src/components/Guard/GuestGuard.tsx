import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useAuthStore(state => state.isLogin)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isLogin) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isLogin, navigate, location])

  return !isLogin ? children : null
}

export default GuestGuard
