import EventCoupon from './components/EventCoupon/EventCoupon'
import { useDeviceType } from '../../hooks/useDeviceType'
import { useQuery } from '@tanstack/react-query'
import { getUserEventCoupons } from '../../apis/eventCoupon'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import EventCouponIcon from '@/assets/icons/event-coupon.svg?react'
import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import MobileWrapper from './components/MobileWrapper'

const EventCouponPage = () => {
  const deviceType = useDeviceType()
  const gridColsClass = deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userEventCoupons'],
    queryFn: getUserEventCoupons,
  })

  const eventCoupons = data?.data.coupons ?? []
  const pagedCoupons = eventCoupons.slice((page - 1) * 6, page * 6)

  const renderStatusFallback = () => {
    let title = ''
    let subtitle: React.ReactNode = null
    let textColor = 'text-gray-500'

    if (isLoading) {
      title = '쿠폰을 불러오는 중이예요'
      subtitle = null
    } else if (isError) {
      title = '쿠폰을 불러오지 못했습니다'
      subtitle = (
        <p className="sm:text-fs14 text-fs12 mt-2 text-gray-400">잠시 후 다시 시도해주세요</p>
      )
      textColor = 'text-error'
    } else {
      title = '보유하신 쿠폰이 없습니다'
      subtitle = (
        <div className="sm:text-fs14 text-fs12 mt-2 text-gray-400">
          <Button text="메인페이지" shape="underline" onClick={() => navigate('/')} />

          <span>에서 진행 중인 이벤트를 확인하고 쿠폰을 발급받아보세요!</span>
        </div>
      )
    }
    return (
      <div
        className={`mt-14 flex h-[20vh] flex-col items-center justify-center text-center ${textColor}`}
      >
        <EventCouponIcon className="h-6 w-8 sm:h-8 sm:w-10" />
        <p className="sm:text-fs18 text-fs16 pt-3 font-medium">{title}</p>
        {subtitle}
      </div>
    )
  }

  return (
    <MobileWrapper deviceType={deviceType} breadcrumbLabel="이벤트 쿠폰함">
      {isLoading || isError || eventCoupons.length === 0 ? (
        renderStatusFallback()
      ) : (
        <>
          <div className={`grid gap-4 px-4 sm:px-0 ${gridColsClass}`}>
            {pagedCoupons.map(eventCoupon => (
              <EventCoupon
                key={eventCoupon.userEventCouponId}
                coupon={eventCoupon}
                deviceType={deviceType}
              />
            ))}
          </div>
          <div className="mt-auto flex justify-center pb-6 sm:pb-0">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(eventCoupons.length / 4)}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </MobileWrapper>
  )
}

export default EventCouponPage
