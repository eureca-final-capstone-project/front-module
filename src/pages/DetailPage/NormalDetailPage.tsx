import { imageData as PostImage } from '../../constants/imageData'
import ProviderBadge from '../../components/PostCard/ProviderBadge'
import DataBadge from '../../components/Badge/Badge'
import { formatAmount, formatDataSize } from '../../utils/format'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import Button from '../../components/Button/Button'
import ReportStrokeIcon from '@/assets/icons/report-stroke.svg?react'
import UesrIcon from '@/assets/icons/user.svg?react'
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

const NormalDetailPage = () => {
  const { transactionFeedId } = useParams<{ transactionFeedId: string }>()
  const navigate = useNavigate()

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
  if (isLoading) return <p>로딩 중</p>
  if (isError || !data) return <p>에러</p>

  return (
    <div className="flex flex-col gap-15">
      <div className="flex gap-7">
        {/* 이미지 */}
        <div className="relative h-full w-full max-w-75 overflow-hidden rounded-md">
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
          <div className="absolute right-0 bottom-0 h-auto w-[45%]">
            <ProviderBadge telecomCompany={data.telecomCompany.name} />
          </div>
        </div>

        {/* 내용 */}
        <div className="flex w-full max-w-164 min-w-100 flex-col justify-between gap-4 px-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <DataBadge
                label={formatDataSize(data.salesDataAmount)}
                className="text-fs18 text-gray-10 px-3.5 py-2.5 font-medium"
              />
              <span className="text-fs28">{data.title}</span>
            </div>
            <div className="text-fs20 mb-5 flex items-center gap-3 text-gray-800">
              <div className="flex items-center gap-2">
                <UesrIcon className="text-pri-300" />
                <span>{data.nickname}</span>
              </div>
              <div className="flex items-center gap-2">
                <TimeIcon />
                <span>{formatRelativeTime(data.createdAt)}</span>
              </div>
            </div>
            <p className="text-fs20 text-gray-800">{data.content}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-fs28 flex items-center justify-between font-bold">
              <span>거래 페이</span>
              <div className="flex items-center gap-1">
                <DatchaCoinIcon className="w-8.25 md:hidden lg:block" />
                <p className="text-pri-500 font-bold">{formatAmount(data.salesPrice)}</p>
              </div>
            </div>

            <div className="bg-pri-100 p-1 text-center">
              {data.priceCompare === 'NO_STATISTIC' ? (
                '현재 시간대 시세 정보가 부족해 비교가 어려워요'
              ) : (
                <>
                  현재 시세 대비 약 <span className="font-semibold">{data.rate.toFixed(1)}</span>%{' '}
                  {data.priceCompare === 'CHEAPER'
                    ? '저렴해요!'
                    : data.priceCompare === 'EXPENSIVE'
                      ? '비싸요!'
                      : '동일해요!'}
                </>
              )}
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col justify-between">
          <div className="mt-6 flex items-end justify-end gap-1">
            <ReportStrokeIcon className="text-error" />
            <Button text="신고하기" shape="underline" className="text-gray-700" />
          </div>
          <div className="flex w-67 flex-col gap-4">
            <Button
              text={`관심 거래 ${data.likedCount}`}
              className="bg-gray-10 text-pri-500 border-pri-500 text-fs20 border-2 p-5 font-medium"
            />
            <Button
              onClick={() => navigate(`/data-purchase/${data.transactionFeedId}`)}
              text="구매하기"
              className="bg-pri-500 text-gray-10 text-fs20 p-5 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 관련 상품 */}
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
    </div>
  )
}

export default NormalDetailPage
