import ChargeReceipt from './ChargeReceipt'
import TradeReceipt from './TradeReceipt'
import { config } from './config'
import CloseIcon from '../../assets/icons/x.svg?react'

export interface ReceiptProps {
  type: 'charge' | 'refund' | 'buy' | 'sell'
  pay: number
  info: {
    id: string
    time: string
    account?: string
    method?: string
    totalPay: number
    carrier?: string
    post?: {
      type: string
      data: string
      price: number
    }
  }
}
interface ReceiptModalProps extends ReceiptProps {
  onClose: () => void
}

const ReceiptModal = ({ type, pay, info, onClose }: ReceiptModalProps) => {
  const configItem = config[type]
  if (!configItem) return <div>타입에러발생 {type}</div>

  const { title, description } = configItem

  return (
    <div className="flex w-82 flex-col overflow-hidden rounded-t-md md:w-88">
      <div className="bg-gray-10 flex flex-col gap-5 px-4 py-9">
        <div className="flex flex-col gap-[0.5rem]">
          <div className="-mb-2 flex justify-end">
            <CloseIcon
              className="transition-smooth cursor-pointer text-gray-400 hover:text-gray-800 focus:text-gray-800"
              onClick={onClose}
            />
          </div>
          <h2 className="text-fs18 md:text-fs20 text-center font-medium text-gray-900">{title}</h2>
          <p className="text-fs12 md:text-fs14 text-center text-gray-500">{description}</p>{' '}
        </div>
        <hr className="border-gray-100" />
        <div>
          {type === 'charge' || type === 'refund' ? (
            <ChargeReceipt type={type} pay={pay} info={info} />
          ) : (
            <TradeReceipt type={type} pay={pay} info={info} />
          )}
        </div>
      </div>

      <div>
        <svg
          className="h-4 w-full"
          viewBox="0 0 352 16"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="receipt-mask">
            <rect x="0" y="0" width="352" height="16" fill="white" />
            {Array.from({ length: 11 }).map((_, i) => (
              <circle key={i} cx={25 + i * 30} cy="16" r="10" fill="black" />
            ))}
          </mask>
          <rect width="352" height="16" fill="#f9f9f9" mask="url(#receipt-mask)" />
        </svg>
      </div>
    </div>
  )
}

export default ReceiptModal
