import InfoCard from './InfoCard'
import Button from '../../../../components/Button/Button'
import { formatAmount } from '../../../../utils/format'

const PayStatus = () => {
  const payAmount = 10400

  return (
    <InfoCard title="내 다챠페이 정보">
      <div className="text-fs14 lg:text-fs18 flex w-full justify-between font-medium text-gray-900">
        <p>보유 다챠페이</p>
        <p>{formatAmount(payAmount)}</p>
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
