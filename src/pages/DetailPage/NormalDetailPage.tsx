import { imageData as PostImage } from '../../constants/imageData'
import ProviderBadge from '../../components/PostCard/ProviderBadge'
import DataBadge from '../../components/Badge/Badge'
import { formatAmount, formatDataSize } from '../../utils/format'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import Button from '../../components/Button/Button'
import ReportStrokeIcon from '@/assets/icons/report-stroke.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import { useQuery } from '@tanstack/react-query'
import {
  getRecommendedPosts,
  getTransactionFeedDetail,
  TransactionFeedDetailResponse,
} from '../../apis/transactionFeedDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { formatRelativeTime } from '../../utils/time'
import PostCardCol from '../../components/PostCard/PostCardCol'
import { transformRecommendedPost } from '../../utils/postCardParse'
import { useState } from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import WishIcon from '@/assets/icons/heart.svg?react'
import WishFillIcon from '@/assets/icons/heart-fill.svg?react'
import { useWishMutation } from '../../hooks/useWishMutation'

const NormalDetailPage = () => {
  const { transactionFeedId } = useParams<{ transactionFeedId: string }>()
  const navigate = useNavigate()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
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

  const { addWishMutation, deleteWishMutation } = useWishMutation(Number(transactionFeedId))

  if (isLoading) return <p>로딩 중</p>
  if (isError || !data) return <p>에러</p>

  const handleWishClick = () => {
    if (data.liked) {
      deleteWishMutation.mutate([Number(transactionFeedId)])
      return
    }
    addWishMutation.mutate(Number(transactionFeedId))
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
          {data.status.code !== 'ACTIVE' && (
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
                <div className="hidden items-end justify-end lg:flex">
                  <ReportStrokeIcon className="text-error" />
                  <Button text="신고하기" shape="underline" className="text-gray-700" />
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
                    <ReportStrokeIcon className="text-error" />
                    <Button
                      text="신고하기"
                      shape="underline"
                      className="text-fs14 sm:text-fs16 text-gray-700"
                    />
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
                  onClick={() => navigate(`/data-purchase/${data.transactionFeedId}`)}
                  text="구매하기"
                  className="bg-pri-500 text-gray-10 text-fs18 lg:text-fs20 flex-1 p-3.5 font-medium md:hidden"
                />
                <Button
                  onClick={() => navigate(`/data-purchase/${data.transactionFeedId}`)}
                  text="구매하기"
                  className="bg-pri-500 text-gray-10 text-fs18 lg:text-fs20 hidden w-auto p-5 font-medium md:block"
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
                <PostCardCol key={post.transactionFeedId} {...transformRecommendedPost(post)} />
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
                  <PostCardCol key={post.transactionFeedId} {...transformRecommendedPost(post)} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">관련 상품이 없습니다.</p>
            )}
          </div>
        </BottomSheet>
      )}
    </main>
  )
}

export default NormalDetailPage
