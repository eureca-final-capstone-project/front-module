import client from './client'

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
