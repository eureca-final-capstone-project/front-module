import { useNavigate } from 'react-router-dom'
import { NotificationItem } from '../../apis/alert'
import { formatRelativeTime } from '../../utils/time'
import DatchaIcon from '@/assets/icons/datcha-square.svg?react'
import CouponIcon from '@/assets/icons/coupon-fill.svg?react'
import BidIcon from '@/assets/icons/bid.png'
import BidGrayIcon from '@/assets/icons/bid-gray.png'
import StyledAlertContent from './StyledAlertContent'
import { getDragging } from '../../utils/dragState'

interface Props {
  notification: NotificationItem
  onRead: (alarmId: number) => void
}

const AlertItem = ({ notification, onRead }: Props) => {
  const isRead = notification.status.code === 'READ'
  const navigate = useNavigate()

  const handleClick = () => {
    if (getDragging()) return
    const id = notification.alarmType.alarmTypeId

    if (id === 4) {
      onRead(notification.alarmId)
      return
    }

    const feedId = notification.transactionFeedId
    const salesType = notification.salesType

    if (feedId && salesType) {
      const path = salesType === '일반 판매' ? 'normal' : salesType === '입찰 판매' ? 'bid' : null

      if (path) {
        navigate(`/posts/${path}/${feedId}`)
      }
    }

    onRead(notification.alarmId)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col gap-2 p-5 transition-colors duration-300 ${
        isRead ? 'bg-gray-50 text-gray-500' : 'bg-gray-10 text-gray-900'
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          {getIcon(notification.alarmType.alarmTypeId, notification.status.code !== 'UNREAD')}
          <p className="text-fs14 font-medium">
            {getTitleByTypeId(notification.alarmType.alarmTypeId)}
          </p>
        </div>
        <p className="text-fs12">{formatRelativeTime(notification.createdAt)}</p>
      </div>
      <StyledAlertContent
        content={notification.content}
        isRead={notification.status.code === 'READ'}
      />
    </div>
  )
}

export default AlertItem

const getTitleByTypeId = (id: number): string => {
  switch (id) {
    case 1:
      return '데이터 구매가 성공적으로 완료됐어요!'
    case 2:
      return '데이터가 판매되었어요!'
    case 3:
      return '데이터 입찰에 성공했어요!'
    case 4:
      return '보유하신 쿠폰이 만료되었어요!'
    case 5:
      return '게시글 판매 기간이 만료되었어요!'
    case 6:
      return '입찰하신 상품에 새 입찰자가 등장했어요!'
    default:
      return '알림이 도착했어요!'
  }
}
const getIcon = (id: number, isRead: boolean) => {
  switch (id) {
    case 1:
    case 2:
    default:
      return <DatchaIcon className={`h-4 w-4 ${isRead ? 'text-gray-500' : 'text-pri-500'}`} />
    case 3:
    case 5:
    case 6:
      return <img src={isRead ? BidGrayIcon : BidIcon} alt="입찰 아이콘" className="h-4 w-4" />
    case 4:
      return <CouponIcon className={`h-4 w-4 ${isRead ? 'text-gray-500' : 'text-pri-500'}`} />
  }
}
