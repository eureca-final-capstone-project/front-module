import Container from '../Container/Container'
import LogoPrimary from '@/assets/images/logo-primary.svg'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'
import { useDeviceType } from '../../hooks/useDeviceType'
import { motion, AnimatePresence } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import SearchIcon from '@/assets/icons/search.svg?react'
import NotificationIcon from '@/assets/icons/notification.svg?react' // 기본 (알림 없음)
import NotificationActiveIcon from '@/assets/icons/notification-active.svg?react' // 알림 존재
import MenuIcon from '@/assets/icons/menu.svg?react'
import HeaderNav from './HeaderNav'

const Header = ({
  showMobileSearch,
  setShowMobileSearch,
}: {
  showMobileSearch: boolean
  setShowMobileSearch: Dispatch<SetStateAction<boolean>>
}) => {
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  const notifications = [{ sample1: 'sample1' }]
  const hasUnreadNotifications = notifications.length > 0

  const handleSearch = (keyword: string) => {
    navigate(`/list?keyword=${encodeURIComponent(keyword)}`)
  }

  return (
    <header className="bg-gray-10 fixed z-50 flex h-16 w-full items-center p-4 shadow-xs sm:h-21.5">
      <Container className="flex items-center justify-between gap-4">
        <div onClick={() => navigate('/')} className="h-full cursor-pointer">
          <img src={LogoPrimary} alt="로고" className="h-full" />
        </div>
        {deviceType === 'desktop' || deviceType === 'tablet' ? (
          <>
            {/* 데스크탑, 태블릿 */}
            <SearchBar onSubmit={handleSearch} />
            <HeaderNav />
          </>
        ) : (
          <>
            {/* 모바일 */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowMobileSearch(prev => !prev)}
                className="cursor-pointer"
              >
                <SearchIcon />
              </button>
              <button type="button" className="cursor-pointer">
                {hasUnreadNotifications ? <NotificationActiveIcon /> : <NotificationIcon />}
              </button>
              <button type="button" className="cursor-pointer">
                <MenuIcon />
              </button>
            </div>
            <AnimatePresence>
              {showMobileSearch && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top' }}
                  className="bg-gray-10 absolute top-16 right-0 left-0 px-4 pb-4 shadow-xs"
                >
                  <SearchBar onSubmit={handleSearch} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Container>
    </header>
  )
}

export default Header
