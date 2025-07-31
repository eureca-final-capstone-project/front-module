import { imageData as PostImage } from '../../constants/imageData'
import ProviderBadge from '../../components/PostCard/ProviderBadge'
import DataBadge from '../../components/Badge/Badge'
import { formatAmount, formatDataSize } from '../../utils/format'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import Button from '../../components/Button/Button'
import ReportStrokeIcon from '@/assets/icons/report-stroke.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteTransactionFeed,
  getRecommendedPosts,
  getTransactionFeedDetail,
  TransactionFeedDetailResponse,
} from '../../apis/transactionFeedDetail'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { formatRelativeTime } from '../../utils/time'
import { transformRecommendedPost } from '../../utils/postCardParse'
import { useState } from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import WishIcon from '@/assets/icons/heart.svg?react'
import WishFillIcon from '@/assets/icons/heart-fill.svg?react'
import PostCard from '../../components/PostCard/PostCard'
import { mapSalesTypeFromServer } from '../../utils/salesType'
import { useWishMutation } from '../../hooks/useWishMutation'
import { getTokenParsed } from '../../apis/tokenParsed'
import { toast } from 'react-toastify'
import FeedReportModal from './components/FeedReportModal'
import { AxiosError } from 'axios'
import BasicModal from '../MyPage/components/Modal/BasicModal'

const NormalDetailPage = () => {
  const { transactionFeedId } = useParams<{ transactionFeedId: string }>()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const deviceType = useDeviceType()

  const { data, isLoading, isError } = useQuery<TransactionFeedDetailResponse>({
    queryKey: ['transactionFeedDetail', transactionFeedId],
    queryFn: () => getTransactionFeedDetail(Number(transactionFeedId)),
    enabled: !!transactionFeedId,
  })
  const { data: recommendedData, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ['recommendedPosts', transactionFeedId],
    queryFn: () => getRecommendedPosts(Number(transactionFeedId)),
    enabled: !!transactionFeedId,
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteTransactionFeed(Number(transactionFeedId)),
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다.')
      closeModal()
      navigate('/my-posts')
    },
    onError: (error: AxiosError<{ statusCode: number; message: string }>) => {
      const code = error.response?.data?.statusCode
      console.error('삭제 실패:', error)

      switch (code) {
        case 30003:
          toast.error('삭제할 게시글을 찾을 수 없습니다.')
          break
        case 30002:
          toast.error('게시글 삭제 권한이 없습니다.')
          break
        case 30006:
          toast.error('입찰 판매글은 삭제할 수 없습니다.')
          break
        default:
          toast.error('게시글 삭제 중 오류가 발생했습니다.')
      }
    },
  })

  const { data: userInfo } = useQuery({
    queryKey: ['tokenParsed'],
    queryFn: getTokenParsed,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!sessionStorage.getItem('userAccessToken'),
  })

  const { addWishMutation, deleteWishMutation } = useWishMutation(Number(transactionFeedId))

  if (isLoading) return <p>로딩 중</p>
  if (isError || !data) return <p>에러</p>

  const validSalesTypes = ['일반 판매', '입찰 판매'] as const

  if (!data?.salesType?.name || !validSalesTypes.includes(data.salesType.name)) {
    return <Navigate to="/404" replace />
  }

  const actualType = mapSalesTypeFromServer(data.salesType.name)

  if (actualType !== 'normal') {
    return <Navigate to="/404" replace />
  }

  const isLoggedIn = !!userInfo
  const isMyPost = userInfo?.userId === data.sellerId
  const hasTransactionPermission = userInfo?.authorities.includes('TRANSACTION')
  const isBuyDisabled = isMyPost || !hasTransactionPermission

  const handleWishClick = () => {
    if (!isLoggedIn) {
      toast.info('로그인이 필요한 기능입니다.')
      navigate('/login')
      return
    }

    if (data.liked) {
      deleteWishMutation.mutate([Number(transactionFeedId)])
      return
    }
    addWishMutation.mutate(Number(transactionFeedId))
  }

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      toast.info('로그인 후 구매할 수 있습니다.')
      navigate('/login')
      return
    }
    navigate(`/data-purchase/${data.transactionFeedId}`)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate()
  }
  return (
    <main>
      <div className="bg-gray-10 mb-15 flex flex-col px-4 pb-10 sm:border-b-1 sm:border-b-gray-200 sm:bg-transparent sm:px-0 md:flex-row md:gap-4 lg:gap-7">
        {/* 이미지 */}
        <div className="relative h-full w-full overflow-hidden rounded-md md:max-w-75">
          <img
            src={PostImage[data.defaultImageNumber]}
            alt={'이미지'}
            className={`h-full w-full object-cover`}
          />
          {data.status.code !== 'ON_SALE' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70">
              <span className="text-fs16 text-gray-10 font-semibold transition-transform duration-200 group-hover:scale-105">
                {data.status.code === 'COMPLETED' ? '거래 완료' : '기간 만료'}
              </span>
            </div>
          )}
          <div className="absolute right-0 bottom-0 h-auto w-[45%] sm:px-0">
            <ProviderBadge telecomCompany={data.telecomCompany.name} />
          </div>
        </div>
        {/* 모바일 시세 비교 */}
        <div className="bg-pri-100 mt-2 mb-4 block rounded-xs p-1 text-center text-gray-700 md:hidden">
          {data.priceCompare === 'NO_STATISTIC' ? (
            '시세 정보가 부족해 비교가 어려워요'
          ) : (
            <>
              현재 시세 대비{' '}
              <span className="text-pri-500 font-semibold">약 {data.rate.toFixed(1)}</span>%{' '}
              {data.priceCompare === 'CHEAPER'
                ? '저렴해요!'
                : data.priceCompare === 'EXPENSIVE'
                  ? '비싸요!'
                  : '동일해요!'}
            </>
          )}
        </div>

        <div className="mb-4 flex w-full justify-between md:mb-0">
          <div className="flex w-full flex-col gap-4 md:justify-between">
            {/* 상단 타이틀 / 닉네임 / 시간 / 신고하기 */}
            <div className="flex w-full flex-col">
              <div className="gap-auto flex items-center justify-between">
                {/* 뱃지 / 제목 */}
                <div className="mb-3 flex items-center gap-1 md:gap-2">
                  <DataBadge
                    label={formatDataSize(data.salesDataAmount)}
                    className="text-fs14 lg:text-fs18 text-gray-10 font-medium lg:px-3.5 lg:py-2.5"
                  />
                  <span className="test-fs18 sm:text-fs22 lg:text-fs28">{data.title}</span>
                </div>

                {/* 데스크탑 신고하기 */}
                <div
                  className={`hidden items-end justify-end lg:flex ${isMyPost ? 'gap-2' : 'gap-1'}`}
                >
                  {isMyPost ? (
                    <>
                      <Button
                        text="수정하기"
                        className="text-gray-700"
                        shape="underline"
                        onClick={() => {}}
                      />
                      <Button
                        text="삭제하기"
                        className="text-gray-700"
                        shape="underline"
                        onClick={openModal}
                      />
                    </>
                  ) : (
                    <>
                      <ReportStrokeIcon className="text-error" />
                      <Button
                        text="신고하기"
                        className="text-gray-700"
                        shape="underline"
                        onClick={() => {
                          if (!isLoggedIn) {
                            toast.info('로그인이 필요한 기능입니다.')
                            navigate('/login')
                            return
                          }
                          setIsReportModalOpen(true)
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="mb-4 flex items-center justify-between gap-3 text-gray-800 md:mb-5">
                {/* 닉네임 / 시간 */}
                <div className="text-fs14 sm:text-fs16 lg:text-fs20 flex gap-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <UserIcon className="text-pri-300 text-fs20" />
                    <span>{data.nickname}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <TimeIcon className="text-fs20" />
                    <span>{formatRelativeTime(data.createdAt)}</span>
                  </div>
                </div>
                {/* 태블릿 / 모바일 신고하기 */}
                <div>
                  <div
                    className={`flex items-end justify-end lg:hidden ${isMyPost ? 'gap-2' : 'gap-1'}`}
                  >
                    {isMyPost ? (
                      <>
                        <Button
                          text="수정하기"
                          shape="underline"
                          className="text-fs14 sm:text-fs16 text-gray-700"
                          onClick={() => {}}
                        />
                        <Button
                          text="삭제하기"
                          shape="underline"
                          className="text-fs14 sm:text-fs16 text-gray-700"
                          onClick={openModal}
                        />
                      </>
                    ) : (
                      <>
                        <ReportStrokeIcon className="text-error" />
                        <Button
                          text="신고하기"
                          shape="underline"
                          className="text-fs14 sm:text-fs16 text-gray-700"
                          onClick={() => {
                            if (!isLoggedIn) {
                              toast.info('로그인이 필요한 기능입니다.')
                              navigate('/login')
                              return
                            }
                            setIsReportModalOpen(true)
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* 내용 */}
              <div>
                <p className="lg:text-fs20 text-gray-800">{data.content}</p>
              </div>
            </div>
            {/* 가격 / 버튼 */}
            <div className="flex flex-col items-end justify-between gap-4 md:flex-row lg:gap-7">
              {/* 가격 */}
              <div className="flex w-full flex-col gap-2 lg:gap-4">
                <div className="text-fs20 sm:text-fs22 lg:text-fs28 flex items-center justify-between font-bold">
                  <span>거래 페이</span>
                  <div className="flex items-center lg:gap-1">
                    <DatchaCoinIcon className="w-8.25" />
                    <p className="text-pri-500 font-bold">{formatAmount(data.salesPrice)}</p>
                  </div>
                </div>

                <div className="bg-pri-100 hidden rounded-xs p-1 text-center text-gray-700 md:block">
                  {data.priceCompare === 'NO_STATISTIC' ? (
                    '시세 정보가 부족해 비교가 어려워요'
                  ) : (
                    <>
                      현재 시세 대비 약{' '}
                      <span className="text-pri-500 font-semibold">{data.rate.toFixed(1)}</span>%{' '}
                      {data.priceCompare === 'CHEAPER'
                        ? '저렴해요!'
                        : data.priceCompare === 'EXPENSIVE'
                          ? '비싸요!'
                          : '동일해요!'}
                    </>
                  )}
                </div>
              </div>
              {/* 버튼 */}
              <div className="bg-background fixed right-0 bottom-0 left-0 z-25 flex w-full gap-3 border-t-[0.5px] border-gray-200 px-4 pt-3 pb-4 md:static md:w-48 md:flex-col md:gap-4 md:border-none md:bg-transparent md:p-0 lg:w-67">
                {/* Col 일때 관심 버튼 */}
                <Button
                  text={
                    <div className="flex items-center justify-center gap-1">
                      {data.liked ? <WishFillIcon /> : <WishIcon />}
                      <span>관심</span>
                      <span className="text-gray-600">{data.likedCount}</span>
                    </div>
                  }
                  className="text-fs18 lg:text-fs20 bg-gray-50 p-3.5 font-medium text-gray-800 md:hidden"
                  onClick={() => {
                    if (deviceType === 'mobile') {
                      setIsSheetOpen(true)
                    }
                    handleWishClick()
                  }}
                />
                {/* Row 일때 관심 버튼 */}
                <Button
                  text={
                    <div className="flex min-w-36 items-center justify-center gap-1 lg:min-w-full lg:gap-2">
                      {data.liked ? <WishFillIcon /> : <WishIcon />}
                      <span>관심 거래</span>
                      <span>{data.likedCount}</span>
                    </div>
                  }
                  className="bg-gray-10 text-pri-500 border-pri-500 text-fs18 lg:text-fs20 hidden border-2 p-5 font-medium md:block"
                  onClick={handleWishClick}
                />
                <Button
                  onClick={handleBuyClick}
                  text="구매하기"
                  disabled={isBuyDisabled}
                  className={`${isBuyDisabled ? 'button-disabled' : 'button-active'} text-fs18 lg:text-fs20 flex-1 p-3.5 font-medium md:hidden`}
                />
                <Button
                  onClick={handleBuyClick}
                  text="구매하기"
                  disabled={isBuyDisabled}
                  className={`${isBuyDisabled ? 'button-disabled' : 'button-active'} text-fs18 lg:text-fs20 hidden w-auto p-5 font-medium md:block`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 관련 상품 */}

      {deviceType !== 'mobile' ? (
        <div className="flex flex-col gap-10">
          <h2 className="text-fs28 font-medium">관련 상품</h2>
          {isRecommendedLoading ? (
            <p className="text-gray-500">관련 상품 로딩 중</p>
          ) : recommendedData && recommendedData.length > 0 ? (
            <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
              {recommendedData.map(post => (
                <PostCard
                  key={post.transactionFeedId}
                  {...transformRecommendedPost(post)}
                  type="col"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">관련 상품이 없습니다.</p>
          )}
        </div>
      ) : (
        <BottomSheet title="관련 상품" isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
          <div className="flex flex-col gap-6">
            {isRecommendedLoading ? (
              <p className="text-center text-gray-500">관련 상품 로딩 중</p>
            ) : recommendedData && recommendedData.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {recommendedData.map(post => (
                  <PostCard
                    key={post.transactionFeedId}
                    {...transformRecommendedPost(post)}
                    type="col"
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">관련 상품이 없습니다.</p>
            )}
          </div>
        </BottomSheet>
      )}
      <FeedReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        transactionFeedId={Number(transactionFeedId)}
      />
      <BasicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType="delete-feed"
        onClickLeft={closeModal}
        onClickRight={handleConfirmDelete}
      />
    </main>
  )
}

export default NormalDetailPage
