import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import FilterBar, { FilterState } from './components/FilterBar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  FilterType,
  getMyFeeds,
  StatusType,
  TransactionFeedResponse,
} from '../../apis/transactionFeed'
import { useDeviceType } from '../../hooks/useDeviceType'
import { MYPAGE_SORT, MyPageSortLabel, MyPageSortValue } from '../../constants/sortBy'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PostCardProps } from '../../components/PostCard/PostCard'
import { transformPostCard } from '../../utils/postCardParse'
import DropDown from '../../components/DropDown/DropDown'
import PostCardGrid from '../PostPage/components/PostCardGrid'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'
import MobileFilter from './components/MobileFilter'
import { MyMobileFilterState } from '../../types/filter'
import Button from '../../components/Button/Button'
import PlusIcon from '@/assets/icons/plus.svg?react'
import { usePermissionStore } from '../../store/authStore'
import EndOfFeedMessage from '../PostPage/components/EndOfFeedMessage'
import PostCardColSkeleton from '../../components/PostCard/PostCardColSkeleton'
import PostCardRowSkeleton from '../../components/PostCard/PostCardRowSkeleton'

const parseFilter = (param: string | null): FilterType => {
  return ['NORMAL', 'BID'].includes(param ?? '') ? (param as FilterType) : 'ALL'
}

const parseStatus = (param: string | null): StatusType => {
  return ['ON_SALE', 'COMPLETED', 'EXPIRED'].includes(param ?? '') ? (param as StatusType) : 'ALL'
}

const MyPostPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sortLabels = MYPAGE_SORT.map(option => option.label) as MyPageSortLabel[]
  const initialSortLabel = (searchParams.get('sortBy') as MyPageSortLabel) || '최신순'
  const [selectedSort, setSelectedSort] = useState<MyPageSortLabel>(initialSortLabel)
  const deviceType = useDeviceType()
  const observerRef = useRef<HTMLDivElement | null>(null)
  const permissions = usePermissionStore(state => state.permissions)
  const isDisabledWrite = !permissions.includes('WRITE')
  const [filterState, setFilterState] = useState<FilterState>(() => ({
    filter: parseFilter(searchParams.get('filter')),
    status: parseStatus(searchParams.get('status')),
  }))

  const handleFilterChange = useCallback((updated: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...updated }))
  }, [])

  const handleResetFilters = useCallback(() => {
    setSelectedSort('최신순')
    setFilterState({
      filter: 'ALL',
      status: 'ALL',
    })

    navigate(`/my-posts`, { replace: true })
  }, [navigate])

  const sortBy = useMemo(() => {
    const map: Record<MyPageSortLabel, MyPageSortValue> = {
      최신순: 'createdAt,desc',
      '가격 높은 순': 'salesPrice,desc',
      '가격 낮은 순': 'salesPrice,asc',
    }
    return map[selectedSort]
  }, [selectedSort])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, isError } =
    useInfiniteQuery<TransactionFeedResponse, Error>({
      queryKey: ['transactionFeeds', sortBy, filterState],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await getMyFeeds({
          filter: filterState.filter,
          status: filterState.status,
          pageable: {
            page: pageParam as number,
            size: 12,
            sort: [sortBy],
          },
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
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px 0px -100px 0px',
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

  // 로딩 바
  useEffect(() => {
    if ((isFetching && !isFetchingNextPage) || isLoading) {
      NProgress.start()
    } else {
      NProgress.done()
    }

    return () => {
      NProgress.done()
    }
  }, [isFetching, isLoading, isFetchingNextPage])

  useEffect(() => {
    const params = new URLSearchParams()

    if (filterState.filter !== 'ALL') {
      params.set('filter', filterState.filter)
    }
    if (filterState.status !== 'ALL') {
      params.set('status', filterState.status)
    }

    params.set('sortBy', selectedSort)

    navigate(`/my-posts?${params.toString()}`, { replace: true })
  }, [filterState, selectedSort, navigate])

  const showNoResultsMessage = !isLoading && !isFetching && flattenedPosts.length === 0

  return (
    <div className="flex min-h-screen gap-5 lg:gap-10">
      {/* 왼쪽 필터 바 (고정) */}
      <div className="sticky top-28 hidden h-[calc(100vh-15rem)] shrink-0 sm:block">
        <FilterBar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </div>

      {/* 오른쪽 콘텐츠 영역 (스크롤) */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col space-y-4 sm:space-y-10">
          {deviceType === 'mobile' && (
            <div className="flex flex-col">
              <Breadcrumb current="내 판매글" />
              <MobileFilter
                appliedFilterState={{
                  sort: selectedSort,
                  filter: filterState.filter,
                  status: filterState.status,
                }}
                onClose={() => {}}
                onApplyFilter={(newMobileFilterState: MyMobileFilterState) => {
                  const { sort, ...rest } = newMobileFilterState
                  setSelectedSort(sort)
                  setFilterState(rest)
                }}
                onResetAllFilters={handleResetFilters}
                isOpen={true}
              />
            </div>
          )}
          <div className="hidden items-center justify-between sm:flex">
            {deviceType !== 'mobile' && (
              <h2 className="text-fs20 md:text-fs24 font-medium">내 판매글</h2>
            )}
            <div className="flex items-center gap-4">
              <Button
                text="판매글 작성"
                onClick={() => navigate('/post-write')}
                disabled={isDisabledWrite}
                className={`bg-pri-500 text-gray-10 hidden whitespace-nowrap sm:block ${isDisabledWrite ? 'button-disabled' : 'button-active'}`}
              />
              {/* 정렬 드롭다운 */}
              <DropDown
                className="z-25 w-35 lg:w-40"
                options={sortLabels}
                selected={selectedSort}
                onSelect={option => setSelectedSort(option as MyPageSortLabel)}
              />
            </div>
          </div>
          {/* 게시글 목록 */}
          {isError ? (
            <EndOfFeedMessage type="No" text="게시글을 불러오는데 실패했습니다." />
          ) : showNoResultsMessage ? (
            <EndOfFeedMessage type="No" text="판매글이 없습니다." />
          ) : (
            // 데이터가 있거나, 로딩/에러/결과 없음 메시지가 아닌 경우
            <>
              <PostCardGrid posts={flattenedPosts} isLoading={isLoading} />
              {isFetchingNextPage && (
                <div
                  className={`grid ${
                    deviceType === 'mobile'
                      ? 'bg-gray-10 min-w-0 grid-cols-1 gap-4 p-4'
                      : deviceType === 'tablet'
                        ? 'grid-cols-1 gap-x-6 gap-y-15.5 pb-10 md:grid-cols-2'
                        : 'grid-cols-3 gap-x-6 gap-y-15.5 pb-10 xl:grid-cols-4'
                  }`}
                >
                  {Array.from({ length: 4 }).map((_, index) =>
                    deviceType === 'mobile' ? (
                      <div
                        key={index}
                        className={`pb-4 ${index !== 3 ? 'border-b-[0.5px] border-gray-200' : ''}`}
                      >
                        <PostCardRowSkeleton />
                      </div>
                    ) : (
                      <PostCardColSkeleton key={index} />
                    )
                  )}
                </div>
              )}
              {!hasNextPage && flattenedPosts.length > 0 && !isFetchingNextPage && (
                <EndOfFeedMessage text="작성하신 모든 판매글을 확인했어요!" />
              )}
              {hasNextPage && <div ref={observerRef} className="relative -top-80 h-1" />}
            </>
          )}
        </div>
      </div>
      {deviceType !== 'desktop' && (
        <button
          disabled={isDisabledWrite}
          onClick={() => navigate('/post-write')}
          className={`bg-pri-400 shadow-button text-gray-10 fixed right-4 bottom-7 z-50 flex items-center rounded-full px-4 py-2.5 sm:hidden ${isDisabledWrite ? 'button-disabled' : 'button-active'}`}
        >
          <PlusIcon className="h-4 w-4 pr-1" />
          글쓰기
        </button>
      )}
      <ScrollToTopButton />
    </div>
  )
}

export default MyPostPage
