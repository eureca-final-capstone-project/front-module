import client from './client'

export interface DataCoupon {
  userDataCouponId: number
  couponNumber: string
  dataAmount: number
  telecomCompany: {
    telecomCompanyId: number
    name: string
  }
  status: {
    statusId: number
    code: string
  }
  expiresAt: string
}

export interface DataCouponResponse {
  content: DataCoupon[]
  totalPages: number
  totalElements: number
  number: number
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

export const getDataCoupons = async (
  page: number = 0,
  size: number = 10
): Promise<DataCouponResponse> => {
  const response = await client.get('/data-coupon', {
    params: {
      page,
      size,
      sort: 'expiresAt,ASC&sort=dataAmount,DESC',
    },
  })
  return response.data.data
}

// 데이터 충전권 -> 구매 데이터로 전환
export const postUseDataCoupon = async (userDataCouponId: number) => {
  const response = await client.post(`/data-coupon/${userDataCouponId}/use`)
  return response.data
}
