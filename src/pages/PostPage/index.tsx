import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import FilterBar from './components/FilterBar'
import PostCardGrid from './components/PostCardGrid'
import DropDown from '../../components/DropDown/DropDown'
import { useDeviceType } from '../../hooks/useDeviceType'
import { SORT_BY, SortLabel } from '../../constants/sortBy'
import { getTransactionFeeds, TransactionFeedResponse } from '../../apis/transactionFeed'
import { transformPostCard } from '../../utils/postCardParse'
import { PostCardProps } from '../../components/PostCard/PostCard'
import { useSearchParams } from 'react-router-dom'

const PostPage = () => {
  const sortLabels = SORT_BY.map(option => option.label) as SortLabel[]
  const [selectedSort, setSelectedSort] = useState<SortLabel>('최신순')
  const deviceType = useDeviceType()
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  const sortBy = useMemo(() => {
    const map: Record<SortLabel, 'LATEST' | 'PRICE_HIGH' | 'PRICE_LOW'> = {
      최신순: 'LATEST',
      '가격 높은 순': 'PRICE_HIGH',
      '가격 낮은 순': 'PRICE_LOW',
    }
    return map[selectedSort]
  }, [selectedSort])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery<TransactionFeedResponse, Error>({
      queryKey: ['transactionFeeds', sortBy, keyword],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await getTransactionFeeds(keyword ? { keyword, sortBy } : { sortBy }, {
          page: pageParam as number,
          size: 12,
        })
        return res
      },
      initialPageParam: 0,
      getNextPageParam: lastPage => (lastPage.last ? undefined : lastPage.number + 1),
      staleTime: 1000 * 60,
      enabled: !!sortBy,
    })

  const flattenedPosts: PostCardProps[] = useMemo(() => {
    return data
      ? data.pages.flatMap(page =>
          page.content.map(post => transformPostCard(post, deviceType === 'mobile' ? 'row' : 'col'))
        )
      : []
  }, [data, deviceType])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    })

    const currentObserverRef = observerRef.current

    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
      observer.disconnect()
    }
  }, [handleObserver])

  if (isLoading) {
    return <div className="py-10 text-center">데이터를 불러오는 중입니다...</div>
  }

  if (isError) {
    return (
      <div className="text-error py-10 text-center">
        데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
      </div>
    )
  }

  if (flattenedPosts.length === 0 && !isLoading) {
    return <div className="py-10 text-center text-gray-600">조회된 게시글이 없습니다.</div>
  }

  return (
    <div className="flex gap-5 lg:gap-10">
      {/* 왼쪽 필터 바 (고정) */}
      <div className="sticky top-28 hidden h-[calc(100vh-10rem)] shrink-0 overflow-y-auto sm:block">
        <FilterBar />
      </div>

      {/* 오른쪽 콘텐츠 영역 (스크롤) */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col space-y-4 sm:space-y-10">
          {deviceType === 'mobile' && (
            <div className="ml-4 flex flex-col gap-4">
              <p>데이터 거래</p>
            </div>
          )}
          <div className="hidden items-center justify-between sm:flex">
            {deviceType !== 'mobile' && (
              <div className="flex flex-col gap-2">
                <h2 className="text-fs20 md:text-fs24 font-medium">데이터 거래</h2>
                <p className="text-fs14 lg:text-fs16 hidden text-gray-800 md:block">
                  필터를 사용해 조건에 맞는 데이터를 찾아보세요!
                </p>
              </div>
            )}
            {/* 정렬 드롭다운 */}
            <DropDown
              className="z-25 w-35 lg:w-40"
              options={sortLabels}
              selected={selectedSort}
              onSelect={option => setSelectedSort(option as SortLabel)}
            />
          </div>

          {/* 게시글 목록 */}
          <PostCardGrid posts={flattenedPosts} />
          {isFetchingNextPage && (
            <div className="py-4 text-center text-gray-700">다음 페이지를 불러오는 중...</div>
          )}
          {!hasNextPage && flattenedPosts.length > 0 && !isFetchingNextPage && (
            <div className="py-4 text-center text-gray-700">모든 게시글을 불러왔습니다.</div>
          )}
          {hasNextPage && <div ref={observerRef} className="h-1" />}
        </div>
      </div>
    </div>
  )
}

export default PostPage
