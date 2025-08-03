import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/useToast'
import { useAuthStore } from '../../store/authStore'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useAuthStore(state => state.isLogin)
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) navigate('/login')
  }, [isLogin, navigate, showToast])

  if (!isLogin) return null

  return <>{children}</>
}

export default AuthGuard
