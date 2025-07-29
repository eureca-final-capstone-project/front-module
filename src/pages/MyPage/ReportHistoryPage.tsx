import { useQuery } from '@tanstack/react-query'
import FadeInUpMotion from '../../components/Animation/FadeInUpMotion'
import Badge from '../../components/Badge/Badge'
import ListTile from '../../components/ListTile/ListTile'
import { formatCompactDate } from '../../utils/time'
import { getMyReportHistory } from '../../apis/report'
import type { ReportHistoryItem } from '../../apis/report'

const getStatusLabelAndClass = (status: string): { label: string; className: string } => {
  const pending = ['검수 대기중']
  const rejected = ['AI 거절', '관리자 거절', '제재 미승인']
  const accepted = ['AI 승인', '관리자 승인', '제재 완료']

  if (pending.includes(status)) return { label: '처리 대기', className: 'bg-pri-300' }
  if (rejected.includes(status)) return { label: '신고 거부', className: 'bg-error' }
  if (accepted.includes(status)) return { label: '처리 완료', className: 'bg-success' }

  return { label: '알 수 없음', className: 'bg-gray-300' }
}

const ReportHistoryPage = () => {
  const { data: reports = [], isLoading } = useQuery<ReportHistoryItem[]>({
    queryKey: ['myReportHistory'],
    queryFn: getMyReportHistory,
  })

  if (isLoading) {
    return <p className="mt-10 text-center">불러오는 중...</p>
  }

  return (
    <div className="flex flex-col gap-5">
      <ListTile type="title">
        <div className="grid w-full grid-cols-2 items-center gap-2 sm:grid-cols-[1fr_2fr_1fr_1fr]">
          <p className="text-left">거래글 명</p>
          <p className="hidden text-center sm:block">신고 유형</p>
          <p className="hidden text-center sm:block">신고일</p>
          <p className="text-right">처리 여부</p>
        </div>
      </ListTile>
      <div className="flex flex-col gap-2 px-5 sm:px-0">
        {reports.map((item, i) => {
          const { label, className } = getStatusLabelAndClass(item.status)
          return (
            <FadeInUpMotion key={item.transactionFeedId} custom={i} delayUnit={0.07} duration={0.3}>
              <ListTile>
                <div className="grid w-full grid-cols-2 items-center gap-2 sm:grid-cols-[1fr_2fr_1fr_1fr]">
                  <p className="truncate text-left">{item.title}</p>
                  <p className="hidden truncate text-center sm:block">{item.reportType}</p>
                  <p className="hidden text-center sm:block">{formatCompactDate(item.createdAt)}</p>
                  <div className="flex justify-end">
                    <Badge size="small" variant="default" label={label} className={className} />
                  </div>
                </div>
              </ListTile>
            </FadeInUpMotion>
          )
        })}
      </div>
    </div>
  )
}

export default ReportHistoryPage
