import LogoImg from '@/assets/images/logo-primary.svg'
import AddminIcon from '@/assets/icons/admin.svg'
import LogoutIcon from '@/assets/icons/logout.svg?react'
import ActiveBarIcon from '@/assets/icons/active-bar.svg?react'
import { adminSidebarMenu } from '../../../constants/admin'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { adminLogout } from '../../../apis/admin/auth'
import { useToast } from '../../../hooks/useToast'
import { getAdminProfile } from '../../../apis/admin/dashboard'
import { useAdminAuthStore } from '../../../store/authStore'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { showToast } = useToast()
  const { setIsLogin, setAdminId } = useAdminAuthStore()

  const {
    data: adminProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['adminProfile'],
    queryFn: getAdminProfile,
  })

  const [prevIndex, setPrevIndex] = useState(0)

  // 현재 활성 메뉴의 index 찾기
  const currentIndex = adminSidebarMenu.findIndex(item => location.pathname.startsWith(item.path))

  // prevIndex 업데이트
  useEffect(() => {
    setPrevIndex(currentIndex)
  }, [currentIndex])

  const logoutMutation = useMutation({
    mutationFn: adminLogout,
    onSuccess: data => {
      switch (data.statusCode) {
        case 200:
          sessionStorage.removeItem('adminAccessToken')
          sessionStorage.removeItem('adminId')
          setIsLogin(false)
          setAdminId(null)
          showToast({ type: 'success', msg: '로그아웃 되었습니다.' })
          navigate('/admin/login')
          break
        default:
          showToast({ type: 'error', msg: '로그아웃에 실패했습니다.' })
      }
    },
    onError: () => {},
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <aside className="bg-gray-10 flex min-h-screen w-full max-w-73 flex-col gap-5 p-5">
      <div className="h-14">
        <img src={LogoImg} alt="Datcha" />
      </div>

      <div className="flex justify-between border-t border-b border-gray-200 py-5">
        <div className="flex items-center gap-2">
          <div>
            <img src={AddminIcon} alt="관리자" />
          </div>
          <span className="text-gray-700">
            {isLoading
              ? '정보를 불러오는 중입니다.'
              : isError
                ? '정보를 불러오지 못했습니다.'
                : adminProfile.data.email}
          </span>
        </div>
        <button onClick={handleLogout}>
          <LogoutIcon className="hover:text-pri-400 cursor-pointer text-gray-600" />
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        {adminSidebarMenu.map(item => {
          const isActive = location.pathname.startsWith(item.path)
          const Icon = item.icon

          const direction = prevIndex > currentIndex ? 10 : -10

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-smooth flex items-center gap-5 ${isActive ? 'text-pri-400' : 'hover:text-pri-400 text-gray-400'} `}
            >
              {isActive ? (
                <motion.div
                  key="active-bar"
                  initial={{ y: direction }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ActiveBarIcon className="h-12.5" />
                </motion.div>
              ) : (
                <ActiveBarIcon className="h-12.5 opacity-0" />
              )}

              <div className="flex items-center gap-4">
                <Icon className="h-6 w-6" />
                <span className="text-fs20">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
