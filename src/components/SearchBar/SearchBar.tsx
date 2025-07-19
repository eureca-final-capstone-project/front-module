import { useForm } from 'react-hook-form'
import SearchIcon from '@/assets/icons/search.svg?react'

interface SearchBarProps {
  onSubmit: (keyword: string) => void
  defaultValue?: string
}

const SearchBar = ({ onSubmit, defaultValue = '' }: SearchBarProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { keyword: defaultValue },
  })

  const submit = (data: { keyword: string }) => {
    onSubmit(data.keyword.trim())
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="relative">
      <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
      <input
        {...register('keyword')}
        type="text"
        placeholder="검색할 내용을 입력해 주세요"
        className="placeholder:font-regular w-full max-w-171 rounded-[32px] border border-gray-400 p-3 pl-9 placeholder:text-gray-400 focus:outline-none"
      />
    </form>
  )
}

export default SearchBar
