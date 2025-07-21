import KakaoPay from '../../../../assets/images/kakao-pay.svg'
import NaverPay from '../../../../assets/images/naver-pay.svg'
import TossPay from '../../../../assets/images/toss-pay.png'
import { eventCouponItem } from '../../../../apis/eventCoupon'

const EventConfig = {
  카카오페이: {
    color: 'bg-kakao',
    title: '카카오페이 5% 할인',
    description: '카카오로 할인받자',
    icon: KakaoPay,
  },
  네이버페이: {
    color: 'bg-naver',
    title: '네이버페이 7% 적립',
    description: '네이버로 결제하고 포인트 받자',
    icon: NaverPay,
  },
  토스페이: {
    color: 'bg-toss',
    title: '토스페이 3% 캐시백',
    description: '토스로 간편결제',
    icon: TossPay,
  },
}

type EventCouponProps = {
  coupon: eventCouponItem
  deviceType: string
}

const EventCoupon = ({ coupon, deviceType }: EventCouponProps) => {
  // const payType = coupon.eventCoupon.payType.name as keyof typeof EventConfig
  const payType = coupon.eventCoupon.payType.name as keyof typeof EventConfig
  const config = EventConfig[payType]
  const date = `유효기간 | ${new Date(coupon.expiresAt).toLocaleDateString('ko-KR')}`
  const smallScreen = deviceType === 'mobile' || deviceType === 'tablet'
  const heightClass = smallScreen ? 'h-28' : 'h-33'
  const titleClass = smallScreen ? 'text-fs18' : 'text-fs20'
  const descriptionClass = smallScreen ? 'text-fs14 gap-[0.4rem]' : 'text-fs16 gap-[0.625rem]'
  const imageClass = smallScreen ? 'h-7' : 'h-10'

  return (
    <div className={`shadow-coupon rounded-custom-m flex w-full ${heightClass}`}>
      <div className={`w-[0.375rem] ${config.color} rounded-l-custom-m`} />

      <div className="rounded-r-custom-m bg-gray-10 flex h-full flex-1 items-center justify-between p-5">
        <div className="flex h-full flex-col justify-between">
          <p className={`${titleClass} text-truncate font-semibold`}>{config.title}</p>
          <div className={`${descriptionClass} text-truncate flex flex-col`}>
            <p className="font-medium">{config.description}</p>
            <p className="text-fs12 text-gray-600">{date}</p>
          </div>
        </div>
        <img src={config.icon} alt={payType} className={`text-truncate ${imageClass}`} />
      </div>
    </div>
  )
}

export default EventCoupon
