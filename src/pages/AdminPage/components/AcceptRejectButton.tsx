import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restrictionAccept, restrictionReject } from '../../../apis/admin/restrictions'
import { RestrictionStatus } from '../../../types/admin'

interface AcceptRejectButtonProps {
  restrictionTargetId: number
  status: RestrictionStatus
}

const AcceptRejectButton = ({ restrictionTargetId, status }: AcceptRejectButtonProps) => {
  const queryClient = useQueryClient()

  const approveMutation = useMutation({
    mutationFn: restrictionAccept,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restrictions'] })
    },
    onError: error => {
      alert(error)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: restrictionReject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restrictions'] })
    },
    onError: error => {
      alert(error)
    },
  })

  const isPending = approveMutation.isPending || rejectMutation.isPending
  const isAlreadyHandled = ['COMPLETED', 'REJECTED', 'RESTRICT_EXPIRATION'].includes(status)

  if (isAlreadyHandled) return null

  return (
    <div className="text-fs12 inline-flex overflow-hidden rounded-sm border border-gray-300 font-medium">
      <button
        onClick={e => {
          e.stopPropagation()
          approveMutation.mutate(restrictionTargetId)
        }}
        disabled={isPending}
        className="bg-gray-10 px-4 py-2 hover:bg-gray-200"
      >
        승인
      </button>
      <div className="w-0.25 bg-gray-300" />
      <button
        onClick={e => {
          e.stopPropagation()
          rejectMutation.mutate(restrictionTargetId)
        }}
        disabled={isPending}
        className="bg-gray-10 px-4 py-2 hover:bg-gray-200"
      >
        거절
      </button>
    </div>
  )
}

export default AcceptRejectButton
