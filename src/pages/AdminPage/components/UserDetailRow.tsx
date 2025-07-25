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
        <col style={{ width: '4%' }} />
        <col style={{ width: '3%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '31.5%' }} />
      </colgroup>
      <tbody>
        {reports &&
          reports.length > 0 &&
          reports.map(report => {
            return (
              <tr key={report.reportId} className="border-t border-gray-100 bg-gray-50">
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
