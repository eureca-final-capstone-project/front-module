import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { postCalculateDiscount, postPreparePayment } from '../apis/payment'
import { getUserPayStatus } from '../apis/userInfo'
import { getUserEventCoupons, UserEventCoupon } from '../apis/eventCoupon'
import Card from '../components/Card/Card'
import DropDown from '../components/DropDown/DropDown'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
import { formatAmount } from '../utils/format'
import Input from '../components/Input/Input'
import FloatActionButton from '../components/FloatActionButton'

const PaymentPage = () => {
  const [amount, setAmount] = useState<number>(0)
  const [finalAmount, setFinalAmount] = useState<number>(0)
  const [discountAmount, setDiscountAmount] = useState<number>(0)
  const [selectedCouponName, setSelectedCouponName] = useState('적용 안 함')
  const [selectedCoupon, setSelectedCoupon] = useState<UserEventCoupon | null>(null)

  const getCouponLabel = (coupon: UserEventCoupon) => `${coupon.eventCoupon.couponName}`

  const handleCouponSelect = (selectedName: string) => {
    setSelectedCouponName(selectedName)

    if (selectedName === '적용 안 함') {
      setSelectedCoupon(null)
      setDiscountAmount(0)
      setFinalAmount(amount)
      return
    }

    const matched = eventCouponData?.data.coupons.find(
      coupon => getCouponLabel(coupon) === selectedName
    )

    if (matched) {
      setSelectedCoupon(matched)
      calculateDiscountMutation.mutate({
        userEventCouponId: matched.userEventCouponId,
        originalAmount: amount,
      })
    }
  }

  const getPayMethod = (coupon: UserEventCoupon | null): string => {
    const name = coupon?.eventCoupon.payType.name?.trim()
    return !name || name === '전체' ? '카드' : name
  }

  const handlePayment = () => {
    if (amount <= 0) {
      alert('충전할 금액을 입력하세요.')
      return
    }

    preparePaymentMutation.mutate({
      originalAmount: amount,
      finalAmount,
      userEventCouponId: selectedCoupon?.userEventCouponId,
    })
  }

  const preparePaymentMutation = useMutation({
    mutationFn: postPreparePayment,
    onSuccess: data => {
      const { orderId, finalAmount } = data.data

      // 쿠폰 선택 시 해당 결제수단, 없으면 '카드' 사용
      const payMethod = getPayMethod(selectedCoupon)
      const tossPayments = window.TossPayments('test_ck_oEjb0gm23PJaEDEkepgvrpGwBJn5')

      tossPayments
        .requestPayment(payMethod, {
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

  const isDisabled = preparePaymentMutation.isPending || amount < 1000

  const calculateDiscountMutation = useMutation({
    mutationFn: postCalculateDiscount,
    onSuccess: data => {
      const { discountAmount, finalAmount } = data.data
      setDiscountAmount(discountAmount)
      setFinalAmount(finalAmount)
    },
    onError: error => {
      console.error('할인 금액 계산 실패', error)
      setDiscountAmount(0)
      setFinalAmount(amount)
    },
  })

  useEffect(() => {
    if (!selectedCoupon) {
      setFinalAmount(amount)
      setDiscountAmount(0)
      return
    }

    calculateDiscountMutation.mutate({
      userEventCouponId: selectedCoupon.userEventCouponId,
      originalAmount: amount,
    })
  }, [amount, selectedCoupon])

  const { data: userPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
  })

  const {
    data: eventCouponData,
    isLoading: isCouponLoading,
    isError: isCouponError,
  } = useQuery({
    queryKey: ['userEventCoupons'],
    queryFn: getUserEventCoupons,
  })

  const couponOptions = ['적용 안 함', ...(eventCouponData?.data.coupons.map(getCouponLabel) ?? [])]

  return (
    <div className={`flex flex-col px-4 sm:justify-between sm:px-0 ${amount > 0 ? 'pb-20' : ''}`}>
      <div className="flex flex-col gap-4">
        <Card withMotion motionCustom={0}>
          <div className="flex items-center justify-between font-medium">
            <span className="text-fs18 sm:text-fs20 text-gray-900">보유 다챠페이</span>
            <div className="flex gap-1 sm:gap-2">
              <DatchaCoin className="h-6 w-6" />
              <span className="text-fs18 sm:text-fs20 text-pri-500 font-semibold">
                {formatAmount(userPayStatus?.balance ?? 0)}
              </span>
            </div>
          </div>
        </Card>
        <Card type="label" labelTitle="다챠페이 충전" withMotion motionCustom={1}>
          <Input
            id="amount"
            label="충전하실 페이 금액을 입력해주세요."
            type="text"
            value={amount === 0 ? '' : String(amount)}
            onChange={e => {
              const value = e.target.value
              if (/^\d*$/.test(value)) {
                setAmount(Number(value))
              }
            }}
            shape="square"
            suffix="원"
            suffixAlwaysVisible={true}
            prefix={<DatchaCoin className="h-6 w-6" />}
            className="text-fs16 appearance-none"
            required={true}
            inputMode="numeric"
            error={amount > 0 && amount < 1000}
            errorMsg="1,000원 이상 입력해주세요."
          />
        </Card>
        <Card type="label" labelTitle="쿠폰 적용" withMotion motionCustom={2}>
          {isCouponLoading ? (
            <p className="text-sm text-gray-500">쿠폰 불러오는 중</p>
          ) : isCouponError ? (
            <p className="text-sm text-red-500">쿠폰 불러오기 실패</p>
          ) : (
            <DropDown
              type="default"
              selected={selectedCouponName}
              onSelect={handleCouponSelect}
              options={couponOptions}
            />
          )}
        </Card>
        <Card type="label" labelTitle="결제 예정 정보" withMotion motionCustom={3}>
          <div className="flex justify-between">
            <span className="text-fs16 text-gray-600">충전 금액</span>
            <span className="text-fs16 text-gray-800">{formatAmount(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fs16 text-gray-600">할인 금액</span>
            <span className="text-fs16 text-gray-800">{formatAmount(discountAmount)}</span>
          </div>
          <hr className="border-t border-dashed border-gray-100" />
          <div className="text-fs18 sm:text-fs20 flex items-center justify-between font-semibold">
            <span className="text-gray-800">최종 결제 금액</span>
            <span className="text-pri-600">{formatAmount(finalAmount)}</span>
          </div>
        </Card>
      </div>
      <FloatActionButton
        show={amount > 0}
        text={`${finalAmount.toLocaleString()}원 결제하기`}
        onClick={handlePayment}
        disabled={isDisabled}
        className={isDisabled ? 'button-disabled' : 'button-active'}
      />
    </div>
  )
}

export default PaymentPage
