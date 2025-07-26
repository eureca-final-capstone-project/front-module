import { Controller, useFormContext } from 'react-hook-form'
import Input from '../../../components/Input/Input'

const TitleInput = () => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  return (
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
  )
}

export default TitleInput
