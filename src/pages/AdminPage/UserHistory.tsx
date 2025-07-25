import { useState } from 'react'
import Badge from '../../components/Badge/Badge'
import Table from '../../components/Table/Table'
import { STATUS_STYLE, userColumns } from '../../constants/admin'
import { userHistoryData, userReportData } from '../../mocks/adminData'
import { User, UserReport } from '../../types/admin'
import Toggle from '../../components/Toggle/Toggle'
import UserDetailRow from './components/UserDetailRow'
import SearchBar from '../../components/SearchBar/SearchBar'

const UserHistory = () => {
  const [reports, setReports] = useState<UserReport[]>([])

  const renderUserCell = (key: keyof User, row: User) => {
    switch (key) {
      case 'createdAt':
        return new Date(row.createdAt).toLocaleDateString()
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
    <main className="space-y-13">
      <SearchBar onSubmit={keyword => console.log(keyword)} />
      <section className="space-y-7">
        <h1 className="text-fs24 font-medium">회원 내역</h1>
        <div className="relative">
          <div className="absolute -top-5 right-0 -translate-y-full font-medium">
            Total <span className="text-pri-400">{120}</span>, Page
            <span className="text-pri-400"> {1}</span>/{12}
          </div>
          <Table
            columns={userColumns}
            data={userHistoryData}
            renderCell={renderUserCell}
            isClickable={row => row.reportCount > 0}
            onRowClick={handleRowClick}
            renderDetailTable={<UserDetailRow reports={reports} />}
          />
        </div>
      </section>
    </main>
  )
}

export default UserHistory
