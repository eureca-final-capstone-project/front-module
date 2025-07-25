export {}

declare global {
  interface Window {
    TossPayments: (clientKey: string) => TossPaymentsInstance
  }

  interface TossPaymentsInstance {
    requestPayment: (
      method: string,
      params: {
        amount: number
        orderId: string
        orderName: string
        successUrl: string
        failUrl: string
      }
    ) => Promise<void>
  }
}
