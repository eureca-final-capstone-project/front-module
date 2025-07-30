import { useQuery } from '@tanstack/react-query'
import Button from '../../components/Button/Button'
import ReportDetailTable from './components/ReportDetailTable'
import ReportTransactionFeed from './components/ReportTransactionFeed'
import { useNavigate, useParams } from 'react-router-dom'
import { getReportDetail } from '../../apis/admin/reports'

const ReportDetailPage = () => {
  const navigate = useNavigate()
  const { reportId } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', reportId],
    queryFn: () => getReportDetail(Number(reportId)),
  })

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>
  if (isError || !data?.data) return <div>데이터를 불러오지 못했습니다.</div>

  const reportDetailData = data.data

  return (
    <main className="space-y-6">
      <h1 className="text-fs24 mt-10 font-medium">신고 상세</h1>
      <div className="space-y-13">
        <ReportDetailTable
          reportId={reportDetailData.reportId}
          status={reportDetailData.status}
          reporterEmail={reportDetailData.reporterEmail}
          date={reportDetailData.reportDate}
          reportType={reportDetailData.reportType}
        />
        <ReportTransactionFeed
          carrier={reportDetailData.telecomCompany}
          dataAmount={reportDetailData.dataAmount}
          title={reportDetailData.title}
          date={reportDetailData.feedDate}
          price={reportDetailData.price}
          sellerEmail={reportDetailData.sellerEmail}
          content={reportDetailData.reportContent}
        />
      </div>
      {['AI_REJECTED', 'PENDING'].includes(reportDetailData.status) && (
        <div className="mt-28 flex justify-between gap-4">
          <Button
            text="목록으로"
            className="text-gray-10 w-32 bg-gray-400"
            onClick={() => navigate(-1)}
          />
          <div className="flex gap-4">
            <Button text="관리자 거절" className="text-gray-10 bg-error w-40" />
            <Button text="관리자 승인" className="text-gray-10 bg-success w-40" />
          </div>
        </div>
      )}
    </main>
  )
}

export default ReportDetailPage
