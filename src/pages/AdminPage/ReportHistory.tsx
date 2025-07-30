import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import { useQuery } from '@tanstack/react-query'
import Table from '../../components/Table/Table'
import { REPORT_STATUS_LABEL, reportColumns, STATUS_STYLE } from '../../constants/admin'
import Badge from '../../components/Badge/Badge'
import { Report } from '../../types/admin'
import { getReports } from '../../apis/admin/reports'

const ReportHistroy = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10)

  const [currentPage, setCurrentPage] = useState(pageParam)

  const [keyword, setKeyword] = useState('')

  const itemsPerPage = 10

  const pageable = {
    page: currentPage - 1,
    size: itemsPerPage,
  }

  const statusCode = '' // 임시

  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports', currentPage, keyword],
    queryFn: () => getReports({ keyword, statusCode, pageable }),
  })

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>
  if (isError || !data?.data) return <div>데이터를 불러오지 못했습니다.</div>

  const { totalElements, totalPages, content: reportsData } = data.data
  console.log(reportsData)

  const renderReportCell = (key: keyof Report, row: Report) => {
    const { reportedAt, status } = row

    switch (key) {
      case 'reportedAt':
        return new Date(reportedAt).toLocaleDateString()
      case 'status': {
        console.log(status)
        return (
          <Badge
            label={REPORT_STATUS_LABEL[status]}
            {...STATUS_STYLE[REPORT_STATUS_LABEL[status]]}
          />
        )
      }
      default:
        return row[key]
    }
  }

  const handleSearch = (value: string) => {
    setKeyword(value)
    setCurrentPage(1)
    setSearchParams({ page: '1' })
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setSearchParams({ page: String(newPage) })
  }

  return (
    <main className="space-y-13">
      <SearchBar defaultValue={keyword} onSubmit={handleSearch} />
      <section className="space-y-7">
        <h1 className="text-fs24 font-medium">신고 내역</h1>
        <div className="relative">
          <div className="absolute -top-5 right-0 -translate-y-full font-medium">
            Total <span className="text-pri-400">{totalElements}</span>, Page
            <span className="text-pri-400"> {currentPage}</span>/{totalPages}
          </div>
          <Table
            columns={reportColumns}
            data={reportsData}
            renderCell={renderReportCell}
            isArrow={false}
            isClickable={() => true}
            onRowClick={row => navigate(`/report/${row.reportHistoryId}`)}
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

export default ReportHistroy
