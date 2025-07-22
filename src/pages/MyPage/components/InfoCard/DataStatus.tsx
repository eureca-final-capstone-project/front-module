import InfoCard from './InfoCard'
import Button from '../../../../components/Button/Button'
import { formatDataSize } from '../../../../utils/format'

const DataStatus = () => {
  const dataStatus = {
    totalDataMb: 1900,
    buyerDataMb: 600,
    sellableDataMb: 300,
  }
  const items = [
    { label: '보유 데이터', value: dataStatus.totalDataMb },
    { label: '구매 데이터', value: dataStatus.buyerDataMb },
    { label: '판매 가능 데이터', value: dataStatus.sellableDataMb },
  ]
  return (
    <InfoCard title="데이터 정보">
      <>
        <div className="flex flex-col gap-3">
          {items.map(({ label, value }) => (
            <div
              key={label}
              className="text-fs14 lg:text-fs18 flex w-full justify-between font-medium text-gray-900"
            >
              <p>{label}</p>
              <p>{formatDataSize(value)}</p>
            </div>
          ))}
        </div>
        <Button
          text="데이터 전환하기"
          className="text-fs14 lg:text-fs18 border-pri-500 text-pri-500 mt-4 border-[1.7px] font-medium"
          onClick={() => {}}
        />
      </>
    </InfoCard>
  )
}

export default DataStatus
