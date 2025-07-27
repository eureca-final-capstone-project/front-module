import EventCoupon from './components/EventCoupon/EventCoupon'
import { useDeviceType } from '../../hooks/useDeviceType'
import { useQuery } from '@tanstack/react-query'
import { getUserEventCoupons } from '../../apis/eventCoupon'

const EventCouponPage = () => {
  const deviceType = useDeviceType()
  const gridColsClass = deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userEventCoupons'],
    queryFn: getUserEventCoupons,
  })

  const eventCoupons = data?.data.coupons ?? []

  if (isLoading) return <p>쿠폰 불러오는 중</p>
  if (isError) return <p>쿠폰을 불러오는데 실패했습니다</p>

  return (
    <div className="p-4 sm:p-0">
      <div className={`grid gap-4 ${gridColsClass}`}>
        {eventCoupons.map(eventCoupon => (
          <EventCoupon
            key={eventCoupon.userEventCouponId}
            coupon={eventCoupon}
            deviceType={deviceType}
          />
        ))}
      </div>
    </div>
  )
}

export default EventCouponPage
