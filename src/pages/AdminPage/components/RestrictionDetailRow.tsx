import Badge from '../../../components/Badge/Badge'
import { REPORT_STATUS_LABEL, STATUS_STYLE } from '../../../constants/admin'
import { RestrictionReport } from '../../../types/admin'

interface RestrictionDetailRowwProps {
  reports: RestrictionReport[]
}

const RestrictionDetailRow = ({ reports }: RestrictionDetailRowwProps) => {
  return (
    <table className="w-full">
      <colgroup>
        <col style={{ width: '3%' }} />
        <col style={{ width: '3%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '27%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '14%' }} />
      </colgroup>

      <tbody>
        {reports &&
          reports.length > 0 &&
          reports.map(report => {
            return (
              <tr key={report.reportId} className="bg-gray-30 border-t border-gray-100">
                <td></td>
                <td className="px-3 py-4">{report.reportId}</td>
                <td className="px-3 py-4">{report.reportType}</td>
                <td className="max-w-50 overflow-hidden px-3 py-4 text-ellipsis whitespace-nowrap">
                  {report.content}
                </td>
                <td className="px-3 py-4">{new Date(report.reportedAt).toLocaleDateString()}</td>
                <td className="px-3 py-4">
                  <Badge
                    label={REPORT_STATUS_LABEL[report.status]}
                    {...STATUS_STYLE[report.status]}
                  />
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default RestrictionDetailRow
