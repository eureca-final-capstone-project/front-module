import Badge from '../../../components/Badge/Badge'
import { REPORT_STATUS_LABEL, STATUS_STYLE } from '../../../constants/admin'
import { ReportStatus } from '../../../types/admin'

interface ReportDetailTableProps {
  reportId: number
  reportType: string
  status: ReportStatus
  date: string
  reporterEmail: string
}

const ReportDetailTable = ({
  reportId,
  reportType,
  status,
  reporterEmail,
  date,
}: ReportDetailTableProps) => {
  return (
    <table className="border-pri-400 w-full table-fixed border">
      <tbody>
        <tr className="border-pri-400 border">
          <th className="bg-pri-500 text-gray-10 border-pri-400 w-1/6 border p-3 font-medium">
            신고 번호
          </th>
          <td className="p-3">{reportId}</td>
          <th className="bg-pri-500 text-gray-10 border-pri-400 w-1/6 border p-3 font-medium">
            신고 상태
          </th>
          <td className="p-3">
            <Badge
              label={REPORT_STATUS_LABEL[status]}
              {...STATUS_STYLE[REPORT_STATUS_LABEL[status]]}
            />
          </td>
        </tr>
        <tr className="border-pri-400 border">
          <th className="bg-pri-500 text-gray-10 border-pri-400 border p-3 font-medium">
            신고자 이메일
          </th>
          <td className="p-3">{reporterEmail}</td>
          <th className="bg-pri-500 text-gray-10 border-pri-400 border p-3 font-medium">신고일</th>
          <td className="p-3">{new Date(date).toLocaleDateString()}</td>
        </tr>
        <tr className="border-pri-400 border">
          <th className="bg-pri-500 text-gray-10 border-pri-400 border p-3 font-medium">
            신고 유형
          </th>
          <td className="p-3">{reportType}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default ReportDetailTable
