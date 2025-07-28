import { Dispatch, SetStateAction, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@/assets/icons/search.svg?react'
import NotificationIcon from '@/assets/icons/notification.svg?react'
import NotificationActiveIcon from '@/assets/icons/notification-active.svg?react'
import MenuIcon from '@/assets/icons/menu.svg?react'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '../../apis/userInfo'
import TriangleIcon from '@/assets/icons/triangle.svg?react'
import UserInfoModal from './UserInfoModal'
import { AnimatePresence } from 'framer-motion'
import DropdownMotion from '../Animation/DropDownMotion'

interface HeaderNavProps {
  deviceType: string
  setShowMobileSearch: Dispatch<SetStateAction<boolean>>
}

const HeaderNav = ({ deviceType, setShowMobileSearch }: HeaderNavProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeNav, setActiveNav] = useState<string | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  })

  const nickname = userProfile?.nickname ?? ''
  const email = userProfile?.email ?? ''
  const telecomCompany = userProfile?.telecomCompany?.name ?? ''

  const isLoggedIn = !!userProfile && !!userProfile.nickname
  const notifications = [{ sample1: 'sample1' }]
  const hasUnreadNotifications = notifications.length > 0

  const isActiveLink = (path: string) => location.pathname.startsWith(path)

  const handleAction = (key: string, callback: () => void) => () => {
    setActiveNav(key)
    if (isLoggedIn) {
      callback()
    } else {
      navigate('/login')
    }
  }

  const navButtons = [
    {
      key: 'notification',
      label: '알림',
      action: () => alert('알림 모달 오픈'),
      badge: hasUnreadNotifications,
    },
    {
      key: 'mypage',
      label: '마이페이지',
      action: () => navigate('/mypage/data-charge'),
    },
    {
      key: 'profile',
      label: isLoggedIn ? userProfile.nickname : '로그인',
      action: () => {
        if (isLoggedIn) {
          setIsProfileOpen(prev => !prev)
        } else {
          navigate('/login')
        }
      },
    },
  ]

  const navLinks = [
    {
      label: '데이터 거래',
      to: '/posts',
      matchPath: '/posts',
    },
    {
      label: '관심 거래',
      to: isLoggedIn ? '/mypage/favorites' : '/login',
      matchPath: '/mypage/favorites',
    },
    {
      label: '내 판매글',
      to: isLoggedIn ? '/my-posts' : '/login',
      matchPath: '/my-posts',
    },
  ]

  const mobileNav = [
    {
      key: 'search',
      icon: <SearchIcon />,
      action: () => setShowMobileSearch(prev => !prev),
    },
    {
      key: 'notification',
      icon: hasUnreadNotifications ? <NotificationActiveIcon /> : <NotificationIcon />,
      action: () => alert('알림 모달 오픈'),
    },
    {
      key: 'menu',
      icon: <MenuIcon />,
      action: () => alert('모바일 메뉴 오픈'),
    },
  ]

  // 모바일 nav
  if (deviceType === 'mobile') {
    return (
      <nav className="flex items-center gap-4 sm:hidden">
        {mobileNav.map(({ key, icon, action }) => (
          <button
            key={key}
            type="button"
            onClick={handleAction(key, action)}
            className={`hover:text-pri-500 cursor-pointer ${activeNav === key ? 'text-pri-500' : ''}`}
          >
            {icon}
          </button>
        ))}
      </nav>
    )
  }

  return (
    <div className="font-regular flex flex-col items-end gap-4">
      {/* 상단 nav */}
      <nav className="text-fs12">
        <ul className="flex gap-4">
          {navButtons.map(({ key, label, action, badge }) => (
            <li key={key} className="relative">
              <button
                type="button"
                onClick={handleAction(key, action)}
                className={`hover:text-pri-500 relative cursor-pointer ${activeNav === key ? 'text-pri-500' : ''}`}
              >
                {key === 'profile' && isLoggedIn ? (
                  <div className="flex items-center gap-0.5">
                    <span>{label}</span>
                    <TriangleIcon
                      className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                ) : (
                  <span>{label}</span>
                )}
                {badge && (
                  <span className="bg-error absolute -right-[0.3125rem] h-1 w-1 rounded-full" />
                )}
              </button>

              {key === 'profile' && isProfileOpen && isLoggedIn && (
                <AnimatePresence>
                  <DropdownMotion className="absolute top-full right-0 z-50 mt-3">
                    <UserInfoModal
                      nickname={nickname}
                      email={email}
                      telecomCompany={telecomCompany}
                      onClose={() => setIsProfileOpen(false)}
                    />
                  </DropdownMotion>
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* 하단 nav */}
      <nav className="text-fs20">
        <ul className="flex gap-4">
          {navLinks.map(({ label, to, matchPath }) => (
            <li key={label}>
              <Link
                to={to}
                className={`hover:text-pri-500 ${isActiveLink(matchPath) ? 'text-pri-500' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default HeaderNav
