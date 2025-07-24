import client from './client'

export interface PreparePaymentRequest {
  userEventCouponId?: number
  originalAmount: number
  finalAmount: number
}

export interface PreparePaymentResponse {
  statusCode: number
  message: string
  data: {
    orderId: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    requiredPayType: {
      payTypeId: number
      name: string
    }
  }
}
export interface ConfirmPaymentRequest {
  paymentKey: string
  orderId: string
  amount: number
}
export interface ConfirmPaymentResponse {
  statusCode: number
  message: string
  data: {
    orderId: string
    paymentMethod: string
    completedAt: string // ISO8601 timestamp
  }
}
export interface CalculateDiscountParams {
  userEventCouponId: number
  originalAmount: number
}

export interface CalculateDiscountResponse {
  statusCode: number
  message: string
  data: {
    originalAmount: number
    discountAmount: number
    finalAmount: number
    requiredPayType: {
      payTypeId: number
      name: string
    }
  }
}

export const postPreparePayment = async (payload: PreparePaymentRequest) => {
  const response = await client.post('/payment/prepare', payload)
  return response.data as PreparePaymentResponse
}
export const postConfirmPayment = async (
  payload: ConfirmPaymentRequest
): Promise<ConfirmPaymentResponse> => {
  const response = await client.post('/payment/confirm', payload)
  return response.data
}
export const postCalculateDiscount = async (
  params: CalculateDiscountParams
): Promise<CalculateDiscountResponse> => {
  const res = await client.post('/payment/event-coupon/calculate', params)
  return res.data
}
