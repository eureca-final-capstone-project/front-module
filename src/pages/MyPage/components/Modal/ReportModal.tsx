import ReceiptInfo from '../../../../components/ReceiptModal/ReceiptInfo'
import CircleReportIcon from '@/assets/icons/circle-report.svg?react'
import CloseIcon from '@/assets/icons/x.svg?react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInUpMotion from '../../../../components/Animation/FadeInUpMotion'
import { useEffect } from 'react'
import { ReportHistoryItem } from '../../../../apis/report'
import { getStatusLabelAndClass } from '../config'
import { formatFullDate } from '../../../../utils/time'
import Button from '../../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { getTransactionFeedDetail } from '../../../../apis/transactionFeedDetail'
import { useToast } from '../../../../hooks/useToast'

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
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="bg-modal-background fixed inset-0 z-100 flex cursor-pointer items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backdropFilter: 'blur(1.5px)' }}
      >
        <FadeInUpMotion custom={0} duration={0.3}>
          <div
            onClick={e => e.stopPropagation()}
            className="relative flex cursor-default flex-col items-center"
          >
            <div className="shadow-receipt-top bg-error-light absolute -top-7 z-10 flex h-14 w-14 items-center justify-center rounded-full">
              <CircleReportIcon className="h-6.5 w-6.5" />
            </div>
            <div className="flex w-82 flex-col overflow-hidden rounded-md sm:w-[31rem]">
              <div className="bg-gray-10 flex flex-col gap-5 px-4 pt-9 pb-5">
                <div className="flex flex-col gap-[0.5rem]">
                  <div className="-mb-2 flex justify-end">
                    <CloseIcon
                      className="transition-smooth cursor-pointer text-gray-400 hover:text-gray-800 focus:text-gray-800"
                      onClick={onClose}
                    />
                  </div>
                  <h2 className="text-fs18 md:text-fs20 text-center font-medium text-gray-900">
                    신고 상세 내역
                  </h2>
                  <p className="text-fs12 md:text-fs14 text-center text-gray-500">
                    신고 상세 내역입니다
                  </p>
                </div>
                <hr className="border-gray-100" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4">
                  <ReceiptInfo
                    label="신고 판매글"
                    value={report?.title ?? '-'}
                    className="order-1 sm:order-none"
                  />
                  <ReceiptInfo
                    label="신고 유형"
                    value={report?.reportType ?? '-'}
                    className="order-2 sm:order-none"
                  />
                  <ReceiptInfo
                    label="신고 일시"
                    value={formatFullDate(report?.createdAt ?? '', 'tablet')}
                    className="order-3 sm:order-none"
                  />
                  <ReceiptInfo
                    label="처리 여부"
                    value={getStatusLabelAndClass(report?.status ?? '').label}
                    className="order-5 sm:order-none"
                  />
                  <ReceiptInfo
                    label="신고 사유"
                    value={report?.reason ?? '-'}
                    className="order-4 sm:order-none sm:col-span-2"
                  />
                </div>
                <Button
                  className="border-pri-500 text-pri-500 border-1"
                  text="게시글 자세히 보기"
                  onClick={handleNavigateToPost}
                />
              </div>
            </div>
          </div>
        </FadeInUpMotion>
      </motion.div>
    </AnimatePresence>
  )
}

export default ReportModal
