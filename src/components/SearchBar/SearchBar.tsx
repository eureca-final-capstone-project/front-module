import { useForm } from 'react-hook-form'
import SearchIcon from '@/assets/icons/search.svg?react'
import DeleteIcon from '@/assets/icons/delete.svg?react'
import { useEffect } from 'react'

interface SearchBarProps {
  onSubmit: (keyword: string) => void
  defaultValue?: string
  className?: string
}

const SearchBar = ({ onSubmit, defaultValue = '', className }: SearchBarProps) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { keyword: defaultValue },
  })

  const keyword = watch('keyword')

  const submit = (data: { keyword: string }) => {
    onSubmit(data.keyword.trim())
  }

  const clearInput = () => {
    setValue('keyword', '')
  }

  useEffect(() => {
    setValue('keyword', defaultValue)
  }, [defaultValue, setValue])

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="relative z-10 flex flex-1 justify-center self-end sm:translate-y-[6px]"
    >
      <div className={`focus-within:text-pri-500 relative w-full text-gray-400 ${className}`}>
        <button type="submit" className="absolute top-1/2 left-3 -translate-y-1/2">
          <SearchIcon />
        </button>
        <input
          {...register('keyword')}
          type="text"
          placeholder="검색할 내용을 입력해 주세요"
          className="placeholder:font-regular bg-gray-10 focus:border-pri-500 w-full rounded-full border border-gray-400 p-3 pl-9 text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        {keyword && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchBar
