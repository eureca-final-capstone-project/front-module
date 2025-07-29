import Card from '../../components/Card/Card'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
import { formatAmount } from '../../utils/format'
import { useQuery } from '@tanstack/react-query'
import { getUserPayStatus } from '../../apis/userInfo'
import { useNavigate } from 'react-router-dom'
// import FloatActionButton from '../components/FloatActionButton'

const RefundPage = () => {
  const { data: userPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
  })
  const navigate = useNavigate()
  return (
    <div className={`sm:px-0} flex flex-col px-4 sm:justify-between`}>
      <div className="flex flex-col gap-4">
        <Card withMotion motionCustom={0}>
          <div className="flex items-center justify-between font-medium">
            <span className="text-fs18 sm:text-fs20 text-gray-900">보유 다챠페이</span>
            <div className="flex gap-1 sm:gap-2">
              <DatchaCoin className="h-6 w-6" />
              <span className="text-fs18 sm:text-fs20 text-pri-500 font-semibold">
                {formatAmount(userPayStatus?.balance ?? 0)}
              </span>
            </div>
          </div>
        </Card>
        <Card labelTitle="환전 페이" type="label" withMotion motionCustom={1}></Card>
        <Card labelTitle="환전 계좌" type="label" withMotion motionCustom={2}></Card>
        <Card
          withMotion
          motionCustom={3}
          className="cursor-pointer"
          onClick={() => navigate('/mypage/pay-history')}
          type="notice"
          iconTitle="페이 변동 내역 보러가기"
          iconDescription="충전 및 환전, 거래로 변동된 페이 내역을 한 눈에 확인해보세요!"
        ></Card>
      </div>
      {/* <FloatActionButton
        show={amount > 0}
        text={`${finalAmount.toLocaleString()}원 결제하기`}
        onClick={handlePayment}
        disabled={isDisabled}
        className={isDisabled ? 'button-disabled' : 'button-active'}
      /> */}
    </div>
  )
}

export default RefundPage
