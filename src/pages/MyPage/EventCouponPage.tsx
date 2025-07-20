import EventCoupon from './components/EventCoupon/EventCoupon'
import { dummyCoupons } from '../../mocks/EventCouponData'
import { useDeviceType } from '../../hooks/useDeviceType'
// import { useQuery } from '@tanstack/react-query'

const EventCouponPage = () => {
  // const { data, isLoading, isError } = useQuery<eventCouponItem[]>({
  //   queryKey: ['eventCoupons'],
  //   queryFn: getEventCoupons,
  // })
  // if (isLoading) return <p>로딩 중...</p>
  // if (isError) return <p>에러가 발생했습니다.</p>
  // if (!data || data.length === 0) return <p>사용 가능한 쿠폰이 없습니다.</p>
  const deviceType = useDeviceType()
  const gridColsClass = deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'

  return (
    <div>
      <div className={`grid gap-4 ${gridColsClass}`}>
        {dummyCoupons.map(coupon => (
          <EventCoupon key={coupon.userEventCouponId} coupon={coupon} deviceType={deviceType} />
        ))}
      </div>
    </div>
  )
}

export default EventCouponPage
