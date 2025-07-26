import { formatDataSize } from '../../../utils/format'

const CurrentDataInfoField = () => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div>보유 데이터</div>
        <div>{formatDataSize(1000)}</div>
      </div>
      <div className="flex justify-between">
        <div>판매 가능 데이터</div>
        <div>{formatDataSize(100)}</div>
      </div>
    </div>
  )
}

export default CurrentDataInfoField
