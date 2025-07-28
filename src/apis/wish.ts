import client from './client'

export interface WishPost {
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

export interface WishListResponse {
  statusCode: number
  message: string
  data: {
    totalElements: number
    totalPages: number
    pageable: {
      paged: boolean
      pageNumber: number
      pageSize: number
      offset: number
      sort: Array<{
        direction: string
        nullHandling: string
        ascending: boolean
        property: string
        ignoreCase: boolean
      }>
      unpaged: boolean
    }
    size: number
    content: WishPost[]
    number: number
    sort: Array<{
      direction: string
      nullHandling: string
      ascending: boolean
      property: string
      ignoreCase: boolean
    }>
    numberOfElements: number
    first: boolean
    last: boolean
    empty: boolean
  }
}

interface GetWishListParams {
  filter: 'ALL' | 'NORMAL' | 'BID'
  page: number
  size: number
  sort?: string | string[]
}

export const getWishList = async (params: GetWishListParams): Promise<WishListResponse> => {
  const response = await client.get('/wish', { params })
  return response.data
}

export const addWishPost = async (transactionFeedId: number) => {
  const response = await client.post('/wish/wish', {
    transactionFeedId,
  })
  return response.data
}

export const deleteWishPosts = async (transactionFeedIds: number[]) => {
  const response = await client.delete('/wish/wish', {
    data: { transactionFeedIds },
  })
  return response.data
}
