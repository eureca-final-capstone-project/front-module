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

const PostCardCol = ({
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
}: PostCardProps) => {
  const deviceType = useDeviceType()

  return (
    <div
      onClick={onClick}
      className={`group flex w-full cursor-pointer flex-col bg-transparent ${deviceType === 'mobile' ? 'gap-3' : 'gap-6'}`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
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
          className={`absolute z-10 ${deviceType === 'mobile' ? 'top-2.75 left-2.75 w-4' : 'top-3.75 left-3.75 w-5'}`}
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

      <div className={`${deviceType === 'mobile' ? 'space-y-1' : 'space-y-2'}`}>
        {/* 판매 데이터 + 제목 */}
        <div className="flex items-center gap-1">
          <DataBadge label={formatDataSize(salesDataAmount)} size="small" />
          <span className="truncate whitespace-nowrap" title={title}>
            {title}
          </span>
        </div>

        {/* 닉네임 + 올린 시간 */}
        <div
          className={`text-fs12 sm:text-fs14 flex items-center text-[#666666] ${deviceType === 'mobile' ? 'gap-0.5' : 'gap-1'}`}
        >
          <p>{nickname}</p>
          {createdAt && (
            <>
              <p>·</p>
              <p>{createdAt}</p>
            </>
          )}
        </div>

        {/* 판매 페이 */}
        {salesType === 'normal' ? (
          <div className="flex items-center justify-between">
            <span className="font-bold">거래 페이</span>
            <div className="flex items-center gap-1">
              <DatchaCoinIcon className="h-5 w-5" />
              <p className="text-pri-500 font-bold">{formatAmount(salesPrice ?? 0)}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>등록 페이</span>
              <div className="flex items-center gap-1">
                <DatchaCoinSecondaryIcon className="h-5 w-5" />
                <span className="text-pri-400 font-medium">{formatAmount(salesPrice ?? 0)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold">입찰 페이</span>
              <div className="flex items-center gap-1">
                <DatchaCoinIcon className="h-5 w-5" />
                <span className="text-pri-500 font-bold">
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

export default PostCardCol
