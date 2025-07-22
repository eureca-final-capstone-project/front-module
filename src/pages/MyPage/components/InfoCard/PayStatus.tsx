import InfoCard from './InfoCard'
import Button from '../../../../components/Button/Button'
import { formatAmount } from '../../../../utils/format'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
const PayStatus = () => {
  const payAmount = 10400

  return (
    <InfoCard title="다챠페이 정보">
      <div className="text-fs14 lg:text-fs18 flex w-full justify-between font-medium text-gray-900">
        <p>보유 다챠페이</p>
        <div className="text-pri-500 flex items-center gap-0.5 lg:gap-1">
          <DatchaCoin className="h-4 w-4 lg:h-5 lg:w-5" />
          <p>{formatAmount(payAmount)}</p>
        </div>
      </div>
      <div className="flex gap-2 lg:gap-4">
        <Button
          text="충전하기"
          className="text-truncate text-fs14 lg:text-fs18 border-pri-600 text-pri-600 w-full border-[1.7px] font-medium"
        />
        <Button
          text="환전하기"
          className="text-truncate text-fs14 lg:text-fs18 border-pri-600 text-pri-600 w-full border-[1.7px] font-medium"
        />
      </div>
    </InfoCard>
  )
}

export default PayStatus
