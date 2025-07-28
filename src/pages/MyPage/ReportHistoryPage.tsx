import FadeInUpMotion from '../../components/Animation/FadeInUpMotion'
import Badge from '../../components/Badge/Badge'
import ListTile from '../../components/ListTile/ListTile'
import { formatCompactDate } from '../../utils/time'

interface ReportItem {
  transactionFeedId: number
  title: string
  salesDataAmount: number
  reportType: string
  createdAt: string
  status: 'PENDING' | 'RESOLVED'
  reason: string
}

const ReportHistoryPage = () => {
  // 더미
  const reports: ReportItem[] = [
    {
      transactionFeedId: 1,
      title: '판매 게시글 제목',
      salesDataAmount: 1000,
      reportType: '욕설 및 비속어 포함',
      createdAt: '2025-07-28T14:39:39.901Z',
      status: 'PENDING',
      reason: '부적절한 언어 사용',
    },
    {
      transactionFeedId: 2,
      title: '판매 게시글 제목',
      salesDataAmount: 1000,
      reportType: '욕설 및 비속어 포함',
      createdAt: '2025-07-20T14:39:39.901Z',
      status: 'RESOLVED',
      reason: '부적절한 언어 사용',
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <ListTile type="title">
        <p>거래글 명</p>
        <p className="hidden pl-16 sm:block">신고 유형</p>
        <p className="hidden pl-10 sm:block">신고일</p>
        <p>처리 여부</p>
      </ListTile>
      <div className="flex flex-col gap-2 px-5 sm:px-0">
        {reports.map((item, i) => (
          <FadeInUpMotion key={item.transactionFeedId} custom={i} delayUnit={0.07} duration={0.3}>
            <ListTile>
              <p className="truncate">{item.title}</p>
              <p className="hidden sm:block">{item.reportType}</p>
              <p className="hidden sm:block">{formatCompactDate(item.createdAt)}</p>
              <Badge
                size="small"
                variant="default"
                label={item.status === 'RESOLVED' ? '처리 완료' : '처리 대기'}
                className={item.status === 'RESOLVED' ? 'bg-success' : 'bg-pri-300'}
              />
            </ListTile>
          </FadeInUpMotion>
        ))}
      </div>
    </div>
  )
}

export default ReportHistoryPage
