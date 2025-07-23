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
    params: { page, size },
  })
  console.log('🔥 getDataCoupons 응답', response.data)
  return response.data.data
}
