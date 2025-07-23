import LogoImg from '@/assets/images/logo-primary.svg'
import AddminIcon from '@/assets/icons/admin.svg'
import LogoutIcon from '@/assets/icons/logout.svg?react'
import ActiveBarIcon from '@/assets/icons/active-bar.svg?react'
import { sidebarMenu } from '../../../constants/adminMenu'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const location = useLocation()

  const [prevIndex, setPrevIndex] = useState(0)

  // 현재 활성 메뉴의 index 찾기
  const currentIndex = sidebarMenu.findIndex(item => location.pathname.startsWith(item.path))

  // prevIndex 업데이트
  useEffect(() => {
    setPrevIndex(currentIndex)
  }, [currentIndex])

  const handleLogout = () => {}

  return (
    <aside className="bg-gray-10 flex min-h-screen max-w-73 flex-col gap-5 p-5">
      <div className="h-14">
        <img src={LogoImg} alt="Datcha" />
      </div>

      <div className="flex justify-between border-t border-b border-gray-200 py-5">
        <div className="flex items-center gap-2">
          <div>
            <img src={AddminIcon} alt="관리자" />
          </div>
          <span>admin@datcha.com</span>
        </div>
        <button onClick={handleLogout}>
          <LogoutIcon className="hover:text-pri-400 text-gray-600" />
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        {sidebarMenu.map(item => {
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
                <span className="ml-1">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
