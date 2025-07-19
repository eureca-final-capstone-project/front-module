// src/components/Receipt/ChargeReceipt.tsx
import React from 'react'
import type { ReceiptProps } from '../ReceiptCard'
import { config } from './config'
import ReceiptInfoCard from './ReceiptInfoCard'

const ChargeReceipt: React.FC<ReceiptProps> = ({ type, pay, info }) => {
  const { historyMent, history, payMent, isMinus } = config[type]
  const { extra } = config[type]
  const extraInfo = [
    info.id,
    info.time,
    type === 'refund' ? info.account || '' : info.method || '',
    info.carrier || `${info.totalPay.toLocaleString()}원`,
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
                <div className="text-fs12 flex justify-between font-medium text-gray-900">
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
        {[0, 2].map(start => (
          <div key={start} className="flex justify-between gap-2">
            <ReceiptInfoCard label={extra[start]} value={extraInfo[start] || ''} />
            <ReceiptInfoCard label={extra[start + 1]} value={extraInfo[start + 1] || ''} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChargeReceipt
