import client from './client'

export interface TransactionFeedDetailResponse {
  transactionFeedId: number
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
