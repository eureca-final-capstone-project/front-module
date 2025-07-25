import { useState } from 'react'
import Badge from '../../components/Badge/Badge'
import Table from '../../components/Table/Table'
import { STATUS_STYLE, userColumns } from '../../constants/admin'
import { userHistoryData, userReportData } from '../../mocks/adminData'
import { User, UserReport } from '../../types/admin'
import Toggle from '../../components/Toggle/Toggle'
import UserDetailRow from './components/UserDetailRow'

const UserHistory = () => {
  const [reports, setReports] = useState<UserReport[]>([])

  const renderUserCell = (key: keyof User, row: User) => {
    switch (key) {
      case 'status': {
        return <Badge label={row.status} {...STATUS_STYLE[row.status]} />
      }
      case 'isBlocked':
        return <Toggle initialState={row.isBlocked} onToggle={state => console.log(state)} />
      default:
        return row[key]
    }
  }

  const handleRowClick = (row: User) => {
    console.log(row)
    setReports(userReportData)
  }

  return (
    <div>
      <Table
        columns={userColumns}
        data={userHistoryData}
        renderCell={renderUserCell}
        isClickable={row => row.reportCount > 0}
        onRowClick={handleRowClick}
        renderDetailTable={<UserDetailRow reports={reports} />}
      />
    </div>
  )
}

export default UserHistory
