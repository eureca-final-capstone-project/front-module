import { useQuery } from '@tanstack/react-query'
import FadeInUpMotion from '../../components/Animation/FadeInUpMotion'
import Badge from '../../components/Badge/Badge'
import ListTile from '../../components/ListTile/ListTile'
import { formatCompactDate } from '../../utils/time'
import { getMyReportHistory } from '../../apis/report'
import type { ReportHistoryItem } from '../../apis/report'
import ReportIcon from '@/assets/icons/report-bold.svg?react'
import { useState } from 'react'
import ReportModal from './components/Modal/ReportModal'

const getStatusLabelAndClass = (status: string): { label: string; className: string } => {
  const pending = ['검수 대기중']
  const rejected = ['AI 거절', '관리자 거절', '제재 미승인']
  const accepted = ['AI 승인', '관리자 승인', '제재 완료']

  if (pending.includes(status)) return { label: '처리 대기', className: 'bg-pri-300' }
  if (rejected.includes(status)) return { label: '신고 거부', className: 'bg-error' }
  if (accepted.includes(status)) return { label: '처리 완료', className: 'bg-success' }

  return { label: '알 수 없음', className: 'bg-gray-300' }
}

const ReportHistoryPage = () => {
  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery<ReportHistoryItem[]>({
    queryKey: ['myReportHistory'],
    queryFn: getMyReportHistory,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    console.log('모달 오픈')
    setIsModalOpen(true)
  }
  const handleCloseModal = () => setIsModalOpen(false)

  if (isLoading || isError || reports.length === 0) {
    let title = ''
    let subtitle: React.ReactNode = null
    let textColor = 'text-gray-500'

    if (isLoading) {
      title = '신고 내역을 불러오는 중이에요'
    } else if (isError) {
      title = '신고 내역을 불러오지 못했습니다'
      subtitle = (
        <p className="text-fs12 sm:text-fs14 mt-2 text-gray-400">잠시 후 다시 시도해주세요</p>
      )
      textColor = 'text-error'
    } else {
      title = '신고 내역이 없습니다'
      subtitle = (
        <p className="text-fs12 sm:text-fs14 mt-2 text-gray-400">
          부적절한 게시글 발견 시 정확한 사유와 함께 신고해주세요 <br />
          허위 신고는 제재 대상이 될 수 있습니다
        </p>
      )
    }

    return (
      <div
        className={`flex h-[20vh] flex-col items-center justify-center text-center ${textColor}`}
      >
        <ReportIcon className="h-6 w-8 sm:h-8 sm:w-10" />
        <p className="text-fs16 sm:text-fs18 pt-3 font-medium">{title}</p>
        {subtitle}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <ListTile type="title">
        <div className="grid w-full grid-cols-2 items-center gap-2 sm:grid-cols-[1fr_2fr_1fr_1fr]">
          <p className="text-left">거래글 명</p>
          <p className="hidden text-center sm:block">신고 유형</p>
          <p className="hidden text-center sm:block">신고일</p>
          <p className="text-right">처리 여부</p>
        </div>
      </ListTile>
      <div className="flex flex-col gap-2 px-5 sm:px-0">
        {reports.map((item, i) => {
          const { label, className } = getStatusLabelAndClass(item.status)
          return (
            <FadeInUpMotion key={item.transactionFeedId} custom={i} delayUnit={0.07} duration={0.3}>
              <ListTile onClick={handleOpenModal}>
                <div className="grid w-full grid-cols-2 items-center gap-2 sm:grid-cols-[1fr_2fr_1fr_1fr]">
                  <p className="truncate text-left">{item.title}</p>
                  <p className="hidden truncate text-center sm:block">{item.reportType}</p>
                  <p className="hidden text-center sm:block">{formatCompactDate(item.createdAt)}</p>
                  <div className="flex justify-end">
                    <Badge size="small" variant="default" label={label} className={className} />
                  </div>
                </div>
              </ListTile>
            </FadeInUpMotion>
          )
        })}
      </div>
      <ReportModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default ReportHistoryPage
