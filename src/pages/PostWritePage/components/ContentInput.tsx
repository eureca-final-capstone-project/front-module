import { Controller, useFormContext } from 'react-hook-form'

const ContentInput = () => {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name="content"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div>
          <textarea
            placeholder="판매글 내용을 작성해 주세요."
            id="content"
            value={field.value}
            onChange={e => {
              field.onChange(e)
              if (!field.value.trim()) setError('content', { message: '내용을 입력해 주세요.' })
              else clearErrors('content')
            }}
            className={`rounded-sm border ${errors.content ? 'border-error border' : field.value.trim() ? 'border-pri-500' : 'hover:border-pri-500 focus:border-pri-500 border-gray-400'} h-30 w-full resize-none p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none`}
          />
          <span className="text-error text-fs12 p-1">
            {errors.content?.message?.toString() || ''}
          </span>
        </div>
      )}
    />
  )
}

export default ContentInput
