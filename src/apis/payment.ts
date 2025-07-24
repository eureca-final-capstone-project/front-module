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

export const postPreparePayment = async (payload: PreparePaymentRequest) => {
  const response = await client.post('/payment/prepare', payload)
  return response.data as PreparePaymentResponse
}
export const postConfirmPayment = async (payload: ConfirmPaymentRequest) => {
  const response = await client.post('/payment/confirm', payload)
  return response.data
}
