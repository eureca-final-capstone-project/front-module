import ReceiptInfo from '../../../../components/ReceiptModal/ReceiptInfo'
import CircleReportIcon from '@/assets/icons/circle-report.svg?react'
import CloseIcon from '@/assets/icons/x.svg?react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInUpMotion from '../../../../components/Animation/FadeInUpMotion'
import { useEffect } from 'react'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
}

const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  useEffect(() => {
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
  }, [onClose])

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
            <div className="flex w-82 flex-col overflow-hidden rounded-md md:w-88">
              <div className="bg-gray-10 flex flex-col gap-5 px-4 py-9">
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
                <ReceiptInfo label="신고 판매글" value="내용내용" />
                <ReceiptInfo label="신고 판매글" value="내용내용" />
                <ReceiptInfo label="신고 판매글" value="내용내용" />
                <ReceiptInfo label="신고 판매글" value="내용내용" />
              </div>
            </div>
          </div>
        </FadeInUpMotion>
      </motion.div>
    </AnimatePresence>
  )
}

export default ReportModal
