import client from './client'

export interface EventCoupon {
  eventCouponId: number
  couponName: string
  couponDescription: string
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
