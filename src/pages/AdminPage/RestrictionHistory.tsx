import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useToast } from '../../hooks/useToast'
import { useEffect, useState } from 'react'
import { getRestrictinoReport, getRestrictions } from '../../apis/admin/restrictions'
import { useQuery } from '@tanstack/react-query'
import {
  RESTRICTION_STATUS_LABEL,
  restrictionColumns,
  restrictionTab,
  restrictionTabCode,
  STATUS_STYLE,
} from '../../constants/admin'
import { Restriction, RestrictionReport } from '../../types/admin'
import Badge from '../../components/Badge/Badge'
import Table from '../../components/Table/Table'
import Tabs from '../../components/Tabs/Tabs'
import Pagination from '../../components/Pagination/Pagination'
import AcceptRejectButton from './components/AcceptRejectButton'
import RestrictionDetailRow from './components/RestrictionDetailRow'

const RestrictionHistory = () => {
  const { showToast } = useToast()

  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10)
  const statusParam = searchParams.get('status') ?? ''

  const [currentPage, setCurrentPage] = useState(pageParam)
  const [reportsByRestriction, setReportsByRestriction] = useState<
    Record<number, RestrictionReport[]>
  >({})
  const [keyword, setKeyword] = useState('')
  const [statusTabId, setStatusTabId] = useState(statusParam)

  const itemsPerPage = 10

  const pageable = {
    page: currentPage - 1,
    size: itemsPerPage,
  }

  useEffect(() => {
    const params: Record<string, string> = { page: String(currentPage) }

    if (statusTabId) params.status = statusTabId
    setSearchParams(params)
  }, [currentPage, statusTabId, setSearchParams])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['restrictions', currentPage, keyword, statusTabId],
    queryFn: () =>
      getRestrictions({
        keyword,
        statusCode: statusTabId ? restrictionTabCode[statusTabId] : '',
        pageable,
      }),
  })

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>
  if (isError || !data?.data) return <div>데이터를 불러오지 못했습니다.</div>

  const { totalElements, totalPages, content: restrictionsData } = data.data

  const renderRestrictionCell = (key: keyof Restriction, row: Restriction) => {
    const { restrictionTargetId, status } = row

    switch (key) {
      case 'status': {
        return (
          <Badge
            label={RESTRICTION_STATUS_LABEL[status] ?? ''}
            {...STATUS_STYLE[RESTRICTION_STATUS_LABEL[status] ?? '']}
          />
        )
      }
      case 'restrictionStatus': {
        return <AcceptRejectButton restrictionTargetId={restrictionTargetId} status={status} />
      }
      default:
        return row[key]
    }
  }
  const handleRowClick = async (row: Restriction) => {
    // 이미 데이터가 있으면 재사용
    if (reportsByRestriction[row.restrictionTargetId]) {
      return
    }
    // 데이터 없으면 API 호출 후 저장
    try {
      const { data: restrictionReportData } = await getRestrictinoReport(row.restrictionTargetId)
      setReportsByRestriction(prev => ({
        ...prev,
        [row.restrictionTargetId]: restrictionReportData,
      }))
    } catch (error) {
      showToast({ type: 'error', msg: '데이터를 불러오지 못했습니다.' })
      console.error(error)
    }
  }

  const handleSearch = (value: string) => {
    setKeyword(value)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleTabClick = (tabId: string) => {
    setStatusTabId(tabId)
    setCurrentPage(1)
  }

  return (
    <main className="space-y-13">
      <SearchBar defaultValue={keyword} onSubmit={handleSearch} />
      <section className="space-y-7">
        <h1 className="text-fs24 font-medium">제재 내역</h1>
        <div className="pb-7">
          <Tabs
            tabs={restrictionTab}
            defaultTabId={statusParam}
            onTabChange={id => handleTabClick(id)}
          />
        </div>
        <div className="relative">
          <div className="absolute -top-5 right-0 -translate-y-full font-medium">
            Total <span className="text-pri-400">{totalElements}</span>, Page
            <span className="text-pri-400"> {currentPage}</span>/{totalPages}
          </div>
          <Table
            columns={restrictionColumns}
            data={restrictionsData}
            renderCell={renderRestrictionCell}
            isClickable={() => true}
            onRowClick={handleRowClick}
            renderDetailTable={row => (
              <RestrictionDetailRow reports={reportsByRestriction[row.restrictionTargetId] ?? []} />
            )}
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

export default RestrictionHistory
