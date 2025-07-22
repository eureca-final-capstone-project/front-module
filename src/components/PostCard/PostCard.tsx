import PostCardCol from './PostCardCol'
import PostCardRow from './PostCardRow'
import type { TradeStatus } from '../../utils/status'

type CommonProps = {
  transactionFeedId: number
  telecomCompany: 'LG U+' | 'KT' | 'SKT'
  defaultImageNumber: number
  salesDataAmount: string
  title: string
  nickname: string
  createdAt?: string
  liked: boolean
  onToggleLike: () => void
  salesType: 'deal' | 'bid'
  salesPrice?: number
  initialPrice?: number
  currentHeightPrice?: number
  status: TradeStatus
  onClick?: () => void
}

export type PostCardProps =
  | ({
      type: 'row'
      imageWrapperClassName?: string
      favorite?: boolean // destop 관심 거래 페이지에서 거래 유형 보여줄 지 여부
      payhistory?: boolean // 거래 내역 페이지에서 사용되는 스타일 적용 여부
      payhistorytime?: string // 거래 완료 일시 (추후 변경 예정)
      payhistorypay?: number // 거래 완료 페이 (추후 변경 예정)
    } & CommonProps)
  | ({ type: 'col' } & CommonProps)

const PostCard = (props: PostCardProps) => {
  if (props.type === 'row') {
    return <PostCardRow {...props} />
  }
  return <PostCardCol {...props} />
}

export default PostCard
