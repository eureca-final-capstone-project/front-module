import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addWishPost, deleteWishPosts } from '../apis/wish'
import { useToast } from './useToast'

interface WishResponse {
  statusCode: number
  message: string
  data: null
}

export const useWishMutation = (transactionFeedId: number) => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const handleSuccess = (data: WishResponse, isAdd: boolean) => {
    switch (data.statusCode) {
      case 200:
        queryClient.invalidateQueries({
          queryKey: ['transactionFeedDetail', String(transactionFeedId)],
        })
        break
      case 10004:
        showToast({ type: 'default', msg: '로그인 후 이용 가능합니다.' })
        break
      case 30007:
        if (isAdd) {
          showToast({ type: 'error', msg: '이미 관심 거래에 등록된 판매글입니다.' })
        } else {
          showToast({ type: 'error', msg: '이미 관심 거래에서 삭제되었습니다.' })
        }
        break
      default:
        showToast({
          type: 'error',
          msg: isAdd
            ? '관심 거래 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.'
            : '관심 거래 등록 취소에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        })
    }
  }

  const handleError = (isAdd: boolean) => {
    showToast({
      type: 'error',
      msg: isAdd
        ? '관심 거래 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.'
        : '관심 거래 등록 취소에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    })
  }

  const addWishMutation = useMutation({
    mutationFn: addWishPost,
    onSuccess: data => handleSuccess(data, true),
    onError: () => handleError(true),
  })

  const deleteWishMutation = useMutation({
    mutationFn: deleteWishPosts,
    onSuccess: data => handleSuccess(data, false),
    onError: () => handleError(false),
  })

  return { addWishMutation, deleteWishMutation }
}
