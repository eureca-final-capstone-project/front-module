import Card from '../../components/Card/Card'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
import { formatAmount } from '../../utils/format'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserPayStatus } from '../../apis/userInfo'
import { useNavigate } from 'react-router-dom'
import RefundPayInput from './components/RefundPayInput'
import RefundAccountInput from './components/RefundAccountInput'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { refundSchema } from '../../utils/validation'
import { RefundSchemaType } from '../../types/pay'
import { postRefundRequest } from '../../apis/payment'
import { toast } from 'react-toastify'
import RefundBankSelector from './components/RefundBankSelector'
import FloatActionButton from '../../components/FloatActionButton'

const RefundPage = () => {
  const refundMutation = useMutation({
    mutationFn: postRefundRequest,
    onSuccess: () => {
      toast.success('환전이 완료되었습니다.')
      navigate('/mypage/pay-history')
    },
    onError: error => {
      // 타입은 상황에 따라 조정 (ex. AxiosError)
      console.error('환전 요청 실패:', error)
      toast.error('환전에 실패했습니다. 잠시 후 시도해주세요.')
    },
  })

  const methods = useForm({
    resolver: zodResolver(refundSchema),
    mode: 'onChange',
    defaultValues: {
      refundAmount: '',
      exchangeAccount: '',
      bankId: 0,
    },
  })

  const {
    watch,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods

  const refundAmount = watch('refundAmount')
  const bankId = watch('bankId')
  const exchangeAccount = watch('exchangeAccount')

  const isFilled =
    refundAmount.replace(/,/g, '').length > 0 && exchangeAccount.length >= 10 && Number(bankId) > 0
  const showButton = isFilled && isValid

  const onSubmit = (data: RefundSchemaType) => {
    const inputAmount = Number(data.refundAmount.replace(/,/g, '')) || 0
    const balance = userPayStatus?.balance ?? 0

    if (inputAmount > balance) {
      toast.error('입력하신 금액이 보유 다챠페이를 초과하였습니다.')
      return
    }

    refundMutation.mutate({
      bankId: data.bankId,
      exchangeAccount: data.exchangeAccount,
      amount: inputAmount,
    })
  }

  const { data: userPayStatus } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
  })
  const navigate = useNavigate()

  return (
    <div className={`sm:px-0} flex flex-col px-4 sm:justify-between`}>
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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Card labelTitle="환전 페이" type="label" withMotion motionCustom={1}>
              <RefundPayInput balance={userPayStatus?.balance ?? 0} />
            </Card>
            <Card labelTitle="환전 계좌" type="label" withMotion motionCustom={2}>
              <RefundBankSelector />
              <RefundAccountInput />
            </Card>
          </form>
        </FormProvider>
        <Card
          withMotion
          motionCustom={3}
          className="cursor-pointer"
          onClick={() => navigate('/mypage/pay-history')}
          type="notice"
          iconTitle="페이 변동 내역 보러가기"
          iconDescription="충전 및 환전, 거래로 변동된 페이 내역을 한 눈에 확인해보세요!"
        ></Card>
      </div>
      <FloatActionButton
        show={showButton}
        text="환전 요청하기"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || isSubmitting}
        className={!isValid ? 'button-disabled' : 'button-active'}
      />
    </div>
  )
}

export default RefundPage
