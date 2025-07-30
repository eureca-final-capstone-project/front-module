import Badge from '../../../components/Badge/Badge'
import { REPORT_STATUS_LABEL, STATUS_STYLE } from '../../../constants/admin'

const ReportDetailTable = () => {
  return (
    <table className="border-pri-400 w-full table-fixed border">
      <tr className="border-pri-400 border">
        <th className="bg-pri-500 text-gray-10 border-pri-400 w-1/6 border p-3 font-medium">
          신고 번호
        </th>
        <td className="p-3">a</td>
        <th className="bg-pri-500 text-gray-10 border-pri-400 w-1/6 border p-3 font-medium">
          신고 상태
        </th>
        <td className="p-3">
          <Badge
            label={REPORT_STATUS_LABEL['ADMIN_ACCEPTED']}
            {...STATUS_STYLE[REPORT_STATUS_LABEL['ADMIN_ACCEPTED']]}
          />
        </td>
      </tr>
      <tr className="border-pri-400 border">
        <th className="bg-pri-500 text-gray-10 border-pri-400 border p-3 font-medium">
          신고자 이메일
        </th>
        <td className="p-3">{'abcdef@datcha.com'}</td>
        <th className="bg-pri-500 text-gray-10 border-pri-400 border p-3 font-medium">신고일</th>
        <td className="p-3">{'2025.07.13'}</td>
      </tr>
      <tr className="border-pri-400 border">
        <th className="bg-pri-500 text-gray-10 border-pri-400 border p-3 font-medium">신고 유형</th>
        <td className="p-3">{'욕설 및 비속어 포함'}</td>
      </tr>
    </table>
  )
}

export default ReportDetailTable
