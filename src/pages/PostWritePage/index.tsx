import { FormProvider, useForm } from 'react-hook-form'
import TitleInput from './components/TitleInput'
import { PostTransactionType } from '../../types/transactionFeed'
import { zodResolver } from '@hookform/resolvers/zod'
import { postTransactionSchema } from '../../utils/validation'
import ContentInput from './components/ContentInput'
import Card from '../../components/Card/Card'
import TelecomField from './components/TelecomField'
import TransactionInfoInput from './components/TransactionInfoInput'
import CurrentDataInfoField from './components/CurrentDataInfoField'
import DataInput from './components/DataInput'
import ImageSelect from './components/ImageSelect'
import { useUserStore } from '../../store/userStore'
import { useMutation } from '@tanstack/react-query'
import { postTransactionFeed } from '../../apis/transactionFeed'
import FloatActionButton from '../../components/FloatActionButton'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/useToast'

const formSections = [
  { label: '제목', Component: TitleInput },
  { label: '내용', Component: ContentInput },
  { label: '통신사', Component: TelecomField },
  { label: '거래 방식', Component: TransactionInfoInput },
  { label: '현재 데이터 정보', Component: CurrentDataInfoField },
  { label: '판매 데이터', Component: DataInput },
]

const typeMap = {
  1: 'normal',
  2: 'bid',
}

const PostWritePage = () => {
  const navigate = useNavigate()
  const telecom = useUserStore(state => state.telecom)
  const { showToast } = useToast()

  const methods = useForm<PostTransactionType>({
    resolver: zodResolver(postTransactionSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const {
    watch,
    clearErrors,
    formState: { errors },
    reset,
  } = methods
  const watchedFields = watch()
  const watchedSalesTypeId = watch('salesTypeId') ?? 1
  const watchedUnit = watch('unit') ?? 'MB'

  const allFieldsFilled = Object.values(watchedFields).every(value => value !== '')
  const noFieldErrors = Object.keys(errors).length === 0

  const isSubmitEnabled = allFieldsFilled && noFieldErrors

  const mutation = useMutation({
    mutationFn: postTransactionFeed,
    onSuccess: (data, variables) => {
      switch (data.statusCode) {
        case 200:
          showToast({ type: 'success', msg: '판매글이 성공적으로 등록되었습니다.' })
          reset()
          navigate(`/posts/${typeMap[variables.salesTypeId]}/${data.data.id}`)
          break
        default:
          showToast({
            type: 'error',
            msg: '판매글 등록에 실패했습니다.',
          })
      }
    },
    onError: () => {
      showToast({
        type: 'error',
        msg: '판매글 등록에 실패했습니다.',
      })
    },
  })

  const onSubmit = (data: PostTransactionType) => {
    clearErrors()

    let amount = data.salesDataAmount
    if (data.unit === 'GB') amount *= 1000

    // 주석 없애면 에러남 지우지말아줘요
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { unit, ...rest } = data

    const postData = {
      ...rest,
      telecomCompanyId: telecom?.id,
      salesDataAmount: amount,
    }
    mutation.mutate(postData)
  }

  return (
    <main>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={`flex flex-col gap-6 ${allFieldsFilled ? 'pb-20' : 'pb-10'}`}
        >
          {formSections.map(({ label, Component }, index) => (
            <Card
              key={index}
              className={`rounded-none sm:rounded-md ${label === '통신사' ? 'flex-row items-center justify-between' : ''}`}
            >
              <div
                className={`text-fs20 ${label !== '통신사' && 'border-b border-gray-100 pb-2'} font-medium`}
              >
                {label}
              </div>

              <Component />
            </Card>
          ))}
          <Card className="rounded-none sm:rounded-md">
            <div className="text-fs20 font-medium">이미지</div>
            <ImageSelect transactionType={watchedSalesTypeId} unit={watchedUnit} />
          </Card>

          <FloatActionButton
            show={isSubmitEnabled}
            text="작성 완료"
            type="submit"
            disabled={!isSubmitEnabled}
            className={!isSubmitEnabled ? 'button-disabled' : 'button-active'}
          />
        </form>
      </FormProvider>
    </main>
  )
}

export default PostWritePage
