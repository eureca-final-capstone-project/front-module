import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postPreparePayment } from '../apis/payment'
import Card from '../components/Card/Card'

const PaymentPage = () => {
  const [amount, setAmount] = useState<number>(0)
  const [finalAmount, setFinalAmount] = useState<number>(0)

  useEffect(() => {
    setFinalAmount(amount)
  }, [amount])

  const preparePaymentMutation = useMutation({
    mutationFn: postPreparePayment,
    onSuccess: data => {
      const { orderId, finalAmount } = data.data

      const tossPayments = window.TossPayments('test_ck_oEjb0gm23PJaEDEkepgvrpGwBJn5')

      tossPayments
        .requestPayment('카드', {
          amount: finalAmount,
          orderId,
          orderName: `${finalAmount.toLocaleString()}원 충전`,
          successUrl: `${window.location.origin}/payment-success`,
          failUrl: `${window.location.origin}/payment-fail`,
        })
        .catch((error: unknown) => {
          if (error && typeof error === 'object' && 'code' in error) {
            const typedError = error as { code: string; message: string }
            console.error(`결제창 호출 실패 [${typedError.code}]`, typedError.message)
          } else {
            console.error('결제창 호출 실패 (알 수 없는 에러)', error)
          }
        })
    },
    onError: error => {
      console.error('결제 준비 API 호출 실패', error)
    },
  })

  const handlePayment = () => {
    if (amount <= 0) {
      alert('충전할 금액을 입력하세요.')
      return
    }

    preparePaymentMutation.mutate({
      // userEventCouponId: 0,
      originalAmount: amount,
      finalAmount: amount,
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <h2 className="mb-2 text-lg font-semibold">다차페이 충전</h2>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={amount === 0 ? '' : amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="가격을 입력해주세요."
            className="flex-1 rounded-md border px-3 py-2"
            min={0}
          />
          <span className="text-gray-500">원</span>
        </div>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-semibold">결제 예정 정보</h2>
        <div className="flex justify-between">
          <span>충전 금액</span>
          <span>{amount.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>할인 금액</span>
          <span>0원</span>
        </div>
        <div className="text-pri-600 mt-2 flex justify-between font-bold">
          <span>최종 결제 금액</span>
          <span>{finalAmount.toLocaleString()}원</span>
        </div>
      </Card>

      <button
        onClick={handlePayment}
        disabled={preparePaymentMutation.isPending || finalAmount <= 0}
        className="bg-pri-500 w-full rounded-md py-3 text-lg font-semibold text-white disabled:opacity-50"
      >
        {finalAmount.toLocaleString()}원 결제하기
      </button>
    </div>
  )
}

export default PaymentPage
