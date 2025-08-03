import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserDataStatus, getUserPayStatus } from '../../apis/userInfo'
import { formatAmount, formatDataSize } from '../../utils/format'
import { getTelecomBadgeColor, getTelecomBadgeText } from '../../utils/telecom'
import Badge from '../Badge/Badge'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import { logout } from '../../apis/auth'
import { toast } from 'react-toastify'
import { useAuthStore, usePermissionStore } from '../../store/authStore'
import { useNotificationStore } from '../../store/notificationStore'
import { useEffect, useRef } from 'react'
interface Props {
  nickname: string
  email: string
  telecomCompany: string
  onClose: () => void
}

const UserInfoModal = ({ nickname, email, telecomCompany, onClose }: Props) => {
  const setIsLoggedin = useAuthStore(state => state.setIsLogin)
  const userId = useAuthStore(state => state.userId)
  const { setPermissionInitialized, setPermissions } = usePermissionStore()
  const modalRef = useRef<HTMLDivElement>(null)

  const { data: payStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
  })

  const { data: dataStatus } = useQuery({
    queryKey: ['userDataStatus'],
    queryFn: getUserDataStatus,
  })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

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

      toast.success('로그아웃 되었습니다.')
      navigate('/login', { replace: true })
    },
    onError: error => {
      console.error('로그아웃 실패:', error)
      toast.error('로그아웃에 실패했습니다.')
    },
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const timeout = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onClose])

  const handleLogout = () => {
    // SSE 연결 끊기 및 상태 초기화
    const { disconnectFn, clearDisconnectFn, clearNotifications } = useNotificationStore.getState()

    disconnectFn?.()
    clearDisconnectFn()
    clearNotifications()

    // 서버 로그아웃 요청
    logoutMutate()
  }

  return (
    <div
      ref={modalRef}
      className="rounded-custom-m bg-gray-10 shadow-header-modal absolute right-0 z-50 flex w-[236px] flex-col gap-4.5 p-5"
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-fs16">
          <span className="font-semibold">{nickname}</span>님
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="text-fs12 hover:border-pri-400 hover:text-pri-400 flex items-center justify-center rounded-xs border border-gray-500 px-1.5 py-1 text-xs text-gray-700 transition-colors duration-200"
        >
          로그아웃
        </button>
      </div>
      <div className="text-fs12 font-medium text-gray-700">{email}</div>
      <div className="text-fs14 flex w-full flex-col justify-between gap-2">
        <div className="flex items-center justify-between">
          <span>통신사</span>
          <Badge
            label={getTelecomBadgeText(telecomCompany)}
            size="extra-small"
            className={getTelecomBadgeColor(telecomCompany)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>보유 페이</span>
          <span className="text-pri-500 flex items-center gap-1">
            <DatchaCoinIcon className="h-3.5 w-3.5" />
            <span>{formatAmount(payStatus?.balance ?? 0)}</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span>보유 데이터</span>
          <span>{formatDataSize(dataStatus?.totalDataMb ?? 0)}</span>{' '}
        </div>
        <div className="flex items-center justify-between">
          <span>판매 가능 데이터</span>
          <span>{formatDataSize(dataStatus?.sellableDataMb ?? 0)}</span>{' '}
        </div>
      </div>
    </div>
  )
}

export default UserInfoModal
