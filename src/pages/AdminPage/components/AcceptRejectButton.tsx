import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { restrictionAccept, restrictionReject } from '../../../apis/admin/restrictions'

interface AcceptRejectButtonProps {
  restrictionTargetId: number
  status: 'COMPLETED' | 'REJECTED' | 'PENDING'
}

const AcceptRejectButton = ({ restrictionTargetId, status }: AcceptRejectButtonProps) => {
  const [isSubmitted, setIsSubmitted] = useState(['COMPLETED', 'REJECTED'].includes(status))

  const approveMutation = useMutation({
    mutationFn: restrictionAccept,
    onSuccess: () => {
      setIsSubmitted(true)
    },
    onError: error => {
      alert(error)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: restrictionReject,
    onSuccess: () => {
      setIsSubmitted(true)
    },
    onError: error => {
      alert(error)
    },
  })

  if (isSubmitted) return null

  return (
    <div className="text-fs12 inline-flex overflow-hidden rounded-sm border border-gray-300 font-medium">
      <button
        onClick={() => approveMutation.mutate(restrictionTargetId)}
        disabled={approveMutation.isPending}
        className="bg-gray-10 px-4 py-2 hover:bg-gray-200"
      >
        승인
      </button>
      <div className="w-0.25 bg-gray-300" />
      <button
        onClick={() => rejectMutation.mutate(restrictionTargetId)}
        disabled={rejectMutation.isPending}
        className="bg-gray-10 px-4 py-2 hover:bg-gray-200"
      >
        거절
      </button>
    </div>
  )
}

export default AcceptRejectButton
