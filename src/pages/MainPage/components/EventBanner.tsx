import { useMutation } from '@tanstack/react-query'
import ScaleDownMotion from '../../../components/Animation/ScaleDownMotion'
import { issueEventCoupon } from '../../../apis/eventCoupon'
import { useToast } from '../../../hooks/useToast'

const EventBanner = () => {
  const { showToast } = useToast()

  const EVENT_COUPON_ID = 3

  const issueCouponMutation = useMutation({
    mutationFn: issueEventCoupon,
    onSuccess: () => {
      showToast({ type: 'success', msg: '이벤트 쿠폰이 발급되었습니다!' })
    },
    onError: (error: Error & { code?: number }) => {
      switch (error.code) {
        case 10004:
          showToast({ type: 'default', msg: '로그인 후 발급 가능합니다.' })
          break
        case 40023:
          showToast({ type: 'error', msg: '쿠폰이 존재하지 않습니다.' })
          break
        case 40024:
          showToast({ type: 'error', msg: error.message || '이벤트 쿠폰을 발급받으셨습니다.' })
          break
        default:
          showToast({ type: 'error', msg: '쿠폰 발급에 실패했습니다.' })
      }
    },
  })

  const handleIssueCouponClick = () => {
    issueCouponMutation.mutate(EVENT_COUPON_ID)
  }

  return (
    <section className="bg-toss-gradation relative flex h-40 w-full flex-col items-start justify-center overflow-hidden sm:h-75">
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] items-center px-4 sm:px-0">
        <div className="flex flex-1 items-center justify-between sm:flex-col sm:items-start sm:pl-8">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-fs20 mb-2 font-extrabold text-gray-50 drop-shadow-md sm:mb-6 sm:text-3xl md:text-4xl">
              토스페이 <span className="text-kakao text-shadow-3d-yellow">3% 캐시백!</span>
            </h1>
            <h3 className="sm:text-fs20 md:text-fs24 mb-3 font-bold">
              페이 충전 시 <span className="font-bold">최대 2,000원 할인!</span>
            </h3>
            <p className="md:text-fs18 text-fs14 font-medium sm:mb-8">
              토스페이로 간편하게 충전하고, <br className="block lg:hidden" />더 많은 데이터 혜택을
              누려보세요!
            </p>
          </div>
          <ScaleDownMotion>
            <button
              onClick={handleIssueCouponClick}
              className="text-toss shadow-button text-fs12 sm:text-fs16 rounded-full bg-white px-3 py-2 font-semibold hover:bg-gray-50 sm:px-6 sm:py-3.25"
            >
              <span className="relative z-10">이벤트 쿠폰 발급</span>
            </button>
          </ScaleDownMotion>
        </div>

        <div className="relative hidden h-full w-1/2 flex-none sm:block">
          <span className="absolute top-[15%] right-[5%] rotate-12 transform text-4xl font-black text-white opacity-20 lg:text-5xl">
            PAY!
          </span>
          <span className="absolute top-[35%] right-[25%] -rotate-6 transform text-5xl font-extrabold text-yellow-300 opacity-50 lg:text-6xl">
            3%
          </span>
          <span className="absolute top-[35%] left-[10%] -rotate-15 transform text-3xl font-black text-white opacity-30 lg:text-4xl">
            2,000원
          </span>
          <span className="absolute bottom-[25%] left-[25%] rotate-20 transform text-4xl font-extrabold text-yellow-300 opacity-30 lg:text-5xl">
            UP!
          </span>
          <span className="absolute right-[10%] bottom-[10%] rotate-10 transform text-2xl font-bold text-white opacity-15 lg:text-3xl">
            CASH BACK
          </span>
          <span className="absolute top-[15%] left-1/2 -translate-x-1/2 -rotate-5 transform text-xl font-bold text-blue-200 opacity-10 lg:text-2xl">
            DATA
          </span>
          <span className="absolute bottom-[10%] left-[5%] rotate-5 transform text-xl font-bold text-blue-200 opacity-10 lg:text-2xl">
            TOSS
          </span>
          <span className="absolute top-1/4 left-[5%] -translate-y-1/2 -rotate-8 transform text-lg font-semibold text-white opacity-15 lg:text-xl">
            BENEFIT
          </span>
        </div>
      </div>
    </section>
  )
}

export default EventBanner
