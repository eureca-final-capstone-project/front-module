import { useParams, useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postTransactionSchema } from '../../utils/validation'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useToast } from '../../hooks/useToast'
import { PostTransactionType } from '../../types/transactionFeed'
import { getTransactionFeedDetail } from '../../apis/transactionFeedDetail'

import Card from '../../components/Card/Card'
import ImageSelect from '../PostWritePage/components/ImageSelect'
import FloatActionButton from '../../components/FloatActionButton'
import { useEffect } from 'react'
import TitleInput from '../PostWritePage/components/TitleInput'
import ContentInput from '../PostWritePage/components/ContentInput'
import TelecomField from '../PostWritePage/components/TelecomField'
import TransactionInfoInput from '../PostWritePage/components/TransactionInfoInput'
import CurrentDataInfoField from '../PostWritePage/components/CurrentDataInfoField'
import DataInput from '../PostWritePage/components/DataInput'
import { formatSalesDataAmount, getUnit } from '../../utils/format'
import { updateTransactionFeed } from '../../apis/transactionFeed'

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

const PostEditPage = () => {
  const { postId: transactionFeedId } = useParams()

  const navigate = useNavigate()
  const { showToast } = useToast()

  const methods = useForm<PostTransactionType>({
    resolver: zodResolver(postTransactionSchema),
    mode: 'onSubmit',
  })

  const {
    watch,
    clearErrors,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods

  const watchedFields = watch()
  const watchedSalesTypeId = watch('salesTypeId') ?? 1
  const watchedUnit = watch('unit') ?? 'MB'

  const allFieldsFilled = Object.values(watchedFields).every(value => value !== '')
  const noFieldErrors = Object.keys(errors).length === 0

  const isSubmitEnabled = allFieldsFilled && noFieldErrors

  const {
    data: transactionFeedDetailData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['transactionFeedDetail', transactionFeedId],
    queryFn: () => getTransactionFeedDetail(Number(transactionFeedId)),
    enabled: !!transactionFeedId,
  })

  useEffect(() => {
    const fetchedData = {
      title: transactionFeedDetailData?.title ?? '',
      content: transactionFeedDetailData?.content ?? '',
      salesTypeId: transactionFeedDetailData?.salesType.salesTypeId as 1 | 2,
      salesPrice: transactionFeedDetailData?.salesPrice,
      unit: getUnit(transactionFeedDetailData?.salesDataAmount),
      salesDataAmount: formatSalesDataAmount(transactionFeedDetailData?.salesDataAmount),
      defaultImageNumber: transactionFeedDetailData?.defaultImageNumber,
    }

    reset(fetchedData)
  }, [transactionFeedDetailData, reset])

  const mutation = useMutation({
    mutationFn: updateTransactionFeed,
    onSuccess: data => {
      switch (data.statusCode) {
        case 200:
          showToast({ type: 'success', msg: '판매글이 수정되었습니다.' })
          navigate(
            `/posts/${typeMap[transactionFeedDetailData?.salesType.salesTypeId as 1 | 2]}/${transactionFeedId}`
          )
          break
        default:
          showToast({ type: 'error', msg: '판매글 수정에 실패했습니다.' })
      }
    },
    onError: () => {
      showToast({ type: 'error', msg: '판매글 수정에 실패했습니다.' })
    },
  })

  const onSubmit = (data: PostTransactionType) => {
    clearErrors()

    let amount = data.salesDataAmount
    if (data.unit === 'GB') amount *= 1000

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { unit, salesTypeId, ...rest } = data

    const updateData = {
      ...rest,
      transactionFeedId: Number(transactionFeedId),
      salesDataAmount: amount,
    }
    mutation.mutate(updateData)
  }

  if (isLoading) return <div>데이터 불러오는 중 중...</div>
  if (isError) return <div>데이터를 불러오는 중 문제가 발생했습니다.</div>

  return (
    <main>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col gap-6 ${allFieldsFilled ? 'pb-20' : 'pb-10'}`}
        >
          {formSections.map(({ label, Component }, index) => (
            <Card
              key={index}
              className={label === '통신사' ? 'flex-row items-center justify-between' : ''}
            >
              <div
                className={`text-fs20 ${label !== '통신사' && 'border-b border-gray-100 pb-2'} font-medium`}
              >
                {label}
              </div>

              {label === '현재 데이터 정보' ? (
                <Component prevSellableDataMb={transactionFeedDetailData?.salesDataAmount} />
              ) : label === '거래 방식' ? (
                <Component isEditMode={true} />
              ) : (
                <Component />
              )}
            </Card>
          ))}
          <Card>
            <div className="text-fs20 font-medium">이미지</div>
            <ImageSelect transactionType={watchedSalesTypeId} unit={watchedUnit} />
          </Card>
          <FloatActionButton
            show={isSubmitEnabled}
            text="수정 완료"
            type="submit"
            disabled={!isSubmitEnabled}
            className={!isSubmitEnabled ? 'button-disabled' : 'button-active'}
          />
        </form>
      </FormProvider>
    </main>
  )
}

export default PostEditPage
