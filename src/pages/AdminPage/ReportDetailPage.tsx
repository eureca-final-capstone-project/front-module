import Button from '../../components/Button/Button'
import ReportContent from './components/ReportContent'
import ReportDetailTable from './components/ReportDetailTable'
import ReportTransactionFeed from './components/ReportTransactionFeed'

const ReportDetailPage = () => {
  return (
    <main className="space-y-6">
      <h1 className="text-fs24 font-medium">신고 상세</h1>
      <div className="space-y-13">
        <ReportDetailTable />
        <ReportContent />
        <ReportTransactionFeed />
      </div>
      <div className="mt-28 flex justify-between gap-4">
        <Button text="목록으로" className="text-gray-10 w-32 bg-gray-400" />
        <div className="flex gap-4">
          <Button text="관리자 거절" className="text-gray-10 bg-error w-40" />
          <Button text="관리자 승인" className="text-gray-10 bg-success w-40" />
        </div>
      </div>
    </main>
  )
}

export default ReportDetailPage
