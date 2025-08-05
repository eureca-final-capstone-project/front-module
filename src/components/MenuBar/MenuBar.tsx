import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserDataStatus, getUserPayStatus, getUserProfile } from '../../apis/userInfo'
import { formatAmount, formatDataSize, formatPhoneNumber } from '../../utils/format'
import { getTelecomBadgeColor, getTelecomBadgeText } from '../../utils/telecom'
import { useAuthStore, usePermissionStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import SlideInMotion from '../Animation/SlideInMotion'
import Badge from '../Badge/Badge'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import LockedIcon from '@/assets/icons/locked.svg?react'
import { logout } from '../../apis/auth'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import { useEffect, useMemo, useState } from 'react'
import EditModal from '../../pages/MyPage/components/Modal/EditModal'
import NavTile from './NavTile'
import SubNavTile from './SubNavTile'
import DropdownToggleMotion from '../Animation/DropDownToggleMotion'
import { useDragControls } from 'framer-motion'
import { useScrollBlock } from '../../hooks/useScrollBlock'
import { useDeviceType } from '../../hooks/useDeviceType'

interface MenuBarProps {
  isOpen: boolean
  onClose: () => void
}

const MenuBar = ({ isOpen, onClose }: MenuBarProps) => {
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'

  const shouldBlockScroll = useMemo(() => isMobile && isOpen, [isMobile, isOpen])
  useScrollBlock(shouldBlockScroll)

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const location = useLocation()
  const controls = useDragControls()

  const isLoggedIn = useAuthStore(state => state.isLogin)
  const setIsLoggedin = useAuthStore(state => state.setIsLogin)
  const userId = useAuthStore(state => state.userId)
  const { setPermissionInitialized, setPermissions } = usePermissionStore()

  const pathname = location.pathname
  const isMyPagePath = pathname.startsWith('/mypage')

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isMyPageOpen, setIsMyPageOpen] = useState(isMyPagePath)

  useEffect(() => {
    if (isLoggedIn) {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      queryClient.invalidateQueries({ queryKey: ['userPayStatus'] })
      queryClient.invalidateQueries({ queryKey: ['userDataStatus'] })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isOpen) {
      setIsMyPageOpen(pathname.startsWith('/mypage'))
    }
  }, [isOpen, pathname])

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled: isLoggedIn,
  })

  const { data: userPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
    enabled: isLoggedIn,
  })

  const { data: userDataStatus } = useQuery({
    queryKey: ['userDataStatus'],
    queryFn: getUserDataStatus,
    enabled: isLoggedIn,
  })

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      setIsLoggedin(false)
      setPermissions([])
      setPermissionInitialized(false)
      sessionStorage.removeItem('userAccessToken')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem(`permission_modal_shown_${userId}`)
      const { disconnectFn, clearDisconnectFn, clearNotifications } =
        useNotificationStore.getState()
      disconnectFn?.()
      clearDisconnectFn()
      clearNotifications()
      toast.success('로그아웃 되었습니다.')
      navigate('/login', { replace: true })
    },
    onError: error => {
      console.error('로그아웃 실패:', error)
      toast.error('로그아웃에 실패했습니다.')
    },
  })

  const handleLogout = () => {
    const { disconnectFn, clearDisconnectFn, clearNotifications } = useNotificationStore.getState()
    disconnectFn?.()
    clearDisconnectFn()
    clearNotifications()

    logoutMutate()
  }

  return (
    <SlideInMotion
      isOpen={isOpen}
      onClose={onClose}
      title="메뉴"
      controls={controls}
      onContentPointerDown={e => controls.start(e)}
    >
      <div
        className="scrollbar-hide bg-gray-10 mt-16 flex flex-1 flex-col gap-2 overflow-y-auto pb-4"
        onPointerDown={e => controls.start(e)}
        style={{ touchAction: 'pan-y' }}
      >
        {isLoggedIn ? (
          <div className="bg-gray-10 mx-4 flex flex-col gap-4 rounded-md border-1 border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div className="text-fs16 font-semibold">{userProfile?.nickname}님</div>
              <div className="flex gap-1">
                <Button
                  extraSmallPadding
                  noShadow
                  text="프로필 수정"
                  className="text-fs12 text-pri-400 rounded-xs border px-2 py-1"
                  onClick={() => setIsEditModalOpen(true)}
                />
                <Button
                  extraSmallPadding
                  noShadow
                  text="로그아웃"
                  className="text-fs12 rounded-xs border px-2 py-1 text-gray-500 hover:text-gray-700"
                  onClick={handleLogout}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex gap-1">
                <Badge
                  label={getTelecomBadgeText(userProfile?.telecomCompany?.name ?? '')}
                  size="extra-small"
                  className={getTelecomBadgeColor(userProfile?.telecomCompany?.name ?? '')}
                />
                <div className="text-fs14 text-gray-700">
                  {userProfile?.phoneNumber ? formatPhoneNumber(userProfile.phoneNumber) : ''}
                </div>
              </div>
              <div className="text-fs14 text-gray-700">{userProfile?.email}</div>
            </div>

            <div className="text-fs14 flex flex-col gap-2">
              <div className="flex justify-between">
                <span>보유 페이</span>
                <span className="text-pri-500 flex items-center gap-1">
                  <DatchaCoinIcon className="h-3.5 w-3.5" />
                  <span>{formatAmount(userPayStatus?.balance ?? 0)}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>보유 데이터</span>
                <span>{formatDataSize(userDataStatus?.totalDataMb ?? 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>구매 데이터</span>
                <span>{formatDataSize(userDataStatus?.buyerDataMb ?? 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>판매 가능 데이터</span>
                <span>{formatDataSize(userDataStatus?.sellableDataMb ?? 0)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-10 mx-4 flex flex-col items-center gap-4 rounded-md border-1 border-gray-200 p-6 text-center">
            <LockedIcon className="h-10 w-10 text-gray-400" />
            <div className="space-y-2">
              <p className="text-fs16 font-semibold text-gray-900">로그인이 필요합니다.</p>
              <p className="text-fs12 text-gray-700">
                로그인하고 다챠의 더 많은 기능을 이용해보세요!
              </p>
            </div>
            <Button
              text="로그인하기"
              onClick={() => {
                navigate('/login')
                onClose?.()
              }}
              noShadow
              className="bg-pri-500 text-fs16 text-gray-10 mt-2 rounded-sm px-3 py-2.5"
            />
          </div>
        )}
        <div className="mt-2 flex flex-col gap-0.5">
          <NavTile
            label="데이터 거래"
            to="/posts"
            onClose={onClose}
            active={pathname.startsWith('/posts')}
          />
          <NavTile
            label="판매글 작성"
            to="/post-write"
            onClose={onClose}
            active={pathname === '/post-write'}
          />
          <NavTile
            label="마이페이지"
            onClick={() => setIsMyPageOpen(prev => !prev)}
            onClose={onClose}
            withArrow
            isOpen={isMyPageOpen}
          >
            <DropdownToggleMotion isOpen={isMyPageOpen}>
              <div className="flex flex-col gap-0.5">
                <SubNavTile
                  label="내 판매글"
                  to="/my-posts"
                  active={pathname === '/my-posts'}
                  onClose={onClose}
                />
                <SubNavTile
                  label="데이터 충전권"
                  to="/mypage/data-charge"
                  active={pathname === '/mypage/data-charge'}
                  onClose={onClose}
                />
                <SubNavTile
                  label="관심 거래"
                  to="/mypage/favorites"
                  active={pathname === '/mypage/favorites'}
                  onClose={onClose}
                />
                <SubNavTile
                  label="이벤트 쿠폰함"
                  to="/mypage/event-coupons"
                  active={pathname === '/mypage/event-coupons'}
                  onClose={onClose}
                />
                <SubNavTile
                  label="거래 내역"
                  to="/mypage/transaction-history"
                  active={pathname === '/mypage/transaction-history'}
                  onClose={onClose}
                />
                <SubNavTile
                  label="페이 내역"
                  to="/mypage/pay-history"
                  active={pathname === '/mypage/pay-history'}
                  onClose={onClose}
                />
                <SubNavTile
                  label="신고 내역"
                  to="/mypage/report-history"
                  active={pathname === '/mypage/report-history'}
                  onClose={onClose}
                />
              </div>
            </DropdownToggleMotion>
          </NavTile>

          <NavTile
            label="데이터 전환"
            to="/change-data"
            onClose={onClose}
            active={pathname === '/change-data'}
          />
          <NavTile
            label="페이 충전"
            to="/payment"
            onClose={onClose}
            active={pathname === '/payment'}
          />
          <NavTile
            label="페이 환전"
            to="/refund"
            onClose={onClose}
            active={pathname === '/refund'}
          />
          <NavTile
            label="서비스 가이드"
            to="/guide"
            onClose={onClose}
            active={pathname === '/guide'}
          />
        </div>
      </div>
      {userProfile && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          nickname={userProfile.nickname}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] })
          }}
        />
      )}
    </SlideInMotion>
  )
}

export default MenuBar
