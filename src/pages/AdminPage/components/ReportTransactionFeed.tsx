import Badge from '../../../components/Badge/Badge'
import { formatDataSize } from '../../../utils/format'
import { getTelecomBadgeColor } from '../../../utils/telecom'
import UserIcon from '@/assets/icons/user.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'

const ReportTransactionFeed = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-fs20 font-medium">신고글</h2>
      <div className="bg-gray-10 space-y-3 rounded-xs border border-gray-100 p-3 shadow-none">
        <div className="flex items-center gap-2 py-2">
          <Badge label={'LG U+'} className={getTelecomBadgeColor('LG U+')} />
          <Badge label={formatDataSize(500)} className="text-fs14 text-gray-10 font-semibold" />
          <div className="text-fs20">제목은 제목이며 제목이다.</div>
        </div>
        <div className="flex items-center gap-3 text-gray-800">
          <div className="flex items-center gap-1">
            <UserIcon className="text-pri-300 h-5.5 w-6.5" />
            <span>{'datcha@datcha.com'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TimeIcon className="text-pri-300 h-5.5 w-5.5" />
            <span>{'2025.07.11'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DatchaCoinIcon className="h-6 w-6" />
            <span>{4000}원</span>
          </div>
        </div>
        <p className="px-1 py-3 text-gray-800">{'욕설xxxxxxxxxxxxx'}</p>
      </div>
    </section>
  )
}

export default ReportTransactionFeed
