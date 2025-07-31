import client from './client'
import { BID_ERROR_MESSAGES } from '../constants/bidErrorMessage'

export interface TransactionFeedDetailResponse {
  transactionFeedId: number
  sellerId: number
  title: string
  content: string
  salesDataAmount: number
  salesPrice: number
  defaultImageNumber: number
  createdAt: string
  nickname: string
  liked: boolean
  likedCount: number
  telecomCompany: {
    telecomCompanyId: number
    name: 'LG U+' | 'KT' | 'SKT'
  }
  status: {
    statusId: number
    code: string
  }
  salesType: {
    salesTypeId: number
    name: '일반 판매' | '입찰 판매'
  }
  expiredAt: string
  currentHeightPrice?: number
  rate: number
  priceCompare: 'NO_STATISTIC' | 'EXPENSIVE' | 'CHEAPER' | 'SAME'
}
export interface RecommendedPostCard {
  transactionFeedId: number
  title: string
  nickname: string
  salesPrice: number
  salesDataAmount: number
  defaultImageNumber: number
  createdAt: string
  liked: boolean
  telecomCompany: 'LG U+' | 'KT' | 'SKT'
  status: 'active' | 'completed' | 'expired'
  salesType: 'normal' | 'bid'
  currentHeightPrice: number
}
export interface Bids {
  bidId: number
  bidderNickname: string
  bidAmount: number
  bidAt: string
}

export interface BidRequest {
  transactionFeedId: number
  bidAmount: number
}

export const getTransactionFeedDetail = async (
  transactionFeedId: number
): Promise<TransactionFeedDetailResponse> => {
  const res = await client.get(`/transaction-feed/${transactionFeedId}`)
  return res.data.data
}

export const postPurchaseFeed = async (transactionFeedId: number) => {
  const res = await client.post('/data-feed/purchase', { transactionFeedId })
  const { statusCode, data } = res.data

  if (statusCode !== 200) {
    const code = data?.statusCode
    const detailMessage = data?.detailMessage || '데이터 구매 실패'

    const error = new Error(detailMessage) as Error & {
      code?: number
      name: string
    }

    error.code = code
    error.name = 'PurchaseError'

    throw error
  }

  return data
}
export const getRecommendedPosts = async (
  transactionFeedId: number
): Promise<RecommendedPostCard[]> => {
  const res = await client.get(`/recommend/related/${transactionFeedId}`)
  return res.data.data
}

export const getBidHistory = async (transactionFeedId: number): Promise<Bids[]> => {
  const res = await client.get(`/bid/${transactionFeedId}`)
  return res.data.data.bids
}

export const postBid = async (transactionFeedId: number, bidAmount: number): Promise<void> => {
  const res = await client.post('/bid', {
    transactionFeedId,
    bidAmount,
  })

  const { statusCode, data } = res.data

  if (statusCode !== 200) {
    const code = data?.statusCode
    const errorMessage = BID_ERROR_MESSAGES[code] || '입찰에 실패했습니다.'

    const error = new Error(errorMessage) as Error & {
      code?: number
      name: string
    }

    error.code = code
    error.name = 'BidError'

    throw error
  }

  return data
}

export const deleteTransactionFeed = async (transactionFeedId: number): Promise<void> => {
  await client.delete(`/transaction-feed/${transactionFeedId}`)
}
