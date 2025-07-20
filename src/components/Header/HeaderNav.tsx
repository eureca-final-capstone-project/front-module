import { Link, useNavigate } from 'react-router-dom'

const HeaderNav = () => {
  const navigate = useNavigate()

  const isLoggedIn = true

  const notifications = [{ sample1: 'sample1' }]
  const hasUnreadNotifications = notifications.length > 0

  const handleAction = (loggedInCallback: () => void) => () => {
    if (isLoggedIn) {
      loggedInCallback()
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="font-regular flex flex-col items-end gap-4">
      <nav className="text-fs12">
        <ul className="flex gap-4">
          <li>
            <button
              type="button"
              className="hover:text-pri-500 relative cursor-pointer"
              onClick={handleAction(() => {
                // TODO: 알림 모달 오픈
                alert('알림 모달 오픈')
              })}
            >
              <span>알림</span>
              {hasUnreadNotifications && (
                <span className="bg-error absolute -right-[0.3125rem] h-1 w-1 rounded-full"></span>
              )}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleAction(() => navigate('/mypage/favorites'))}
            >
              마이페이지
            </button>
          </li>
          <li>
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleAction(() => {
                // TODO: 사용자 정보 모달 오픈
                alert('사용자 정보 모달 오픈')
              })}
            >
              {isLoggedIn ? '닉네임' : '로그인'}
            </button>
          </li>
        </ul>
      </nav>
      <nav className="text-fs20">
        <ul className="flex gap-4">
          <li>
            <Link to="#">데이터 거래</Link>
          </li>
          <li>
            <Link to={isLoggedIn ? '/mypage/favorites' : '/login'}>관심 거래</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HeaderNav
