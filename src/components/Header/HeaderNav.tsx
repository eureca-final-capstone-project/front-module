import { Dispatch, SetStateAction, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@/assets/icons/search.svg?react'
import NotificationIcon from '@/assets/icons/notification.svg?react'
import NotificationActiveIcon from '@/assets/icons/notification-active.svg?react'
import MenuIcon from '@/assets/icons/menu.svg?react'

interface HeaderNavProps {
  deviceType: string
  setShowMobileSearch: Dispatch<SetStateAction<boolean>>
}

const HeaderNav = ({ deviceType, setShowMobileSearch }: HeaderNavProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeNav, setActiveNav] = useState<string | null>(null)

  const isLoggedIn = true
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
      label: isLoggedIn ? '닉네임' : '로그인',
      action: () => alert('사용자 정보 모달 오픈'),
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
            <li key={key}>
              <button
                type="button"
                onClick={handleAction(key, action)}
                className={`hover:text-pri-500 relative cursor-pointer ${activeNav === key ? 'text-pri-500' : ''}`}
              >
                <span>{label}</span>
                {badge && (
                  <span className="bg-error absolute -right-[0.3125rem] h-1 w-1 rounded-full" />
                )}
              </button>
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
