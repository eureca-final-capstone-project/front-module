import PostCardCol from './PostCardCol'
import PostCardRow from './PostCardRow'
import type { TradeStatus } from '../../utils/status'
import { useNavigate } from 'react-router-dom'

type CommonProps = {
  transactionFeedId: number
  telecomCompany: 'LG U+' | 'KT' | 'SKT'
  defaultImageNumber: number
  salesDataAmount: number
  title: string
  nickname: string
  createdAt?: string
  liked: boolean
  onToggleLike: () => void
  salesType: 'normal' | 'bid'
  salesPrice?: number
  currentHeightPrice?: number
  status: TradeStatus
  onClick?: () => void
}

export type PostCardProps =
  | ({
      type: 'row'
      imageWrapperClassName?: string
      page?: 'default' | 'favorite' | 'tradehistory' // favorite - 관심 거래 | payhistory - 거래 내역
      tradehistorytime?: string // 거래 완료 일시 (추후 변경 예정)
      tradehistorypay?: number // 거래 완료 페이 (추후 변경 예정)
    } & CommonProps)
  | ({ type: 'col' } & CommonProps)

const PostCard = (props: PostCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (props.onClick) {
      props.onClick()
    } else {
      navigate(`/posts/${props.salesType}/${props.transactionFeedId}`)
    }
  }

  if (props.type === 'row') {
    return <PostCardRow {...props} onClick={handleClick} />
  }
  return <PostCardCol {...props} onClick={handleClick} />
}

export default PostCard
