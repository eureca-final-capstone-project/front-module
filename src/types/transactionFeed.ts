// 판매글 상태
export type Statuses = 'ON_SALE' | 'EXPIRED' | 'COMPLETED'

// 정렬 옵션
export type SortBy = 'LATEST' | 'PRICE_HIGH' | 'PRICE_LOW'

// 검색 조건 (requestDto)
export interface FeedSearchRequestDto {
  keyword?: string
  telecomCompanyIds?: number[]
  salesTypeIds?: number[]
  statuses?: Statuses[]
  minPrice?: number
  maxPrice?: number
  minDataAmount?: number
  maxDataAmount?: number
  sortBy?: SortBy
  excludeFeedIds?: number[]
}

// 페이지네이션 정보 (pageable)
export interface Pageable {
  page: number
  size: number
  sort?: string[]
}

// 개별 판매글 아이템
export interface TransactionFeed {
  transactionFeedId: number
  title: string
  nickname: string
  salesPrice: number
  salesDataAmount: number
  defaultImageNumber: number
  createdAt: string
  liked: boolean
  telecomCompany: string
  status: Statuses
  salesType: 'NORMAL' | 'BID'
  currentHeightPrice: number | null
}

// 응답 타입
export interface TransactionFeedResponse {
  statusCode: number
  message: string
  data: {
    content: TransactionFeed[]
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    last: boolean
    empty: boolean
  }
}
