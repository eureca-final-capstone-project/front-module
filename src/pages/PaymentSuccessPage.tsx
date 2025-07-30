import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { postConfirmPayment, ConfirmPaymentResponse } from '../apis/payment'
import axios from 'axios'
import Button from '../components/Button/Button'
import SuccessIcon from '@/assets/icons/circle-check.svg?react'
import Card from '../components/Card/Card'
import DatchaIcon from '@/assets/icons/datcha-coin-color.svg?react'
import { getUserPayStatus } from '../apis/userInfo'
import { formatAmount } from '../utils/format'
import { imagePayment as PaymentImage } from '../constants/imageData'

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')
  const navigate = useNavigate()

  const [paymentInfo, setPaymentInfo] = useState<ConfirmPaymentResponse['data'] | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')

  const confirmMutation = useMutation({
    mutationFn: postConfirmPayment,
  })

  const { data: userPayStatus, refetch: refetchUserPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
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
        refetchUserPayStatus()
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
      <div className="flex h-[calc(100vh-88px)] flex-col justify-between gap-4 px-4 pb-3 sm:h-[calc(100vh-126px)] sm:px-0 sm:pb-10">
        <div className="flex w-full flex-col gap-4 sm:gap-6">
          <Card
            withMotion
            motionCustom={0}
            className="flex w-full flex-col items-center justify-center p-4 text-center sm:px-5 sm:py-8"
          >
            <div className="bg-pri-100 flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14">
              <SuccessIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-fs14 sm:text-fs18 text-gray-800">
                페이 충전이 성공적으로 완료되었습니다!
              </h3>
              <div className="text-fs20 sm:text-fs28 text-pri-500 flex items-center gap-1 font-bold">
                <DatchaIcon strokeWidth={2.5} />
                <p>{formatAmount(Number(amount))}</p>
              </div>
            </div>
          </Card>
          <Card
            withMotion
            motionCustom={1}
            className="flex w-full flex-col gap-4 p-4 sm:gap-5 sm:p-5"
          >
            <h2 className="text-fs18 sm:text-fs20 font-medium">결제 상세 정보</h2>
            <div className="flex flex-col gap-2 sm:gap-4">
              <div className="flex flex-col gap-2 sm:gap-3.5">
                <div className="flex justify-between sm:items-center">
                  <span className="whitespace-nowrap text-gray-600">결제 번호</span>
                  <p className="text-end text-gray-800">{paymentInfo.orderId}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">결제 시간</span>
                  <p className="text-gray-800">
                    {paymentInfo.completedAt
                      ? new Date(paymentInfo.completedAt).toLocaleString()
                      : '정보 없음'}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">결제 방식</span>
                  <div className="flex items-center gap-1">
                    {paymentInfo?.paymentMethod && PaymentImage[paymentInfo.paymentMethod] && (
                      <img
                        src={PaymentImage[paymentInfo.paymentMethod]}
                        alt={paymentInfo.paymentMethod}
                        className="h-[1em] w-auto align-middle"
                      />
                    )}
                    <p className="text-gray-800">{paymentInfo.paymentMethod}</p>
                  </div>
                </div>
              </div>
              <div className="border-1 border-dashed border-gray-100" />
              <div className="text-fs18 sm:text-fs20 text-pri-600 flex items-center justify-between font-semibold">
                <span>총 다챠페이</span>
                <div className="flex items-center gap-1">
                  <DatchaIcon strokeWidth={3} />
                  <p>{formatAmount(userPayStatus?.balance ?? 0)}</p>
                </div>
              </div>
            </div>
          </Card>
          <Card
            withMotion
            motionCustom={2}
            className="w-full cursor-pointer"
            onClick={() => navigate('/mypage/pay-history')}
            type="notice"
            iconTitle="페이 변동 내역 보러가기"
            iconDescription="충전 및 환전, 거래로 변동된 페이 내역을 한 눈에 확인해보세요!"
          ></Card>
        </div>

        <div className="flex flex-col gap-2 sm:gap-4">
          <Button
            text="페이 더 충전하기"
            onClick={() => navigate('/payment')}
            className="bg-pri-500 text-gray-10 text-fs18 lg:text-fs20 w-full p-4 font-medium"
          />
          <Button
            text="거래하러 가기"
            onClick={() => navigate('/posts')}
            className="text-pri-500 border-pri-500 text-fs18 lg:text-fs20 w-full border-2 font-medium"
          />
        </div>
      </div>
    )
  }

  return <div>결제 정보를 불러오는 중</div>
}

export default PaymentSuccessPage
