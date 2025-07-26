import { FormProvider, useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import TitleInput from './components/TitleInput'
import { PostFormType } from '../../types/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema } from '../../utils/validation'
import ContentInput from './components/ContentInput'
import Card from '../../components/Card/Card'
import CarrierField from './components/CarrierField'
import TransactionInfoInput from './components/TransactionInfoInput'
import CurrentDataInfoField from './components/CurrentDataInfoField'
import DataInput from './components/DataInput'
import ImageSelect from './components/ImageSelect'

const formSections = [
  { label: '제목', Component: TitleInput },
  { label: '내용', Component: ContentInput },
  { label: '통신사', Component: CarrierField },
  { label: '거래 방식', Component: TransactionInfoInput },
  { label: '현재 데이터 정보', Component: CurrentDataInfoField },
  { label: '판매 데이터', Component: DataInput },
  { label: '이미지', Component: ImageSelect },
]

const PostWritePage = () => {
  const methods = useForm<PostFormType>({
    resolver: zodResolver(postSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const { watch } = methods
  const watchedFields = watch()
  const allFieldsFilled = Object.values(watchedFields).every(value => value !== '')

  const handlePost = (data: PostFormType) => {
    console.log(data)
  }

  return (
    <main>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handlePost)} className="flex flex-col gap-6">
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
