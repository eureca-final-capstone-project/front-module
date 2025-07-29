import { useState } from 'react'
import Badge from '../../components/Badge/Badge'
import Table from '../../components/Table/Table'
import { STATUS_STYLE, userColumns } from '../../constants/admin'
import { User, UserReport } from '../../types/admin'
import Toggle from '../../components/Toggle/Toggle'
import UserDetailRow from './components/UserDetailRow'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import { getTelecomBadgeColor } from '../../utils/telecom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { banUser, getUserReport, getUsers } from '../../apis/admin/dashboard'
import { formatPhoneNumber } from '../../utils/format'
import { useToast } from '../../hooks/useToast'

const UserHistory = () => {
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10)

  const [currentPage, setCurrentPage] = useState(pageParam)
  const [reportsByUser, setReportsByUser] = useState<Record<number, UserReport[]>>({})

  const itemsPerPage = 10

  const pageable = {
    page: currentPage - 1,
    size: itemsPerPage,
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', currentPage],
    queryFn: () => getUsers(pageable),
  })

  const banMutation = useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', currentPage],
      })
    },
    onError: () => {
      showToast({ type: 'error', msg: '회원 차단 처리 중 문제가 발생했습니다.' })
    },
  })

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>
  if (isError || !data?.data) return <div>데이터를 불러오지 못했습니다.</div>

  const { totalElements, totalPages, content: usersData } = data.data

  const renderUserCell = (key: keyof User, row: User) => {
    const { userId, telecomCompany, phoneNumber, createdAt, status } = row

    switch (key) {
      case 'phoneNumber':
        return phoneNumber && formatPhoneNumber(phoneNumber)
      case 'telecomCompany':
        return (
          <Badge
            label={telecomCompany}
            className={getTelecomBadgeColor(telecomCompany)}
            size="small"
          />
        )
      case 'createdAt':
        return new Date(createdAt).toLocaleDateString()
      case 'status': {
        return <Badge label={status === '차단' ? '비활성' : status} {...STATUS_STYLE[status]} />
      }
      case 'isBlocked':
        return (
          <Toggle
            checked={status === '차단'}
            onToggle={isToggled => banMutation.mutate({ userId, isBanned: isToggled })}
          />
        )
      default:
        return row[key]
    }
  }

  const handleRowClick = async (row: User) => {
    // 이미 데이터가 있으면 재사용
    if (reportsByUser[row.userId]) {
      return
    }
    // 데이터 없으면 API 호출 후 저장
    try {
      const { data: userReportData } = await getUserReport(row.userId)
      setReportsByUser(prev => ({ ...prev, [row.userId]: userReportData }))
    } catch (error) {
      showToast({ type: 'error', msg: '데이터를 불러오지 못했습니다.' })
      console.error(error)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setSearchParams({ page: String(newPage) })

    // 페이지 변경시 리포트 초기화
    setReportsByUser({})
  }

  return (
    <main className="space-y-13">
      <SearchBar onSubmit={keyword => console.log(keyword)} />
      <section className="space-y-7">
        <h1 className="text-fs24 font-medium">회원 내역</h1>
        <div className="relative">
          <div className="absolute -top-5 right-0 -translate-y-full font-medium">
            Total <span className="text-pri-400">{totalElements}</span>, Page
            <span className="text-pri-400"> {currentPage}</span>/{totalPages}
          </div>
          <Table
            columns={userColumns}
            data={usersData}
            renderCell={renderUserCell}
            isClickable={row => row.reportCount > 0}
            onRowClick={handleRowClick}
            renderDetailTable={row => (
              <UserDetailRow email={row.email} reports={reportsByUser[row.userId] ?? []} />
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

export default UserHistory
