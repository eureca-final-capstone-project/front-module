import Badge from '../../../components/Badge/Badge'
import { STATUS_STYLE } from '../../../constants/admin'
import { UserReport } from '../../../types/admin'

interface UserDetailRowProps {
  reports: UserReport[]
}

const UserDetailRow = ({ reports }: UserDetailRowProps) => {
  return (
    <table className="w-full">
      <colgroup>
        <col style={{ width: '3%' }} />
        <col style={{ width: '3%' }} />
        <col style={{ width: '16%' }} />
        <col style={{ width: '35%' }} />
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
                <td
                  className="max-w-50 overflow-hidden px-3 py-4 text-ellipsis whitespace-nowrap"
                  colSpan={4}
                >
                  {report.content}
                </td>
                <td className="px-3 py-4" colSpan={2}>
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-4" colSpan={2}>
                  <Badge label={report.status} {...STATUS_STYLE[report.status]} />
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default UserDetailRow
