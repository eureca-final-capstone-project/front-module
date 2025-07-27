import React from 'react'
import type { ReceiptProps } from './ReceiptModal'
import { config } from './config'
import ReceiptInfo from './ReceiptInfo'
import DatchaCoin from '@/assets/icons/datcha-coin-color.svg?react'
import type { PayHistoryDetailResponse } from '../../apis/userInfo'
import { formatCompactDateTime } from '../../utils/time'
import { formatAmount } from '../../utils/format'

type ChargeDetail = NonNullable<PayHistoryDetailResponse['data']['chargeDetail']>

const ChargeReceipt = ({ type, pay, info }: ReceiptProps<ChargeDetail>) => {
  const { historyMent, history, payMent, isMinus, extra } = config[type]
  return (
    <div className="flex flex-col gap-8">
      {historyMent && (
        <div className="flex flex-col gap-[0.5rem]">
          <h3 className="text-fs14 text-center text-gray-700">{historyMent}</h3>
          {history.map((item, i) => {
            const value =
              item.key && info[item.key as keyof ChargeDetail] != null
                ? formatAmount(info[item.key as keyof ChargeDetail] as number)
                : '-'

            return (
              <React.Fragment key={i}>
                <div
                  className={`flex justify-between text-gray-900 ${
                    i === history.length - 1 ? 'text-fs16 font-medium' : 'text-fs14'
                  }`}
                >
                  <span>{item.label}</span>
                  <span>{value}</span>
                </div>
                {i === history.length - 2 && (
                  <hr className="border-t border-dashed border-gray-100" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      )}
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
        {Array.from({ length: Math.ceil(extra.length / 2) }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex justify-between gap-2">
            {[0, 1].map(colIdx => {
              const i = rowIdx * 2 + colIdx
              const item = extra[i]
              if (!item) return <div key={colIdx} className="flex-1" />
              const rawValue = info[item.key as keyof ChargeDetail]
              const value =
                item.key === 'chargedAt'
                  ? formatCompactDateTime(rawValue as string)
                  : typeof rawValue === 'number'
                    ? formatAmount(rawValue)
                    : typeof rawValue === 'string'
                      ? rawValue
                      : '-'
              return <ReceiptInfo key={colIdx} label={item.label} value={value} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChargeReceipt
