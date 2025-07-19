import ChargeReceipt from './components/ChargeReceipt'
import TradeReceipt from './components/TradeReceipt'
import { config } from './components/config'

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

const ReceiptCard: React.FC<ReceiptProps> = ({ type, pay, info }) => {
  const configItem = config[type]
  if (!configItem) return <div>잘못된 타입입니다: {type}</div>

  const { title, description } = configItem

  return (
    <div className="flex w-88 flex-col overflow-hidden rounded-md">
      <div className="bg-gray-10 flex flex-col gap-5 px-4 py-9">
        <div className="flex flex-col gap-[0.5rem]">
          <h2 className="text-fs18 text-center font-medium text-gray-900">{title}</h2>
          <p className="text-fs12 text-center text-gray-700">{description}</p>
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
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx={40 + i * 30} cy="16" r="10" fill="black" />
            ))}
          </mask>
          <rect width="352" height="16" fill="#f9f9f9" mask="url(#receipt-mask)" />
        </svg>
      </div>
    </div>
  )
}

export default ReceiptCard
