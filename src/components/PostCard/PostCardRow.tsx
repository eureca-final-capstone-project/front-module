import type { PostCardProps } from './PostCard'
import HeartIcon from '@/assets/icons/heart.svg?react'
import HeartFillIcon from '@/assets/icons/heart-fill.svg?react'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import DatchaCoinSecondaryIcon from '@/assets/icons/datcha-coin-secondary.svg?react'
import ProviderBadge from './ProviderBadge'
import DataBadge from '../Badge/Badge'
import { formatDataSize, formatAmount } from '../../utils/format'
import { useDeviceType } from '../../hooks/useDeviceType'
import { imageData as PostImage } from '../../constants/imageData'

interface PostCardRowProps extends Omit<PostCardProps, 'type'> {
  type: 'row'
  favorite?: boolean
  payhistory?: boolean
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
  initialPrice,
  currentHeightPrice,
  status,
  onClick,
  imageWrapperClassName,
  favorite = false,
  payhistory = false,
  payhistorytime,
  payhistorypay,
}: PostCardRowProps) => {
  const deviceType = useDeviceType()

  const titleFontClass =
    favorite || payhistory ? (['mobile', 'tablet'].includes(deviceType) ? '' : 'text-fs20') : ''

  const contentGap = favorite
    ? ['mobile', 'tablet'].includes(deviceType)
      ? 'gap-2'
      : 'gap-3'
    : ['mobile', 'tablet'].includes(deviceType)
      ? 'gap-2'
      : 'gap-4'

  return (
    <div
      onClick={onClick}
      className={`group flex w-full cursor-pointer flex-row items-stretch bg-transparent ${(favorite || payhistory) && deviceType === 'desktop' ? 'gap-5' : 'gap-2'}`}
    >
      {/* 이미지 영역 */}
      <div
        className={`relative aspect-square overflow-hidden rounded-md ${imageWrapperClassName ?? 'w-1/3'}`}
      >
        <img
          src={PostImage[defaultImageNumber]}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-300 ${
            status === 'active' ? 'group-hover:scale-105' : ''
          }`}
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
          className={`absolute z-10 ${
            imageWrapperClassName
              ? 'top-2.75 left-2.75 w-4'
              : deviceType === 'desktop'
                ? 'top-3.75 left-3.75 w-5'
                : 'top-2.75 left-2.75 w-4'
          }`}
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

      {/* 내용 영역 */}
      <div
        className={`flex min-w-0 flex-1 flex-col items-stretch justify-between py-1 ${contentGap}`}
      >
        {/* 거래내역 페이지 && 데스크탑 */}
        {payhistory && deviceType === 'desktop' ? (
          <div className="space-y-4">
            {/* 데이터 양 + 제목 / 거래한 사용자 닉네임 */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-1">
                <DataBadge label={formatDataSize(Number(salesDataAmount))} />
                <span className="text-fs20 truncate whitespace-nowrap" title={title}>
                  {title}
                </span>
              </div>
              <div>
                <span className="text-pri-400 font-semibold">{nickname}</span>와 거래했어요!
              </div>
            </div>

            {/* 거래유형 + 거래일시 */}
            <div className="text-fs16 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-gray-600">거래 유형</p>
                <span className="text-pri-400">
                  {salesType === 'deal' ? '일반 거래' : '입찰 거래'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">거래 일시</p>
                <span className="text-pri-400">{payhistorytime}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Default */}
            {!favorite && !payhistory ? (
              <div className="flex flex-col gap-2">
                {/* 데이터 양 + 제목 */}
                <div className="flex items-center gap-1">
                  <DataBadge label={formatDataSize(Number(salesDataAmount))} size="small" />
                  <span className="truncate whitespace-nowrap" title={title}>
                    {title}
                  </span>
                </div>

                {/* 닉네임 + 게시글 작성 time */}
                <div className="text-fs12 flex items-center gap-1 text-[#666666]">
                  <p>{nickname}</p>
                  {createdAt && (
                    <>
                      <p>·</p>
                      <p>{createdAt}</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* 데이터 양 + 제목 */}
                <div className="flex items-center gap-1">
                  <DataBadge
                    label={formatDataSize(Number(salesDataAmount))}
                    size={
                      favorite || payhistory
                        ? ['mobile', 'tablet'].includes(deviceType)
                          ? 'small'
                          : undefined
                        : 'small'
                    }
                  />
                  <span className={`truncate whitespace-nowrap ${titleFontClass}`} title={title}>
                    {title}
                  </span>
                </div>

                {/* 거래한 사용자 닉네임 */}
                {payhistory ? (
                  deviceType === 'desktop' && (
                    <div className="flex">
                      <p className="text-pri-400 font-semibold">{nickname}</p>와 거래했어요!
                    </div>
                  )
                ) : (
                  <div
                    className={`flex items-center gap-1 text-[#666666] ${
                      favorite
                        ? ['mobile', 'tablet'].includes(deviceType)
                          ? 'text-fs12'
                          : 'text-fs16'
                        : 'text-fs12'
                    }`}
                  >
                    <p>{nickname}</p>
                    {createdAt && (
                      <>
                        <p>·</p>
                        <p>{createdAt}</p>
                      </>
                    )}
                  </div>
                )}
              </>
            )}

            {/* 거래유형 + 일시 */}
            {(favorite || payhistory) && (
              <div
                className={`flex ${
                  ['mobile', 'tablet'].includes(deviceType) ? 'text-fs12' : 'text-fs16'
                } ${payhistory ? 'flex-col gap-1' : 'items-center gap-2'}`}
              >
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">거래 유형</p>
                  <span className="text-pri-400">
                    {salesType === 'deal' ? '일반 거래' : '입찰 거래'}
                  </span>
                </div>

                {payhistory && (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">거래 일시</p>
                    <span className="text-pri-400">{payhistorytime}</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* 페이 정보 */}
        {payhistory ? (
          <div className="flex items-center justify-end gap-1">
            <DatchaCoinIcon className="h-5 w-5" />
            <span
              className={`text-pri-600 font-medium ${['mobile', 'tablet'].includes(deviceType) ? '' : 'text-fs20'}`}
            >
              {formatAmount(payhistorypay ?? 0)}
            </span>
          </div>
        ) : salesType === 'deal' ? (
          <div className="flex items-center justify-between">
            <p className={`font-bold ${titleFontClass}`}>거래 페이</p>
            <div className="flex items-center gap-1">
              <DatchaCoinIcon className="h-5 w-5" />
              <span
                className={`text-pri-500 font-bold ${favorite ? (['mobile', 'tablet'].includes(deviceType) ? '' : 'text-fs20') : ''}`}
              >
                {formatAmount(salesPrice ?? 0)}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className={`${titleFontClass}`}>최초 등록 페이</p>
              <div className="flex items-center gap-1">
                <DatchaCoinSecondaryIcon className="h-5 w-5" />
                <span className={`text-pri-400 font-medium ${titleFontClass}`}>
                  {formatAmount(initialPrice ?? 0)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className={`font-bold ${titleFontClass}`}>입찰 페이</p>
              <div className="flex items-center gap-1">
                <DatchaCoinIcon className="h-5 w-5" />
                <span className={`text-pri-500 font-bold ${titleFontClass}`}>
                  {formatAmount(currentHeightPrice ?? 0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCardRow
