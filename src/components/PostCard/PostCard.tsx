import PostCardCol from './PostCardCol'
import PostCardRow from './PostCardRow'
import type { TradeStatus } from '../../utils/status'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/useToast'
import { useWishMutation } from '../../hooks/useWishMutation'
import { useQuery } from '@tanstack/react-query'
import { getTokenParsed } from '../../apis/tokenParsed'

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
  const { showToast } = useToast()
  const { addWishMutation, deleteWishMutation } = useWishMutation(props.transactionFeedId)

  const { data: userInfo } = useQuery({
    queryKey: ['tokenParsed'],
    queryFn: getTokenParsed,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!sessionStorage.getItem('userAccessToken'),
  })

  const isLoggedIn = !!userInfo

  const handleClick = () => {
    if (props.onClick) {
      props.onClick()
    } else {
      navigate(`/posts/${props.salesType}/${props.transactionFeedId}`)
    }
  }

  const handleToggleLike = () => {
    if (!isLoggedIn) {
      showToast({ type: 'default', msg: '로그인이 필요한 기능입니다.' })
      navigate('/login')
      return
    }

    if (props.liked) {
      deleteWishMutation.mutate([Number(props.transactionFeedId)])
    } else {
      addWishMutation.mutate(props.transactionFeedId)
    }
  }

  if (props.type === 'row') {
    const rowProps = {
      ...props,
      onClick: handleClick,
      onToggleLike: handleToggleLike,
    } as Extract<PostCardProps, { type: 'row' }>
    return <PostCardRow {...rowProps} />
  }

  const colProps = {
    ...props,
    onClick: handleClick,
    onToggleLike: handleToggleLike,
  } as Extract<PostCardProps, { type: 'col' }>
  return <PostCardCol {...colProps} />
}

export default PostCard
