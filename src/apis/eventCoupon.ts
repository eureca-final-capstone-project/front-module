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
