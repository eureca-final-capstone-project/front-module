import { useForm } from 'react-hook-form'
import SearchIcon from '@/assets/icons/search.svg?react'
import DeleteIcon from '@/assets/icons/delete.svg?react'
import { useEffect, useState } from 'react'
import TriangleIcon from '@/assets/icons/small-triangle.svg?react'
import { useQuery } from '@tanstack/react-query'
import { getKeywordRanking } from '../../apis/common'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface SearchBarProps {
  onSubmit: (keyword: string) => void
  defaultValue?: string
  className?: string
}

const SearchBar = ({ onSubmit, defaultValue = '', className }: SearchBarProps) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { keyword: defaultValue },
  })

  const [isFocused, setIsFocused] = useState(false)
  const { data: keywordData, isLoading } = useQuery({
    queryKey: ['keywordRanking'],
    queryFn: getKeywordRanking,
    enabled: isFocused,
    staleTime: 1000 * 60,
  })

  const rankings = keywordData?.top10 ?? []
  const lastUpdatedAt = keywordData?.lastUpdatedAt ?? ''

  const today = new Date()
  const todayString = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`

  const leftColumn = rankings.slice(0, 5)
  const rightColumn = rankings.slice(5, 10)

  const keyword = watch('keyword')

  const submit = (data: { keyword: string }) => {
    onSubmit(data.keyword.trim())
    setIsFocused(false)
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
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

        {/* 랭킹 드롭다운 */}
        {isFocused && (
          <div className="border-pri-500 shadow-modal bg-gray-10 absolute top-full right-0 left-0 mt-2 rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-fs14 font-medium text-gray-800">인기 검색어</p>
              {lastUpdatedAt && (
                <p className="text-fs12 text-gray-400">
                  {todayString} {lastUpdatedAt}, 기준
                </p>
              )}
            </div>

            {isLoading ? (
              <LoadingSpinner text="로딩 중..." />
            ) : (
              <div className="flex gap-x-4">
                {/* 왼쪽 컬럼 */}
                <div className="flex w-1/2 flex-col gap-y-3">
                  {leftColumn.map(item => (
                    <button
                      key={item.keyword}
                      type="button"
                      onMouseDown={() => onSubmit(item.keyword)}
                      className="hover:text-pri-500 text-fs13 flex items-center justify-between text-left text-gray-900"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1.5 sm:gap-3">
                          <span
                            className={`inline-block w-4 text-start ${
                              item.currentRank <= 3 ? 'text-pri-500 font-medium' : 'text-gray-900'
                            }`}
                          >
                            {item.currentRank}.
                          </span>
                          <p className="text-fs13">{item.keyword}</p>
                        </div>
                        <div className="text-fs13 ml-1 flex items-center text-gray-400">
                          {item.trend === 'NEW' && (
                            <span className="text-pri-400 text-fs12">NEW</span>
                          )}
                          {item.trend === 'UP' && (
                            <div className="text-error flex items-center gap-1.5">
                              <span>
                                <TriangleIcon className="h-2 w-2" />
                              </span>
                              <span className="inline-block w-3 text-end">{item.rankGap}</span>
                            </div>
                          )}
                          {item.trend === 'DOWN' && (
                            <div className="text-info flex items-center gap-1.5">
                              <span>
                                <TriangleIcon className="h-2 w-2 rotate-180" />
                              </span>
                              <span className="inline-block w-3 text-end">{item.rankGap}</span>
                            </div>
                          )}
                          {item.trend === 'SAME' && <span className="font-black">−</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* 오른쪽 컬럼 */}
                <div className="flex w-1/2 flex-col gap-y-3">
                  {rightColumn.map(item => (
                    <button
                      key={item.keyword}
                      type="button"
                      onMouseDown={() => onSubmit(item.keyword)}
                      className="hover:text-pri-500 text-fs13 flex items-center justify-between text-left text-gray-900"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1.5 sm:gap-3">
                          <span className="inline-block w-4 text-start text-gray-900">
                            {item.currentRank}.
                          </span>
                          <p className="text-fs13">{item.keyword}</p>
                        </div>
                        <div className="text-fs13 ml-1 flex items-center text-gray-400">
                          {item.trend === 'NEW' && (
                            <span className="text-pri-400 text-fs12">NEW</span>
                          )}
                          {item.trend === 'UP' && (
                            <div className="text-error flex items-center gap-1.5">
                              <span>
                                <TriangleIcon className="h-2 w-2" />
                              </span>
                              <span className="inline-block w-3 text-end">{item.rankGap}</span>
                            </div>
                          )}
                          {item.trend === 'DOWN' && (
                            <div className="text-info flex items-center gap-1.5">
                              <span>
                                <TriangleIcon className="h-2 w-2 rotate-180" />
                              </span>
                              <span className="inline-block w-3 text-end">{item.rankGap}</span>
                            </div>
                          )}
                          {item.trend === 'SAME' && <span className="font-black">−</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchBar
