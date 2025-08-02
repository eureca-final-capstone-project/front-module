import SlideInMotion from '../Animation/SlideInMotion'
import NotificationIcon from '@/assets/icons/notification.svg?react'
import AlertItem from './AlertItem'
import LockedIcon from '@/assets/icons/locked.svg?react'
import Button from '../Button/Button'
import { NotificationItem } from '../../apis/alert'

interface MobileProps {
  notifications: NotificationItem[]
  onRead: (alarmId: number) => void
  onMarkAllAsRead: () => void
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void
  isFetchingNextPage: boolean
  shouldShowCompleteMessage: boolean
  onClose?: () => void
}

const NotificationView = ({
  notifications,
  onRead,
  onMarkAllAsRead,
  onScroll,
  isFetchingNextPage,
  shouldShowCompleteMessage,
  onClose,
}: MobileProps) => {
  return (
    <SlideInMotion isOpen onClose={onClose}>
      <div className="relative">
        <div className="text-fs16 absolute top-6.5 left-0 flex gap-1 px-5 text-gray-900">
          <NotificationIcon className="h-4.5 w-4.5" />
          <h2>알림</h2>
        </div>

        <button
          className="text-fs12 absolute top-6.5 right-10 px-5 text-gray-600 hover:text-gray-800"
          onClick={onMarkAllAsRead}
        >
          전체 읽음 처리
        </button>
      </div>

      <div className="mt-16 flex flex-1 flex-col overflow-y-auto" onScroll={onScroll}>
        {notifications.map((notification, index) => (
          <div key={notification.alarmId}>
            <AlertItem notification={notification} onRead={onRead} />
            {index !== notifications.length - 1 && <div className="border-t border-gray-100" />}
          </div>
        ))}

        {isFetchingNextPage && <p className="text-fs14 py-4 text-center">불러오는 중</p>}

        {shouldShowCompleteMessage && (
          <p className="text-pri-500 text-fs14 pt-6 pb-4 text-center">
            최근 14일 동안 받은 알림을 모두 확인했습니다.
          </p>
        )}
      </div>
    </SlideInMotion>
  )
}

const LoginView = ({ onClose }: { onClose?: () => void }) => (
  <>
    <button onClick={onClose} className="absolute top-10 right-10 z-10 text-gray-500"></button>
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 text-center">
      <LockedIcon className="h-10 w-10 text-gray-400" />
      <div>
        <p className="text-fs16 font-semibold text-gray-900">로그인이 필요합니다.</p>
        <p className="text-fs14 mt-1 text-gray-500">
          로그인하고 다차 거래 상황과 소식을
          <br />
          알림으로 받아보세요.
        </p>
      </div>
      <Button
        text="로그인하기"
        className="text-fs14 border-pri-500 text-pri-500 border-[1.7px] px-11 py-3 font-medium"
        onClick={() => (window.location.href = '/login')}
      />
    </div>
    <div className="bg-pri-500 h-5" />
  </>
)

const AlertMobile = {
  NotificationView,
  LoginView,
}

export default AlertMobile
