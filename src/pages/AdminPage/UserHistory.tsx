import { useState } from 'react'
import Badge from '../../components/Badge/Badge'
import Table from '../../components/Table/Table'
import { STATUS_STYLE, userColumns } from '../../constants/admin'
import { userHistoryData, userReportData } from '../../mocks/adminData'
import { User, UserReport } from '../../types/admin'
import Toggle from '../../components/Toggle/Toggle'
import UserDetailRow from './components/UserDetailRow'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import { getTelecomBadgeColor } from '../../utils/telecom'

const UserHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10)

  const [currentPage, setCurrentPage] = useState(pageParam)
  const [reportsByUser, setReportsByUser] = useState<Record<number, UserReport[]>>({})
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const itemsPerPage = 10
  const totalPages = Math.ceil(userHistoryData.length / itemsPerPage)

  const paginatedData = userHistoryData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const renderUserCell = (key: keyof User, row: User) => {
    switch (key) {
      case 'telecomCompany':
        return (
          <Badge
            label={row.telecomCompany}
            className={getTelecomBadgeColor(row.telecomCompany)}
            size="small"
          />
        )
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
    setSelectedUserId(row.userId)
    // 이미 데이터가 있으면 재사용
    if (reportsByUser[row.userId]) {
      return
    }
    // 데이터 없으면 API 호출 후 저장
    console.log(2)
    setReportsByUser(prev => ({ ...prev, [row.userId]: userReportData }))
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setSearchParams({ page: String(newPage) })

    // 페이지 변경시 리포트 초기화
    setSelectedUserId(null)
    setReportsByUser({})
  }

  return (
    <main className="space-y-13">
      <SearchBar onSubmit={keyword => console.log(keyword)} />
      <section className="space-y-7">
        <h1 className="text-fs24 font-medium">회원 내역</h1>
        <div className="relative">
          <div className="absolute -top-5 right-0 -translate-y-full font-medium">
            Total <span className="text-pri-400">{userHistoryData.length}</span>, Page
            <span className="text-pri-400"> {currentPage}</span>/{totalPages}
          </div>
          <Table
            columns={userColumns}
            data={paginatedData}
            renderCell={renderUserCell}
            isClickable={row => row.reportCount > 0}
            onRowClick={handleRowClick}
            renderDetailTable={
              selectedUserId !== null ? (
                <UserDetailRow reports={reportsByUser[selectedUserId] ?? []} />
              ) : null
            }
          />
        </div>
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}

export default UserHistory
