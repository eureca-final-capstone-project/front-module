import ReceiptInfo from '../../../../components/ReceiptModal/ReceiptInfo'
import CircleReportIcon from '@/assets/icons/circle-report.svg?react'
import { useEffect } from 'react'
import { ReportHistoryItem } from '../../../../apis/report'
import { getStatusLabelAndClass } from '../config'
import { formatFullDate } from '../../../../utils/time'
import Button from '../../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { getTransactionFeedDetail } from '../../../../apis/transactionFeedDetail'
import { useToast } from '../../../../hooks/useToast'
import IconModal from '../../../../components/Modal/IconModal'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  report?: ReportHistoryItem
}

const ReportModal = ({ isOpen, onClose, report }: ReportModalProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleNavigateToPost = async () => {
    if (!report) return
    const basePath =
      report.salesType === '일반 판매' ? 'normal' : report.salesType === '입찰 판매' ? 'bid' : null

    if (!basePath) return

    try {
      await getTransactionFeedDetail(report.transactionFeedId)

      onClose()
      navigate(`/posts/${basePath}/${report.transactionFeedId}`)
    } catch {
      showToast({ type: 'error', msg: '삭제되었거나 존재하지 않는 게시글입니다.' })
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarWidth}px`

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <IconModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<CircleReportIcon className="h-6.5 w-6.5" />}
      title="신고 상세 내역"
      description="접수된 신고에 대한 상세 정보를 확인해보세요."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4">
        <ReceiptInfo label="신고 판매글" value={report?.title ?? '-'} />
        <ReceiptInfo label="신고 유형" value={report?.reportType ?? '-'} />
        <ReceiptInfo label="신고 일시" value={formatFullDate(report?.createdAt ?? '', 'tablet')} />
        <ReceiptInfo label="처리 여부" value={getStatusLabelAndClass(report?.status ?? '').label} />
        <ReceiptInfo label="신고 사유" value={report?.reason ?? '-'} className="sm:col-span-2" />
      </div>
      <Button
        className="border-pri-500 text-pri-500 mt-5 border-1"
        text="게시글 자세히 보기"
        onClick={handleNavigateToPost}
      />
    </IconModal>
  )
}

export default ReportModal
