import { issueEventCoupon } from '../../../../apis/eventCoupon'
import Button from '../../../../components/Button/Button'
import { useToast } from '../../../../hooks/useToast'
import BannerHeader from './BannerHeader'
import { useMutation } from '@tanstack/react-query'
import DownloadIcon from '@/assets/icons/arrow-download.svg?react'
import NoticeIcon from '@/assets/icons/notice.svg?react'
import useScrollToTop from '../../../../hooks/useScrollToTop'

const BannerPage2 = () => {
  useScrollToTop()
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
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex w-full max-w-160 flex-col">
        <BannerHeader title="[페이 충전] 토스페이 캐시백 이벤트" />
        <div className="sm:mt-6">
          <img src="/public/images/banners/banner2-detail.png" alt="토스페이 이벤트 쿠폰" />
        </div>
        <div className="bg-toss -mt-0.5 flex items-center justify-center py-12 pt-6">
          <Button
            onClick={handleIssueCouponClick}
            text={
              <div className="flex items-center justify-center gap-4">
                <p>이벤트 쿠폰 발급</p>
                <DownloadIcon className="bg-toss text-gray-10 h-8 w-8 rounded-full p-1 sm:h-10 sm:w-10 sm:p-1.5" />
              </div>
            }
            className="bg-gray-10 text-fs18 w-55 font-semibold"
          />
        </div>
        <div className="mb-10 bg-gray-100 p-6">
          {/* 참여 방법 */}
          <h3 className="text-fs18 sm:text-fs20 font-bold">[토스페이 캐시백 이벤트 참여 방법]</h3>
          <div className="sm:text-fs16 text-fs14 flex flex-col gap-1.5 pt-4 pb-12 text-gray-800">
            <div className="mb-2 flex items-start gap-1 font-medium sm:items-center">
              <NoticeIcon />
              <p>
                토스페이 쿠폰을 적용하면
                <strong className="text-gray-900"> 결제 수단이 토스페이로 자동 지정</strong>됩니다.
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>1. </p>
              <p>
                <strong className="text-gray-900">마이페이지</strong>로 이동합니다.
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>2. </p>
              <p>
                <strong className="text-gray-900">다챠페이 정보</strong>의{' '}
                <strong className="rounded-xs bg-gray-200 px-1 text-gray-900">충전하기</strong>{' '}
                버튼을 클릭합니다.
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>3. </p>
              <p>
                <strong className="text-gray-900">페이 충전하기</strong> 페이지에서 충전할 금액을
                입력합니다.
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>4. </p>
              <p>
                <strong className="text-gray-900">[토스페이]</strong> 쿠폰을 선택합니다.
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>5. </p>
              <p>
                <strong className="text-gray-900">결제 예정 정보</strong>에서 할인 금액을 확인하고,{' '}
                <strong className="text-gray-900">토스페이로 최종 결제</strong>를 진행합니다.
              </p>
            </div>
          </div>
          {/* 이벤트 유의사항 */}
          <h3 className="text-fs18 sm:text-fs20 font-bold">[이벤트 유의사항]</h3>
          <div className="sm:text-fs16 text-fs14 flex flex-col gap-1.5 py-4 text-gray-800">
            <div className="flex gap-1 font-medium">
              <p>- </p>
              <strong className="text-gray-900">본 이벤트는 1인당 1회만 참여 가능합니다.</strong>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>
                쿠폰은 <strong className="text-gray-900">다챠 페이 충전 시에만 사용 가능</strong>
                하며, 다른 상품 결제에는 적용되지 않습니다.
              </p>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>
                할인 금액은 <strong className="text-gray-900">최대 2,000원</strong>입니다. 10%
                할인율을 적용했을 때 2,000원을 초과하는 금액은 할인되지 않습니다.
              </p>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>
                할인 혜택은 <strong className="text-gray-900">발급일로부터 1개월</strong>간
                유효하며, 기간 내에 사용하지 않을 시 자동 소멸됩니다.
              </p>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>다른 할인 쿠폰이나 프로모션과 중복하여 사용할 수 없습니다.</p>
            </div>
            <div className="flex gap-1">
              <p>- </p>
              <p>
                본 이벤트는 당사 또는 토스페이의 사정에 따라 예고 없이 변경 또는 조기 종료될 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerPage2
