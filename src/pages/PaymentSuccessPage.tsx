import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { postConfirmPayment, ConfirmPaymentResponse } from '../apis/payment'
import axios from 'axios'

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')

  const [paymentInfo, setPaymentInfo] = useState<ConfirmPaymentResponse['data'] | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')

  const confirmMutation = useMutation({
    mutationFn: postConfirmPayment,
  })

  // StrictMode 대응용: mutate() 1회만 실행되도록 보장
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (!paymentKey || !orderId || !amount || hasRunRef.current) return
    hasRunRef.current = true // 다음 useEffect 실행 시 mutate 중복 방지

    const confirm = async () => {
      try {
        setStatus('loading')
        const data = await confirmMutation.mutateAsync({
          paymentKey,
          orderId,
          amount: Number(amount),
        })
        console.log('------------결제 성공:', data)
        setPaymentInfo(data.data)
        setStatus('success')
      } catch (error) {
        console.error('----------------결제 실패', error)
        if (axios.isAxiosError(error)) {
          console.error('에러 응답 코드:', error.response?.status)
          console.error('에러 응답 본문:', error.response?.data)
        }
        setStatus('error')
      }
    }

    confirm()
  }, [paymentKey, orderId, amount])

  if (status === 'loading') {
    return <div>결제 승인 진행 중</div>
  }

  if (status === 'error') {
    return <div>결제 승인 중 오류 발생</div>
  }

  if (status === 'success' && paymentInfo) {
    return (
      <div>
        <h2>결제 성공</h2>
        <p>
          <strong>주문 ID:</strong> {paymentInfo.orderId}
        </p>
        <p>
          <strong>결제 수단:</strong> {paymentInfo.paymentMethod}
        </p>
        <p>
          <strong>결제 시간:</strong>
          {paymentInfo.completedAt
            ? new Date(paymentInfo.completedAt).toLocaleString()
            : '정보 없음'}
        </p>
      </div>
    )
  }

  return <div>결제 정보를 불러오는 중</div>
}

export default PaymentSuccessPage
