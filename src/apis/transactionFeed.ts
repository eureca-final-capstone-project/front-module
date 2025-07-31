import client from './client'
import { ServerPostCard } from '../utils/postCardParse'
import { PostTransactionPayloadType, UpdateTransactionPayloadType } from '../types/transactionFeed'

// 정렬 기준
export type SortBy = 'LATEST' | 'PRICE_HIGH' | 'PRICE_LOW'

// 거래 상태
export type Statuses = 'ON_SALE' | 'EXPIRED' | 'COMPLETED'

// 요청 DTO
export interface FeedSearchRequestDto {
  keyword?: string
  telecomCompanyIds?: number[]
  salesTypeIds?: number[]
  statuses?: Statuses[]
  minPrice?: number
  maxPrice?: number
  minDataAmount?: number
  maxDataAmount?: number
  sortBy: SortBy
  excludeFeedIds?: number[]
}

// 페이지네이션 정보
export interface Pageable {
  page: number
  size: number
  sort?: string[]
}

// 서버 응답 전체 구조
export interface TransactionFeedResponse {
  content: ServerPostCard[]
  totalPages: number
  totalElements: number
  number: number
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

// API 요청 함수
export const getTransactionFeeds = async (
  requestDto: FeedSearchRequestDto,
  pageable: Pageable
): Promise<TransactionFeedResponse> => {
  const safeParams = {
    ...requestDto,
    ...pageable,
  }

  // undefined 또는 빈 배열 제거
  Object.keys(safeParams).forEach(key => {
    const value = safeParams[key as keyof typeof safeParams]
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      delete safeParams[key as keyof typeof safeParams]
    }
  })

  const response = await client.get('/transaction-feed/search', {
    params: safeParams,
    paramsSerializer: {
      indexes: null, // 배열 쿼리스트링에서 [] 제거
    },
  })
  return response.data.data
}

export const postTransactionFeed = async (data: PostTransactionPayloadType) => {
  const response = await client.post('/transaction-feed', data)
  return response.data
}

export const updateTransactionFeed = async (data: UpdateTransactionPayloadType) => {
  const response = await client.put('/transaction-feed', data)
  return response.data
}
