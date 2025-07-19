import React from 'react'
import type { ReceiptProps } from '../ReceiptCard'
import { config } from './config'
import ReceiptInfo from './ReceiptInfo'

const ChargeReceipt = ({ type, pay, info }: ReceiptProps) => {
  const { historyMent, history, payMent, isMinus, extra } = config[type]
  const extraInfo = [
    info.id,
    info.time,
    type === 'refund' ? info.account || '' : info.method || '',
    `${info.totalPay.toLocaleString()}원`,
  ]
  return (
    <div className="flex flex-col gap-8">
      {historyMent && (
        <div className="flex flex-col gap-[0.5rem]">
          <h3 className="text-fs14 text-center text-gray-700">{historyMent}</h3>
          {history.map((item, i) => {
            let value: string

            if ('value' in item) {
              value = typeof item.value === 'function' ? item.value(pay) : item.value
            } else if ('key' in item) {
              value = `${pay.toLocaleString()}원`
            } else {
              value = '-'
            }
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
        <span className={`${isMinus ? 'text-error' : 'text-success'} text-fs24 font-bold`}>
          {isMinus ? '-' : '+'} 다챠 {pay.toLocaleString()}원
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {[0, 2].map(i => (
          <div key={i} className="flex justify-between gap-2">
            <ReceiptInfo label={extra[i]} value={extraInfo[i] || ''} />
            <ReceiptInfo label={extra[i + 1]} value={extraInfo[i + 1] || ''} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChargeReceipt
