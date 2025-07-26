import client from './client'

export interface EventCoupon {
  eventCouponId: number
  couponNumber: string
  couponName: string
  discountRate: number
  payType: {
    payTypeId: number
    name: string
  }
}
export interface UserEventCoupon {
  userEventCouponId: number
  expiresAt: string
  status: {
    statusId: number
    code: string
  }
  eventCoupon: EventCoupon
}

export interface UserEventCouponResponse {
  statusCode: number
  message: string
  data: {
    coupons: UserEventCoupon[]
  }
}

export const getUserEventCoupons = async (): Promise<UserEventCouponResponse> => {
  const res = await client.get('/user-event-coupon/available')
  return res.data
}

// 목데이터용
export type eventCouponItem = {
  userEventCouponId: number
  expiresAt: string
  status: {
    statusId: number
    code: string
  }
  eventCoupon: {
    eventCouponId: number
    couponNumber: string
    couponName: string
    discountRate: number
    payType: {
      payTypeId: number
      name: string
    }
  }
}

export const getEventCoupons = async (): Promise<eventCouponItem[]> => {
  const response = await client.get('/orchestrator/user-event-coupon/available')
  console.log('📦 getEventCoupons response:', response.data)

  return response.data.data.coupons
}

export interface IssueEventCouponResponse {
  statusCode: number
  message: string
  data: {
    id: number
  }
}

export interface ErrorResponseData {
  statusCode: number
  message: string
  data: {
    statusCode: number
    statusCodeName: string
    detailMessage: string
  }
}

export const issueEventCoupon = async (couponId: number): Promise<IssueEventCouponResponse> => {
  const response = await client.post(`/user-event-coupon/${couponId}/issue`)
  const { statusCode, data } = response.data

  if (statusCode !== 200) {
    const code = data?.statusCode
    const detailMessage = data?.detailMessage

    const error = new Error(detailMessage) as Error & {
      code?: number
      name: string
    }

    error.code = code
    error.name = 'IssueEventCouponError'

    throw error
  }

  return response.data
}
