import type { PostCardProps } from './PostCard'
import HeartIcon from '@/assets/icons/heart.svg?react'
import HeartFillIcon from '@/assets/icons/heart-fill.svg?react'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import DatchaCoinSecondaryIcon from '@/assets/icons/datcha-coin-secondary.svg?react'
import ProviderBadge from './ProviderBadge'
import DataBadge from '../Badge/Badge'
import { formatDataSize, formatAmount } from '../../utils/format'
import { imageData as PostImage } from '../../constants/imageData'

interface PostCardRowProps extends Omit<PostCardProps, 'type'> {
  type: 'row'
  page?: 'default' | 'favorite' | 'payhistory'
  payhistorytime?: string
  payhistorypay?: number
  imageWrapperClassName?: string
}

const PostCardRow = ({
  telecomCompany,
  defaultImageNumber,
  salesDataAmount,
  title,
  nickname,
  createdAt,
  liked,
  onToggleLike,
  salesType,
  salesPrice,
  currentHeightPrice,
  status,
  onClick,
  page = 'default',
  imageWrapperClassName,
  payhistorytime,
  payhistorypay,
}: PostCardRowProps) => {
  const renderImageSection = () => (
    // 이미지 영역
    <div
      className={`image-wrapper relative h-full w-full overflow-hidden rounded-md ${imageWrapperClassName ?? ''}`}
    >
      {/* 이미지 */}
      <img
        src={PostImage[defaultImageNumber]}
        alt={title}
        className={`h-full w-full object-cover transition-transform duration-300 ${
          status === 'active' ? 'group-hover:scale-105' : ''
        } `}
      />

      {/* 거래 상태 오버레이 */}
      {status !== 'active' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70">
          <span className="text-fs16 text-gray-10 font-semibold transition-transform duration-200 group-hover:scale-105">
            {status === 'completed' ? '거래 완료' : '기간 만료'}
          </span>
        </div>
      )}

      {/* 관심거래 아이콘 */}
      <div
        className="absolute top-2.75 left-2.75 z-10 w-4 sm:top-3.75 sm:left-3.75 sm:w-5"
        onClick={e => {
          e.stopPropagation()
          onToggleLike()
        }}
      >
        {liked ? (
          <HeartFillIcon className="h-full w-full" />
        ) : (
          <HeartIcon className="h-full w-full" />
        )}
      </div>

      {/* 통신사 뱃지 */}
      <div className="absolute right-0 bottom-0 h-auto w-[45%]">
        <ProviderBadge telecomCompany={telecomCompany} />
      </div>
    </div>
  )

  const renderContent = () => {
    switch (page) {
      case 'default':
        return (
          // 게시글 내용
          <div className="flex h-full min-w-0 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex min-w-0 items-center gap-1">
                <DataBadge label={formatDataSize(Number(salesDataAmount))} size="small" />
                <span className="truncate font-medium whitespace-nowrap" title={title}>
                  {title}
                </span>
              </div>
              <div className="text-fs12 sm:text-fs14 flex items-center gap-0.5 text-[#666666] sm:gap-1">
                <span>{nickname}</span>
                <span>·</span>
                <span>{createdAt}</span>
              </div>
            </div>
            {salesType === 'deal' ? (
              <div className="flex items-center justify-between">
                <span className="font-bold">거래 페이</span>
                <div className="flex items-center gap-1">
                  <DatchaCoinIcon className="h-5 w-5 md:hidden lg:block" />
                  <p className="text-pri-500 font-bold">{formatAmount(salesPrice ?? 0)}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-medium">
                    <span>등록 페이</span>
                    <div className="flex items-center gap-1">
                      <DatchaCoinSecondaryIcon className="h-5 w-5 md:hidden lg:block" />
                      <span className="text-pri-400">{formatAmount(salesPrice ?? 0)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">입찰 페이</span>
                    <div className="flex items-center gap-1">
                      <DatchaCoinIcon className="h-5 w-5 md:hidden lg:block" />
                      <span className="text-pri-500 font-bold">
                        {formatAmount(currentHeightPrice ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )

      case 'favorite':
        // 관심 거래 내용
        return (
          <div className="flex h-full min-w-0 flex-col justify-between">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1">
                <DataBadge label={formatDataSize(Number(salesDataAmount))} size="small" />
                <span className="lg:text-fs18 truncate font-medium whitespace-nowrap" title={title}>
                  {title}
                </span>
              </div>
              <div className="text-fs12 lg:text-fs14 flex items-center gap-0.5 text-[#666666] sm:gap-1">
                <span>{nickname}</span>
                <span>·</span>
                <span>{createdAt}</span>
              </div>
              <div className="text-fs12 lg:text-fs14 hidden gap-2 sm:flex">
                <span className="text-[#666666]">거래 유형</span>
                <span className="text-pri-400">
                  {salesType === 'bid' ? '입찰 거래' : '일반 거래'}
                </span>
              </div>
            </div>
            {salesType === 'deal' ? (
              <div className="lg:text-fs18 mt-auto flex w-full items-center justify-between">
                <span className="font-bold">거래 페이</span>
                <div className="flex items-center gap-1">
                  <DatchaCoinIcon className="h-5 w-5 md:hidden lg:block" />
                  <p className="text-pri-500 font-bold">{formatAmount(salesPrice ?? 0)}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-auto flex w-full flex-col gap-0.5 sm:gap-2">
                  <div className="lg:text-fs18 flex items-center justify-between font-medium">
                    <span>등록 페이</span>
                    <div className="flex items-center gap-1">
                      <DatchaCoinSecondaryIcon className="h-5 w-5 md:hidden lg:block" />
                      <span className="text-pri-400">{formatAmount(salesPrice ?? 0)}</span>
                    </div>
                  </div>
                  <div className="lg:text-fs18 flex items-center justify-between">
                    <span className="font-bold">입찰 페이</span>
                    <div className="flex items-center gap-1">
                      <DatchaCoinIcon className="h-5 w-5 md:hidden lg:block" />
                      <span className="text-pri-500 font-bold">
                        {formatAmount(currentHeightPrice ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )

      case 'payhistory':
        return (
          // 거래 내역 내용
          <div className="flex h-full min-w-0 flex-col justify-between">
            <div className="flex flex-col gap-0 sm:gap-1.5 lg:gap-3">
              <div className="flex items-center gap-1">
                <DataBadge label={formatDataSize(Number(salesDataAmount))} size="small" />
                <span className="lg:text-fs18 truncate font-medium whitespace-nowrap" title={title}>
                  {title}
                </span>
              </div>
              <div className="text-fs12 lg:text-fs14 hidden sm:flex">
                <span className="text-pri-400 font-semibold">{nickname}</span>와 거래했어요!
              </div>
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="text-fs12 lg:text-fs14 flex gap-1 sm:gap-2">
                <span className="text-[#666666]">거래 유형</span>
                <span className="text-pri-400">
                  {salesType === 'bid' ? '입찰 거래' : '일반 거래'}
                </span>
              </div>
              <div className="text-fs12 lg:text-fs14 flex gap-1 sm:gap-2">
                <span className="text-[#666666]">거래 일시</span>
                <span className="text-pri-400">{payhistorytime}</span>
              </div>
            </div>
            <div className="lg:text-fs18 flex w-full items-center justify-end gap-1">
              <DatchaCoinIcon className="h-5 w-5" />
              <span className="text-pri-500 font-bold">{formatAmount(payhistorypay ?? 0)}</span>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      onClick={onClick}
      className={`${page}-container group flex h-full w-full min-w-0 cursor-pointer gap-2 bg-transparent lg:gap-5`}
    >
      <div className="aspect-square w-28 shrink-0 sm:w-32 lg:w-40">{renderImageSection()}</div>
      <div className="flex h-full min-w-0 flex-1 flex-col justify-between">{renderContent()}</div>
    </div>
  )
}

export default PostCardRow
