import { UserEventCoupon } from '../../../../apis/eventCoupon'
import KakaoPay from '../../../../assets/images/kakao-pay.svg'
import NaverPay from '../../../../assets/images/naver-pay.svg'
import TossPay from '../../../../assets/images/toss-pay.png'

type EventCouponProps = {
  coupon: UserEventCoupon
  deviceType: string
}

const EventCoupon = ({ coupon, deviceType }: EventCouponProps) => {
  const { payTypeId } = coupon.eventCoupon.payType

  // 배경색 및 아이콘 결정
  let bgColor = 'bg-pri-500'
  let icon: string | undefined

  switch (payTypeId) {
    case 3:
      bgColor = 'bg-toss'
      icon = TossPay
      break
    case 5:
      bgColor = 'bg-kakao'
      icon = KakaoPay
      break
    case 6:
      bgColor = 'bg-naver'
      icon = NaverPay
      break
    default:
      bgColor = 'bg-pri-500'
  }

  const title = coupon.eventCoupon.couponName
  const description = coupon.eventCoupon.couponDescription
  const date = `유효기간 | ${new Date(coupon.expiresAt).toLocaleDateString('ko-KR')}`

  const smallScreen = deviceType === 'mobile' || deviceType === 'tablet'
  const heightClass = smallScreen ? 'h-28' : 'h-33'
  const titleClass = smallScreen ? 'text-fs18' : 'text-fs20'
  const descriptionClass = smallScreen ? 'text-fs14 gap-[0.4rem]' : 'text-fs16 gap-[0.625rem]'
  const imageClass = smallScreen ? 'h-7' : 'h-10'

  return (
    <div className={`shadow-coupon rounded-custom-m flex w-full ${heightClass}`}>
      <div className={`w-[0.375rem] ${bgColor} rounded-l-custom-m`} />

      <div className="rounded-r-custom-m bg-gray-10 flex h-full flex-1 items-center justify-between p-5">
        <div className="flex h-full flex-col justify-between">
          <p className={`${titleClass} text-truncate font-semibold`}>{title}</p>
          <div className={`${descriptionClass} text-truncate flex flex-col`}>
            <p className="font-medium">{description}</p>
            <p className="text-fs12 text-gray-600">{date}</p>
          </div>
        </div>
        {icon && (
          <img src={icon} alt="결제 수단 아이콘" className={`text-truncate ${imageClass}`} />
        )}
      </div>
    </div>
  )
}

export default EventCoupon
