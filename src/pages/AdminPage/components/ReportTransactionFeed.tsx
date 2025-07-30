import Badge from '../../../components/Badge/Badge'
import { formatDataSize } from '../../../utils/format'
import { getTelecomBadgeColor } from '../../../utils/telecom'
import UserIcon from '@/assets/icons/user.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'

interface ReportTransactionFeedProps {
  carrier: string
  dataAmount: number
  title: string
  date: string
  price: number
  sellerEmail: string
  content: string
}

const ReportTransactionFeed = ({
  carrier,
  dataAmount,
  title,
  date,
  price,
  sellerEmail,
  content,
}: ReportTransactionFeedProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-fs20 font-medium">신고글</h2>
      <div className="bg-gray-10 space-y-3 rounded-xs border border-gray-100 p-3 shadow-none">
        <div className="flex items-center gap-2 py-2">
          <Badge label={carrier} className={getTelecomBadgeColor(carrier)} />
          <Badge
            label={formatDataSize(dataAmount)}
            className="text-fs14 text-gray-10 font-semibold"
          />
          <div className="text-fs20">{title}</div>
        </div>
        <div className="flex items-center gap-3 text-gray-800">
          <div className="flex items-center gap-1">
            <UserIcon className="text-pri-300 h-5.5 w-6.5" />
            <span>{sellerEmail}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TimeIcon className="text-pri-300 h-5.5 w-5.5" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DatchaCoinIcon className="h-6 w-6" />
            <span>{price.toLocaleString()}원</span>
          </div>
        </div>
        <p className="px-1 py-3 text-gray-800">{content}</p>
      </div>
    </section>
  )
}

export default ReportTransactionFeed
