import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuthStore } from '../../store/authStore'
import { useToast } from '../../hooks/useToast'

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAdminAuthStore()
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      showToast({ type: 'error', msg: '관리자 로그인 후 이용해 주세요.' })
      navigate('/admin/login')
    }
  }, [isLogin, navigate, showToast])

  if (!isLogin) return null

  return <>{children}</>
}

export default AdminGuard
