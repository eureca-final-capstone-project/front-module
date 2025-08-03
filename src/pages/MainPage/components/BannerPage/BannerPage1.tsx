import { useNavigate } from 'react-router-dom'
import Button from '../../../../components/Button/Button'
import BannerHeader from './BannerHeader'
import NoticeIcon from '@/assets/icons/notice.svg?react'

const BannerPage1 = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex w-full max-w-160 flex-col">
        <BannerHeader title="[페이 충전] 신규 가입 이벤트" />
        <div className="relative sm:mt-6">
          <img
            src="/images/banners/banner1-detail.png"
            alt="신규가입 이벤트 쿠폰"
            className="w-full object-cover"
          />
          <div className="absolute right-0 bottom-4 left-0 flex justify-center pb-6 sm:bottom-12">
            <Button
              onClick={() => navigate('/sign-up')}
              text={
                <div className="flex items-center justify-center gap-2 sm:py-2">
                  <p>회원가입 하러가기</p>
                  <p className="transition-transform duration-300 group-hover:-rotate-45">→</p>
                </div>
              }
              className="text-fs18 group bg-pri-500 text-gray-10 w-50 sm:w-55 sm:font-medium"
            />
          </div>
        </div>
        <div className="mb-10 bg-gray-50 p-6">
          {/* 참여 방법 */}
          <h3 className="text-fs18 sm:text-fs20 font-bold">
            [신규 가입 할인 쿠폰 이벤트 참여 방법]
          </h3>
          <div className="sm:text-fs16 text-fs14 flex flex-col gap-1.5 pt-4 pb-12 text-gray-800">
            <div className="mb-2 flex items-start gap-1 font-medium sm:items-center">
              <NoticeIcon />
              <p>
                신규 가입 쿠폰은
                <strong className="text-gray-900"> 원하는 카드사로 자유롭게 결제</strong>할 수
                있습니다.
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
                <strong className="text-gray-900">[신규회원]</strong> 쿠폰을 선택합니다.
              </p>
            </div>
            <div className="flex gap-2 font-medium">
              <p>5. </p>
              <p>
                <strong className="text-gray-900">결제 예정 정보</strong>에서 할인 금액을 확인하고,{' '}
                <strong className="text-gray-900">원하는 카드사를 선택하여 최종 결제</strong>를
                진행합니다.
              </p>
            </div>
          </div>
          {/* 이벤트 유의사항 */}
          <h3 className="text-fs18 sm:text-fs20 font-bold">[이벤트 유의사항]</h3>
          <div className="sm:text-fs16 text-fs14 flex flex-col gap-1.5 py-4 text-gray-800">
            <div className="flex gap-1 font-medium">
              <p>- </p>
              <strong className="text-gray-900">
                본 이벤트는 신규 회원 가입 후 1인당 1회에 한하여 자동 발급됩니다.
              </strong>
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
              <p>본 이벤트는 당사 사정에 따라 예고 없이 변경 또는 종료될 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerPage1
