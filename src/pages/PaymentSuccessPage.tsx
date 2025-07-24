import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { postConfirmPayment } from '../apis/payment'

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')

  const confirmMutation = useMutation({
    mutationFn: postConfirmPayment,
    onSuccess: () => {
      console.log('----------------결제 승인 성공')
    },
    onError: error => {
      console.error('------------------결제 승인 실패', error)
    },
  })

  useEffect(() => {
    if (paymentKey && orderId && amount) {
      confirmMutation.mutate({
        paymentKey,
        orderId,
        amount: Number(amount),
      })
    }
  }, [paymentKey, orderId, amount])

  if (confirmMutation.isPending) {
    return <div>결제 승인 진행 중</div>
  }

  if (confirmMutation.isError) {
    return <div>결제 승인 중 오류가 발생했습니다</div>
  }

  return <div>결제 완료</div>
}

export default PaymentSuccessPage
