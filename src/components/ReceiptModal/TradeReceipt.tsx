import type { ReceiptProps } from './ReceiptModal'
import { config } from './config'
import ReceiptInfo from './ReceiptInfo'

const TradeReceipt = ({ type, pay, info }: ReceiptProps) => {
  const { payMent, isMinus, extra } = config[type]
  const extraInfo = [
    info.post ? JSON.stringify(info.post) : '-',
    info.id,
    info.time,
    info.carrier,
    `${info.totalPay.toLocaleString()}원`,
  ]
  const postDetails = [
    { label: '거래 유형', value: info.post?.type ?? '-' },
    { label: '거래 페이', value: info.post?.price ? info.post.price.toLocaleString() + '원' : '-' },
    { label: '거래 데이터', value: info.post?.data ?? '-' },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-fs14 text-center text-gray-700">{payMent}</h3>
        <span className={`${isMinus ? 'text-error' : 'text-success'} text-fs24 font-bold`}>
          {isMinus ? '-' : '+'} 다챠 {pay.toLocaleString()}원
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <ReceiptInfo
          label={extra[0]}
          value={
            <div className="flex flex-col gap-1.5">
              {postDetails.map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <p>{label}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          }
        />

        {[1, 3].map(i => (
          <div key={i} className="flex justify-between gap-2">
            <ReceiptInfo label={extra[i]} value={extraInfo[i] || ''} />
            <ReceiptInfo label={extra[i + 1]} value={extraInfo[i + 1] || ''} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TradeReceipt
