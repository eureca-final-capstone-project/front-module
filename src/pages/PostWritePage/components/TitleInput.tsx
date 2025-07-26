import { Controller, useFormContext } from 'react-hook-form'
import Input from '../../../components/Input/Input'
import Card from '../../../components/Card/Card'

const TitleInput = () => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <div className="text-fs20 border-b border-gray-100 pb-2 font-medium">제목</div>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="판매글 제목을 작성해 주세요."
            id="title"
            value={field.value}
            onChange={e => {
              field.onChange(e)
              if (errors.title) clearErrors('title')
            }}
            error={!!errors.title}
            errorMsg={errors.title?.message?.toString() || ''}
          />
        )}
      />
    </Card>
  )
}

export default TitleInput
