import { TransactionHistoryItem } from '../apis/userInfo'
import type { PostCardProps } from '../components/PostCard/PostCard'
import { mapSalesTypeFromServer } from './salesType'
import { mapStatusFromServer } from './status'

export type ServerPostCard = {
  transactionFeedId: number
  title: string
  nickname: string
  salesPrice: number
  salesDataAmount: number
  defaultImageNumber: number
  createdAt: string
  liked: boolean
  telecomCompany: string
  status: string
  salesType: string
  currentHeightPrice: number | null
}

export const transformPostCard = (
  data: ServerPostCard,
  type: 'row' | 'col' = 'row'
): PostCardProps => ({
  type,
  transactionFeedId: data.transactionFeedId,
  title: data.title,
  nickname: data.nickname,
  salesPrice: data.salesPrice,
  salesDataAmount: data.salesDataAmount,
  defaultImageNumber: data.defaultImageNumber,
  createdAt: data.createdAt,
  liked: data.liked,
  telecomCompany: data.telecomCompany as 'LG U+' | 'KT' | 'SKT',
  status: mapStatusFromServer(data.status),
  salesType: mapSalesTypeFromServer(data.salesType),
  currentHeightPrice: data.currentHeightPrice ?? undefined,
  onToggleLike: () => {},
})
export const transformTransactionPostCard = (
  data: TransactionHistoryItem,
  type: 'row' | 'col' = 'row'
): PostCardProps => ({
  type,
  transactionFeedId: data.transactionFeedId,
  title: data.title,
  nickname: data.otherPartyNickname,
  salesPrice: data.salesPrice,
  salesDataAmount: data.salesDataAmount,
  defaultImageNumber: data.defaultImageNumber,
  createdAt: data.transactionDate,
  liked: false,
  telecomCompany: data.telecomCompany as 'LG U+' | 'KT' | 'SKT',
  status: mapStatusFromServer(data.transactionType), // PURCHASE | SALE → 'donePurchase' | 'doneSale' 등으로 매핑 필요
  salesType: mapSalesTypeFromServer(data.salesType),
  currentHeightPrice: undefined,
  onToggleLike: () => {},
  tradehistorytime: new Date(data.transactionDate).toLocaleString('ko-KR'),
  tradehistorypay: data.transactionFinalPrice,
})
