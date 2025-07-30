import Card from '../components/Card/Card'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
import DatchaCoinColor from '@/assets/icons/datcha-coin-color.svg?react'
import { formatAmount, formatDataSize } from '../utils/format'
import { getUserPayStatus } from '../apis/userInfo'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PostCard from '../components/PostCard/PostCard'
import { getTransactionFeedDetail, postPurchaseFeed } from '../apis/transactionFeedDetail'
import { transformTransactionFeedToPostCard } from '../utils/postCardParse'
import { useNavigate, useParams } from 'react-router-dom'
import Badge from '../components/Badge/Badge'
import Button from '../components/Button/Button'
import { useState } from 'react'
import BasicModal from './MyPage/components/Modal/BasicModal'
import { toast } from 'react-toastify'

const DataPurchasePage = () => {
  const { transactionFeedId } = useParams<{ transactionFeedId: string }>()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['transactionFeed', transactionFeedId],
    queryFn: () => getTransactionFeedDetail(Number(transactionFeedId)),
    enabled: !!transactionFeedId,
  })
  const { data: userPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
  })
  const post = data ? transformTransactionFeedToPostCard(data, true) : null

  const purchaseMutation = useMutation({
    mutationFn: () => postPurchaseFeed(Number(transactionFeedId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataCoupons'] })
      toast('데이터 충전권이 발급되었습니다.', { type: 'success' })
      closeModal()
      navigate('/mypage/data-charge')
    },
    onError: (error: Error & { code?: number }) => {
      let message = ''

      switch (error.code) {
        case 40057:
          message = '보유하신 다챠페이가 부족합니다. 충전 후 다시 시도해주세요.'
          toast(message, { type: 'error' })
          setTimeout(() => {
            navigate('/payment')
          }, 1000)
          break
        case 60001:
          message = '통신사가 달라 거래할 수 없어요.'
          break
        case 30003:
          message = '존재하지 않거나 삭제된 판매글입니다.'
          break
        case 30017:
          message = '이미 거래된 판매글입니다. 다른 상품을 구경해보세요.'
          toast(message, { type: 'error' })
          setTimeout(() => {
            navigate('/posts')
          }, 1000)
          break
        case 30018:
          message = '본인 판매글은 구매가 불가능합니다.'
          break
        default:
          message = error.message || '데이터 거래에 실패하였습니다.'
      }

      if (![40057, 30017].includes(error.code ?? 0)) {
        toast(message, { type: 'error' })
      }

      closeModal()
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const payChange = (userPayStatus?.balance ?? 0) - (post?.salesPrice ?? 0)

  const openModal = () => {
    if (payChange < 0) {
      toast('보유하신 다챠페이가 부족합니다. 충전 후 다시 시도해주세요.', { type: 'error' })
      return
    }

    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false)

  const handleClickLeft = () => {
    closeModal()
  }
  const handleClickRight = () => {
    if (!transactionFeedId) return
    purchaseMutation.mutate()
  }

  return (
    <div className="flex h-full flex-col px-4 pb-20 sm:h-[calc(100vh-126px)] sm:justify-between sm:px-0 sm:pb-0">
      <div className="flex h-full flex-col gap-4">
        <Card
          type="label"
          labelTitle="거래 상품 정보"
          withMotion
          motionCustom={0}
          className="h-full"
        >
          {post && <PostCard {...post} type="row" page="favorite" />}
        </Card>

        <Card withMotion motionCustom={1}>
          <div className="flex items-center justify-between font-medium">
            <span className="text-fs18 sm:text-fs20 text-gray-900">보유 다챠페이</span>
            <div className="flex gap-1 sm:gap-2">
              <DatchaCoin className="h-6 w-6" />
              <span className="text-fs18 sm:text-fs20 text-pri-500 font-semibold">
                {formatAmount(userPayStatus?.balance ?? 0)}
              </span>
            </div>
          </div>
        </Card>
        <Card type="label" labelTitle="구매 예정 정보" withMotion motionCustom={2}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span>구매 데이터</span>
              {post && <Badge label={formatDataSize(post.salesDataAmount)} />}
            </div>
            <div className="flex justify-between">
              <span>결제 예정 페이</span>
              <div className="flex gap-1 sm:gap-2">
                <DatchaCoin className="h-6 w-6" />
                <span className="text-fs18 sm:text-fs20 text-pri-500 font-semibold">
                  {post ? formatAmount(post.salesPrice ?? 0) : '0'}
                </span>
              </div>
            </div>
          </div>
        </Card>
        <Card
          withMotion
          motionCustom={2}
          className="cursor-pointer"
          onClick={() => navigate('/payment')}
          type="notice"
          iconTitle="결제할 다챠페이가 부족하신가요?"
          iconDescription="다챠페이 충전하러가기"
        ></Card>
      </div>
      <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2 px-4 sm:px-0">
        <Button
          text="구매하기"
          onClick={openModal}
          className="text-fs16 button-active w-full p-4 font-medium"
        />
      </div>
      <BasicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType="data-purchase"
        onClickLeft={handleClickLeft}
        onClickRight={handleClickRight}
        isWarning={true}
      >
        <div className="text-fs16 mb-3 w-full">
          <h4 className="text-fs18 font-medium">거래 후 변동 정보</h4>
          <hr className="mt-0.5 mb-2 w-full border-t-gray-200"></hr>
          <div>
            <div className="flex items-center justify-between">
              <span>잔여 다챠페이</span>
              <div className="flex items-center gap-1 text-gray-900">
                <DatchaCoinColor className="h-4 w-4" />
                <span>{formatAmount(payChange)}</span>
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}

export default DataPurchasePage
