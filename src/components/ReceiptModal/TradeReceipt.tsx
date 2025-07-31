import type { ReceiptProps } from './ReceiptModal'
import { config } from './config'
import ReceiptInfo from './ReceiptInfo'
import DatchaCoin from '@/assets/icons/datcha-coin-color.svg?react'
import type { PayHistoryDetailResponse } from '../../apis/userInfo'
import { formatCompactDateTime } from '../../utils/time'
import { formatAmount, formatDataSize } from '../../utils/format'

type TransactionDetail = NonNullable<PayHistoryDetailResponse['data']['transactionDetail']>

const TradeReceipt = ({ type, pay, info }: ReceiptProps<TransactionDetail>) => {
  const { payMent, isMinus, extra } = config[type]

  const postDetails = [
    { label: '거래 유형', value: info.transactionType ?? '-' },
    {
      label: '거래 데이터',
      value: typeof info.dataAmount === 'number' ? formatDataSize(info.dataAmount) : '-',
    },
    {
      label: '거래 페이',
      value:
        typeof info.transactionPay === 'number' ? formatAmount(Math.abs(info.transactionPay)) : '-',
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-fs14 text-center text-gray-700">{payMent}</h3>
        <span
          className={`${isMinus ? 'text-error' : 'text-success'} text-fs24 flex items-center font-bold`}
        >
          {isMinus ? '-' : '+'}
          <DatchaCoin className="mx-1 h-7.5 w-7.5" strokeWidth={2} />
          {formatAmount(Math.abs(pay))}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <ReceiptInfo
          label={extra[0].label}
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
            {[0, 1].map(offset => {
              const item = extra[i + offset]
              if (!item) return <div key={offset} className="flex-1" />
              const rawValue = info[item.key as keyof TransactionDetail]
              const value =
                item.key === 'transactedAt'
                  ? formatCompactDateTime(rawValue as string, 'dot', true)
                  : typeof rawValue === 'number'
                    ? item.key === 'transactionHistoryId'
                      ? rawValue.toString()
                      : formatAmount(rawValue as number)
                    : typeof rawValue === 'string'
                      ? rawValue
                      : '-'
              return <ReceiptInfo key={offset} label={item.label} value={value} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TradeReceipt
