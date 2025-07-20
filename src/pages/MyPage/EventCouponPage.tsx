import EventCoupon from './components/EventCoupon/EventCoupon'
import { eventCouponItem } from '../../apis/eventCoupon'
import { useDeviceType } from '../../hooks/useDeviceType'
// import { useQuery } from '@tanstack/react-query'

const dummyCoupons: eventCouponItem[] = [
  {
    userEventCouponId: 1,
    expiresAt: '2025-08-31T23:59:59Z',
    status: { statusId: 1, code: 'active' },
    eventCoupon: {
      eventCouponId: 101,
      couponNumber: 'CPN001',
      couponName: '카카오페이 할인',
      discountRate: 5,
      payType: { payTypeId: 1, name: '카카오페이' },
    },
  },
  {
    userEventCouponId: 2,
    expiresAt: '2025-09-15T23:59:59Z',
    status: { statusId: 1, code: 'active' },
    eventCoupon: {
      eventCouponId: 102,
      couponNumber: 'CPN002',
      couponName: '토스페이 캐시백',
      discountRate: 3,
      payType: { payTypeId: 2, name: '토스페이' },
    },
  },
  {
    userEventCouponId: 3,
    expiresAt: '2025-10-01T23:59:59Z',
    status: { statusId: 1, code: 'active' },
    eventCoupon: {
      eventCouponId: 103,
      couponNumber: 'CPN003',
      couponName: '네이버페이 적립',
      discountRate: 7,
      payType: { payTypeId: 3, name: '네이버페이' },
    },
  },
]

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
