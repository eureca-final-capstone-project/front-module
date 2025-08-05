import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { imagePost } from '../../constants/imageData'
import ProviderBadge from '../../components/PostCard/ProviderBadge'
import DataBadge from '../../components/Badge/Badge'
import { formatAmount, formatDataSize } from '../../utils/format'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import DatchaCoinSecondary from '@/assets/icons/datcha-coin-secondary.svg?react'
import Button from '../../components/Button/Button'
import ReportStrokeIcon from '@/assets/icons/report-stroke.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import {
  getTransactionFeedDetail,
  TransactionFeedDetailResponse,
  postBid,
} from '../../apis/transactionFeedDetail'
import { formatRelativeTime } from '../../utils/time'
import BidDeadLine from './components/BidDeadLine'
import PriceGraph from './components/PriceGraph'
import BidHistory from './components/BidHistory'
import BidModal from './components/BidModal'
import { useToast } from '../../hooks/useToast'
import { mapSalesTypeFromServer } from '../../utils/salesType'
import { useWishMutation } from '../../hooks/useWishMutation'
import WishIcon from '@/assets/icons/heart.svg?react'
import WishFillIcon from '@/assets/icons/heart-fill.svg?react'
import { getTokenParsed } from '../../apis/tokenParsed'
import { toast } from 'react-toastify'
import FeedReportModal from './components/FeedReportModal'
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'
import { useDeviceType } from '../../hooks/useDeviceType'
import { useAuthStore, usePermissionStore } from '../../store/authStore'
import useScrollToTop from '../../hooks/useScrollToTop'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { getUserPayStatus } from '../../apis/userInfo'
import { useNotificationStore } from '../../store/notificationStore'
import { useEffect } from 'react'

const BidDetailPage = () => {
  useScrollToTop()
  const { showToast } = useToast()
  const { transactionFeedId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const deviceType = useDeviceType()
  const permissions = usePermissionStore(state => state.permissions)

  const isLoggedIn = useAuthStore(state => state.isLogin)
  const navigate = useNavigate()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const queryClient = useQueryClient()
  const notifications = useNotificationStore(state => state.notifications)
  const latest = notifications[0]
  const latestAlarmId = latest?.alarmId

  useEffect(() => {
    if (!latest || !transactionFeedId) return

    const isBidUpdate =
      latest.alarmType?.type === '입찰 성공' || latest.alarmType?.type === '입찰 갱신'

    const isSameFeed = latest.transactionFeedId === Number(transactionFeedId)

    if (isBidUpdate && isSameFeed) {
      queryClient.refetchQueries({ queryKey: ['transactionFeedDetail', transactionFeedId] })
      queryClient.refetchQueries({ queryKey: ['bidHistory', transactionFeedId] })
    }
  }, [latestAlarmId, transactionFeedId])

  const { data, isLoading, isError } = useQuery<TransactionFeedDetailResponse>({
    queryKey: ['transactionFeedDetail', transactionFeedId],
    queryFn: () => getTransactionFeedDetail(Number(transactionFeedId)),
    enabled: !!transactionFeedId,
  })

  const { addWishMutation, deleteWishMutation } = useWishMutation(Number(transactionFeedId))

  const bidMutation = useMutation({
    mutationFn: ({ id, amount }: { id: number; amount: number }) => postBid(id, amount),
    onSuccess: (_, variables) => {
      showToast({ type: 'success', msg: `${formatAmount(variables.amount)}에 입찰되었습니다!` })
      closeModal()
      queryClient.invalidateQueries({ queryKey: ['bidHistory', transactionFeedId] })
      queryClient.invalidateQueries({ queryKey: ['transactionFeedDetail', transactionFeedId] })
      queryClient.invalidateQueries({ queryKey: ['userPayStatus'] })
    },
    onError: (error: unknown) => {
      let errorMessage = '입찰 처리 중 오류가 발생했습니다.'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      showToast({ type: 'error', msg: errorMessage })
    },
  })

  const handleBidSubmit = (bidAmount: number) => {
    if (!transactionFeedId) {
      showToast({ type: 'error', msg: '거래 ID가 없습니다.' })
      return
    }
    bidMutation.mutate({ id: Number(transactionFeedId), amount: bidAmount })
  }

  const { data: userInfo } = useQuery({
    queryKey: ['tokenParsed'],
    queryFn: getTokenParsed,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!sessionStorage.getItem('userAccessToken'),
  })

  const { data: userPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
    enabled: isLoggedIn, // 로그인된 경우에만 조회
    staleTime: 1000 * 60 * 3,
  })

  if (isLoading) return <LoadingSpinner className="min-h-screen" />
  if (isError || !data) {
    return <Navigate to="/404" replace />
  }

  const isMyPost = userInfo?.userId === data.sellerId
  const hasTransactionPermission = permissions.includes('TRANSACTION')
  const isCompletedOrExpired = data.status.code === 'COMPLETED' || data.status.code === 'EXPIRED'
  const isBuyDisabled = isMyPost || !hasTransactionPermission || isCompletedOrExpired

  const actualType = mapSalesTypeFromServer(data.salesType.name)

  if (actualType !== 'bid') {
    return <Navigate to="/404" replace />
  }

  if (data.status.code === 'BLURRED') {
    return <Navigate to="/404" replace />
  }
  const image = imagePost.find(img => img.id === data.defaultImageNumber)

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

  return (
    <main className="mb-18.75">
      {deviceType === 'mobile' ? (
        <Breadcrumb
          current="입찰 판매"
          clickableCurrent
          currentPath="/posts?salesTypeIds=2&sortBy=최신순"
        />
      ) : (
        <Breadcrumb
          current={data.title}
          isDesktop
          prevs={[
            { label: '데이터 거래', path: '/posts' },
            { label: '입찰 판매', path: '/posts?salesTypeIds=2&sortBy=최신순' },
          ]}
        />
      )}
      <div className="bg-gray-10 flex flex-col px-4 sm:bg-transparent sm:px-0 md:flex-row md:gap-4 lg:gap-7">
        {/* 이미지 */}
        <div className="relative h-full w-full overflow-hidden rounded-md md:max-w-75">
          <img src={image?.src} alt={data.title} className={`h-full w-full object-cover`} />
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
        {data.priceCompare !== 'NO_STATISTIC' ? (
          <div className="bg-pri-100 mt-2 mb-4 block rounded-xs p-1 text-center text-gray-700 md:hidden">
            {data.priceCompare === 'EXPENSIVE' && (
              <>
                현재 시세 대비{' '}
                <span className="text-pri-500 font-semibold">약 {data.rate.toFixed(1)}% 비싸</span>
                요!
              </>
            )}
            {data.priceCompare === 'CHEAPER' && (
              <>
                현재 시세 대비{' '}
                <span className="text-pri-500 font-semibold">약 {data.rate.toFixed(1)}% 저렴</span>
                해요!
              </>
            )}
            {data.priceCompare === 'SAME' && (
              <span className="text-gray-700">
                현재 시세와 <span className="text-pri-500 font-semibold">동일</span>한 가격이예요!
              </span>
            )}
          </div>
        ) : (
          <div className="bg-pri-100 mt-2 mb-4 block rounded-xs p-1 text-center text-gray-700 md:hidden">
            시세 정보가 부족해 비교가 어려워요.
          </div>
        )}

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
                <div className="hidden items-end justify-end gap-1 lg:flex">
                  {!isMyPost && !isCompletedOrExpired && (
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
                  <div className="flex items-end justify-end gap-1 lg:hidden">
                    {!isMyPost && !isCompletedOrExpired && (
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
                <div className="text-fs20 md:text-fs22 lg:text-fs28 flex items-center justify-between font-medium">
                  <span>등록 페이</span>
                  <div className="flex items-center lg:gap-1">
                    <DatchaCoinSecondary className="w-8.25" />
                    <p className="text-pri-400 font-medium">{formatAmount(data.salesPrice)}</p>
                  </div>
                </div>
                <div className="text-fs20 sm:text-fs22 lg:text-fs28 flex items-center justify-between font-bold">
                  <span>거래 페이</span>
                  <div className="flex items-center lg:gap-1">
                    <DatchaCoinIcon className="w-8.25" />
                    <p className="text-pri-500 font-bold">
                      {data.currentHeightPrice !== undefined
                        ? formatAmount(data.currentHeightPrice)
                        : '-'}
                    </p>
                  </div>
                </div>
                {data.priceCompare !== 'NO_STATISTIC' ? (
                  <div className="bg-pri-100 hidden rounded-xs p-1 text-center text-gray-700 md:block">
                    {data.priceCompare === 'EXPENSIVE' && (
                      <>
                        현재 시세 대비{' '}
                        <span className="text-pri-500 font-semibold">
                          약 {data.rate.toFixed(1)}% 비싸
                        </span>
                        요!
                      </>
                    )}
                    {data.priceCompare === 'CHEAPER' && (
                      <>
                        현재 시세 대비{' '}
                        <span className="text-pri-500 font-semibold">
                          약 {data.rate.toFixed(1)}% 저렴
                        </span>
                        해요!
                      </>
                    )}
                    {data.priceCompare === 'SAME' && (
                      <span className="text-gray-700">
                        현재 시세와 <span className="text-pri-500 font-semibold">동일</span>한
                        가격이예요!
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="bg-pri-100 hidden rounded-xs p-1 text-center text-gray-700 md:block">
                    시세 정보가 부족해 비교가 어려워요.
                  </div>
                )}
              </div>
              {/* 버튼 */}
              <div className="bg-background fixed right-0 bottom-0 left-0 z-10 flex w-full gap-3 border-t-[0.5px] border-gray-200 px-4 pt-3 pb-4 md:static md:w-48 md:flex-col md:gap-4 md:border-none md:bg-transparent md:p-0 lg:w-67">
                {/* Col 일때 관심 버튼 */}
                <Button
                  text={
                    <div className="flex items-center justify-center gap-1">
                      {data.liked ? <WishFillIcon /> : <WishIcon />}
                      <span>관심</span>
                      <span className="text-pri-500">{data.likedCount}</span>
                    </div>
                  }
                  className={`text-fs18 lg:text-fs20 bg-gray-10 text-pri-500 border-pri-500 border-2 p-3.5 font-medium md:hidden ${
                    isMyPost ? 'w-full' : ''
                  }`}
                  onClick={handleWishClick}
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

                {/* 입찰 버튼 - 모바일 */}
                {!isMyPost && (
                  <Button
                    text="입찰하기"
                    onClick={openModal}
                    disabled={isBuyDisabled}
                    className={`${
                      isBuyDisabled ? 'button-disabled' : 'button-active'
                    } text-fs18 lg:text-fs20 flex-1 p-3.5 font-medium md:hidden`}
                  />
                )}

                {/* 입찰 버튼 - 데스크탑 */}
                {!isMyPost && (
                  <Button
                    text="입찰하기"
                    onClick={openModal}
                    disabled={isBuyDisabled}
                    className={`${
                      isBuyDisabled ? 'button-disabled' : 'button-active'
                    } text-fs18 lg:text-fs20 hidden w-auto p-5 font-medium md:block`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-error bg-gray-10 mb-4 px-4 pb-8 sm:mb-6.5 sm:border-b-1 sm:border-b-gray-200 sm:bg-transparent sm:px-0 sm:pt-4 sm:pb-10">
        <BidDeadLine statusCode={data.status.code} />
      </div>
      {/* 관련 상품 */}
      <div className="flex w-full flex-col-reverse gap-4 md:flex-row md:gap-6 lg:gap-10">
        <PriceGraph />
        <BidHistory />
      </div>
      {/* BidModal */}
      <BidModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentHeightPrice={data.currentHeightPrice || 0}
        userBalance={userPayStatus?.balance ?? 0}
        onClickLeft={closeModal}
        onClickRight={handleBidSubmit}
      />
      <FeedReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        transactionFeedId={Number(transactionFeedId)}
      />
    </main>
  )
}

export default BidDetailPage
