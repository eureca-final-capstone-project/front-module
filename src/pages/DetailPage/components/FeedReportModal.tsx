import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import IconModal from '../../../components/Modal/IconModal'
import CircleReportIcon from '@/assets/icons/circle-report.svg?react'
import Button from '../../../components/Button/Button'
import { useToast } from '../../../hooks/useToast'
import { postReport, ReportPayload } from '../../../apis/report'
import { AxiosError } from 'axios'
import RadioButton from './RadioButton'

interface FeedReportModalProps {
  isOpen: boolean
  onClose: () => void
  transactionFeedId: number
}

interface ReportErrorResponse {
  statusCode: number
  message: string
}

const REPORT_OPTIONS = [
  { id: 1, label: '욕설 및 비속어 포함' },
  { id: 2, label: '주제와 관련 없는 내용 포함' },
  { id: 3, label: '음란 내용 포함' },
  { id: 4, label: '외부 채널 유도' },
  { id: 5, label: '비방 및 저격 내용 포함' },
]

const FeedReportModal = ({ isOpen, onClose, transactionFeedId }: FeedReportModalProps) => {
  const { showToast } = useToast()

  const [reportTypeId, setReportTypeId] = useState<number | null>(null)
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setReportTypeId(null)
      setReason('')
      setIsSubmitting(false)
    }
  }, [isOpen])

  const { mutate } = useMutation({
    mutationFn: (body: ReportPayload) => postReport(body),
    onSuccess: res => {
      switch (res.statusCode) {
        case 200:
          showToast({ msg: '신고가 접수되었습니다.', type: 'success' })
          onClose()
          break
        case 70007:
          showToast({ msg: '이미 신고한 사용자의 게시글입니다.', type: 'error' })
          onClose()
          break
        case 70006:
          showToast({ msg: '신고하려는 게시글이 존재하지 않습니다.', type: 'error' })
          onClose()
          break
        case 70004:
          showToast({ msg: '신고 유형이 올바르지 않습니다. 다시 시도해주세요.', type: 'error' })
          onClose()
          break
        case 70008:
          showToast({
            msg: '신고 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
            type: 'error',
          })
          onClose()
          break
        default:
          showToast({
            msg: '신고 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
            type: 'error',
          })
          onClose()
          break
      }
      setIsSubmitting(false)
    },
    onError: (error: AxiosError<ReportErrorResponse>) => {
      console.error('신고 실패 응답:', error.response?.data)
      showToast({ msg: '신고 처리 중 오류가 발생했습니다.', type: 'error' })
      setIsSubmitting(false)
    },
  })

  const handleSubmit = () => {
    if (!reportTypeId || !reason.trim()) {
      showToast({ msg: '신고 유형과 사유를 모두 입력해주세요.', type: 'error' })
      return
    }

    setIsSubmitting(true)
    mutate({ transactionFeedId, reportTypeId, reason })
  }

  return (
    <IconModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<CircleReportIcon className="h-6.5 w-6.5" />}
      title="신고하기"
      description={
        <div className="space-y-1">
          <p>신고 유형을 선택하고, 신고 사유를 작성해주세요.</p>
          <p className="text-fs12 text-gray-500">
            ⚠ 이미 신고한 사용자의 다른 게시글은 신고할 수 없습니다.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div>
          {REPORT_OPTIONS.map(option => (
            <RadioButton
              key={option.id}
              label={option.label}
              checked={reportTypeId === option.id}
              onChange={() => setReportTypeId(option.id)}
            />
          ))}
        </div>
        <h4 className="text-fs16 mt-2">신고 사유 (필수)</h4>
        <textarea
          className="text-fs16 rounded-custom-s w-full border border-gray-200 p-3 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          rows={4}
          placeholder="신고 사유를 입력해주세요"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
      </div>
      <Button
        className="bg-pri-500 text-gray-10 text-fs16"
        text="신고 접수하기"
        onClick={handleSubmit}
        disabled={isSubmitting}
      />
    </IconModal>
  )
}

export default FeedReportModal
