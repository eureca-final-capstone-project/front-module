import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { postPreparePayment } from '../apis/payment'
import Card from '../components/Card/Card'
import { formatAmount } from '../utils/format'
// import DropDown from '../components/DropDown/DropDown'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
import Button from '../components/Button/Button'
import { getUserPayStatus } from '../apis/userInfo'
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
  const isDisabled = preparePaymentMutation.isPending || finalAmount <= 0

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

  const { data: userPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
  })

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex items-center justify-between font-medium">
          <span className="text-fs18 sm:text-fs20 text-gray-900">보유 다챠페이</span>
          <div className="flex gap-2">
            <DatchaCoin className="h-6 w-6" />
            <span className="text-fs18 sm:text-fs20 text-gray-900">
              {formatAmount(userPayStatus?.balance ?? 0)}
            </span>
          </div>
        </div>
      </Card>
      <Card type="label" labelTitle="다챠페이 충전">
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
      <Card type="label" labelTitle="쿠폰 적용">
        {/* <DropDown selected="적용 안 함" onSelect: (option: string) => void /> */}
      </Card>
      <Card type="label" labelTitle="결제 예정 정보">
        <div className="flex justify-between">
          <span className="text-fs16 text-gray-600">충전 금액</span>
          <span className="text-fs16 text-gray-800">{formatAmount(amount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-fs16 text-gray-600">할인 금액</span>
          <span className="text-fs16 text-gray-800">0원</span>
        </div>
        <hr className="border-t border-dashed border-gray-100" />
        <div className="text-fs20 flex items-center justify-between font-semibold">
          <span className="text-gray-800">최종 결제 금액</span>
          <span className="text-pri-600">{formatAmount(finalAmount)}</span>
        </div>
      </Card>

      <Button
        text={`${finalAmount.toLocaleString()}원 결제하기`}
        onClick={handlePayment}
        disabled={isDisabled}
        className={`text-fs20 w-full font-medium ${isDisabled ? 'button-disabled' : 'button-active'}`}
      />
    </div>
  )
}

export default PaymentPage
