import { FormProvider, useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
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

const formSections = [
  { label: '제목', Component: TitleInput },
  { label: '내용', Component: ContentInput },
  { label: '통신사', Component: TelecomField },
  { label: '거래 방식', Component: TransactionInfoInput },
  { label: '현재 데이터 정보', Component: CurrentDataInfoField },
  { label: '판매 데이터', Component: DataInput },
  { label: '이미지', Component: ImageSelect },
]

const PostWritePage = () => {
  const telecom = useUserStore(state => state.telecom)

  const methods = useForm<PostTransactionType>({
    resolver: zodResolver(postTransactionSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const { watch } = methods
  const watchedFields = watch()
  const allFieldsFilled = Object.values(watchedFields).every(value => value !== '')

  const onSubmit = (data: PostTransactionType) => {
    let amount = 1024
    if (data.unit === 'GB') amount *= data.salesDataAmount

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { unit, ...rest } = data

    const postData = {
      ...rest,
      telecomCompanyId: telecom?.id,
      salesDataAmount: amount,
    }
    console.log(postData)
  }

  return (
    <main>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
              <Component />
            </Card>
          ))}
          <Button
            text="작성 완료"
            type="submit"
            disabled={!allFieldsFilled}
            className="bg-pri-500 text-gray-10 disabled:bg-gray-50 disabled:text-gray-400"
          />
        </form>
      </FormProvider>
    </main>
  )
}

export default PostWritePage
