import PostCardCol from './PostCardCol'
import PostCardRow from './PostCardRow'

type TradeStatus = 'active' | 'completed' | 'expired'

type CommonProps = {
  id: number
  provider: 'LG U+' | 'KT' | 'SKT'
  imageUrl: string
  data: string
  title: string
  nickname: string
  timestamp?: string
  isLiked: boolean
  onToggleLike: () => void
  saleType: 'deal' | 'bid'
  price?: number
  initialPrice?: number
  bidPrice?: number
  status: TradeStatus
  onClick?: () => void
}

export type PostCardProps =
  | ({
      type: 'row'
      imageWrapperClassName?: string
      favorite?: boolean
      payhistory?: boolean
      payhistorytime?: string
      payhistorypay?: number
    } & CommonProps)
  | ({ type: 'col' } & CommonProps)

const PostCard = (props: PostCardProps) => {
  if (props.type === 'row') {
    return <PostCardRow {...props} />
  }
  return <PostCardCol {...props} />
}

export default PostCard
