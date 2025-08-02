import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import FilterBar, { FilterState } from './components/FilterBar'
import PostCardGrid from './components/PostCardGrid'
import DropDown from '../../components/DropDown/DropDown'
import { useDeviceType } from '../../hooks/useDeviceType'
import { SORT_BY, SortLabel } from '../../constants/sortBy'
import { getTransactionFeeds, TransactionFeedResponse, Statuses } from '../../apis/transactionFeed'
import { transformPostCard } from '../../utils/postCardParse'
import { PostCardProps } from '../../components/PostCard/PostCard'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { PRICE_OPTIONS, SALES_DATA_AMOUNT_OPTIONS } from '../../constants/filterOptions'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'
import MobileFilter from './components/MobileFilter'
import { MobileFilterState, initialFilterState } from '../../types/filter'
import Button from '../../components/Button/Button'
import PlusIcon from '@/assets/icons/plus.svg?react'
import { useAuthStore, usePermissionStore } from '../../store/authStore'
import PostCardColSkeleton from '../../components/PostCard/PostCardColSkeleton'
import EndOfFeedMessage from './components/EndOfFeedMessage'
import PostCardRowSkeleton from '../../components/PostCard/PostCardRowSkeleton'
import NoIcon from '@/assets/icons/delete.svg?react'

const parseNumberArray = (param: string | null): number[] => {
  return param
    ? param
        .split(',')
        .map(Number)
        .filter(n => !isNaN(n))
    : []
}

const parseStatusesArray = (param: string | null): Statuses[] => {
  return param ? (param.split(',') as Statuses[]) : []
}

const PostPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sortLabels = SORT_BY.map(option => option.label) as SortLabel[]
  const initialSortLabel = (searchParams.get('sortBy') as SortLabel) || '최신순'
  const [selectedSort, setSelectedSort] = useState<SortLabel>(initialSortLabel)
  const deviceType = useDeviceType()
  const observerRef = useRef<HTMLDivElement | null>(null)
  const initialKeyword = searchParams.get('keyword') || ''
  const [keyword, setKeyword] = useState(initialKeyword)
  const permissions = usePermissionStore(state => state.permissions)
  const isDisabledWrite = !permissions.includes('WRITE')

  const [filterState, setFilterState] = useState<FilterState>(() => {
    const telecomCompanyIds = parseNumberArray(searchParams.get('telecomCompanyIds'))
    const salesTypeIds = parseNumberArray(searchParams.get('salesTypeIds'))
    const statuses = parseStatusesArray(searchParams.get('statuses'))
    const minDataAmount = searchParams.get('minDataAmount') || ''
    const maxDataAmount = searchParams.get('maxDataAmount') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''

    const selectedDataRange = SALES_DATA_AMOUNT_OPTIONS.findIndex(
      opt =>
        opt.minDataAmount.toString() === minDataAmount &&
        opt.maxDataAmount.toString() === maxDataAmount
    )
    const selectedPriceRange = PRICE_OPTIONS.findIndex(
      opt => opt.minPrice.toString() === minPrice && opt.maxPrice.toString() === maxPrice
    )

    return {
      telecomCompanyIds,
      salesTypeIds,
      statuses,
      selectedDataRange: selectedDataRange !== -1 ? selectedDataRange : null,
      selectedPriceRange: selectedPriceRange !== -1 ? selectedPriceRange : null,
      appliedDataRange: { min: minDataAmount, max: maxDataAmount },
      appliedPriceRange: { min: minPrice, max: maxPrice },
    }
  })

  const mobileFilterState: MobileFilterState = {
    ...filterState,
    sort: selectedSort,
  }

  const handleFilterChange = useCallback((updated: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...updated }))
  }, [])

  const handleResetFilters = useCallback(() => {
    setFilterState({
      telecomCompanyIds: [],
      salesTypeIds: [],
      statuses: [],
      selectedDataRange: null,
      selectedPriceRange: null,
      appliedDataRange: { min: '', max: '' },
      appliedPriceRange: { min: '', max: '' },
    })
    setKeyword('')
    const newParams = new URLSearchParams(location.search)
    newParams.delete('keyword')

    navigate(`/posts?${newParams.toString()}`, { replace: true })
  }, [navigate])

  const handleMobileResetAll = () => {
    setSelectedSort(initialFilterState.sort)
    setFilterState({
      telecomCompanyIds: [],
      salesTypeIds: [],
      statuses: [],
      selectedDataRange: null,
      selectedPriceRange: null,
      appliedDataRange: { min: '', max: '' },
      appliedPriceRange: { min: '', max: '' },
    })
    setKeyword('')

    const newParams = new URLSearchParams()
    newParams.set('sortBy', initialFilterState.sort)
    navigate(`/posts?${newParams.toString()}`, { replace: true })
  }

  const isLoggedIn = useAuthStore(state => state.isLogin)

  const sortBy = useMemo(() => {
    const map: Record<SortLabel, 'LATEST' | 'PRICE_HIGH' | 'PRICE_LOW'> = {
      최신순: 'LATEST',
      '가격 높은 순': 'PRICE_HIGH',
      '가격 낮은 순': 'PRICE_LOW',
    }
    return map[selectedSort]
  }, [selectedSort])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, isError } =
    useInfiniteQuery<TransactionFeedResponse, Error>({
      queryKey: ['transactionFeeds', sortBy, keyword, filterState],
      queryFn: async ({ pageParam = 0 }) => {
        const selectedData =
          filterState.selectedDataRange !== null
            ? SALES_DATA_AMOUNT_OPTIONS[filterState.selectedDataRange]
            : null
        const selectedPrice =
          filterState.selectedPriceRange !== null
            ? PRICE_OPTIONS[filterState.selectedPriceRange]
            : null

        const query = {
          sortBy,
          keyword,
          telecomCompanyIds: filterState.telecomCompanyIds.map(Number),
          salesTypeIds: filterState.salesTypeIds.map(Number),
          statuses: filterState.statuses,
          minDataAmount: selectedData
            ? selectedData.minDataAmount
            : Number(filterState.appliedDataRange.min) || undefined,
          maxDataAmount: selectedData
            ? selectedData.maxDataAmount
            : Number(filterState.appliedDataRange.max) || undefined,
          minPrice: selectedPrice
            ? selectedPrice.minPrice
            : Number(filterState.appliedPriceRange.min) || undefined,
          maxPrice: selectedPrice
            ? selectedPrice.maxPrice
            : Number(filterState.appliedPriceRange.max) || undefined,
        }

        const res = await getTransactionFeeds(query, {
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

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || ''
    setKeyword(newKeyword)
  }, [searchParams])

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

    filterState.telecomCompanyIds.forEach(id => {
      params.append('telecomCompanyIds', String(id))
    })

    filterState.salesTypeIds.forEach(id => {
      params.append('salesTypeIds', String(id))
    })

    filterState.statuses.forEach(status => {
      params.append('statuses', status)
    })

    if (filterState.appliedDataRange.min && filterState.appliedDataRange.max) {
      params.set('minDataAmount', filterState.appliedDataRange.min)
      params.set('maxDataAmount', filterState.appliedDataRange.max)
    }

    if (filterState.appliedPriceRange.min && filterState.appliedPriceRange.max) {
      params.set('minPrice', filterState.appliedPriceRange.min)
      params.set('maxPrice', filterState.appliedPriceRange.max)
    }

    params.set('sortBy', selectedSort)

    if (keyword) {
      params.set('keyword', keyword)
    }

    navigate(`/posts?${params.toString()}`, { replace: true })
  }, [filterState, selectedSort, keyword, navigate])

  const showNoResultsMessage = !isLoading && !isFetching && flattenedPosts.length === 0

  return (
    <div className="flex min-h-screen gap-5 lg:gap-10">
      {/* 왼쪽 필터 바 (고정) */}
      <div className="sticky top-28 hidden h-[calc(100vh-10rem)] shrink-0 overflow-y-auto sm:block">
        <FilterBar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </div>

      {/* 오른쪽 콘텐츠 영역 (스크롤) */}
      <div className="flex-1 overflow-hidden sm:pb-20">
        <div className="flex h-full flex-col space-y-4 sm:space-y-10">
          {deviceType === 'mobile' && (
            <div className="flex flex-col">
              <Breadcrumb current="데이터 거래" />
              <MobileFilter
                appliedFilterState={mobileFilterState}
                keyword={keyword}
                onClose={() => {}}
                onApplyFilter={(newMobileFilterState: MobileFilterState) => {
                  const { sort, ...rest } = newMobileFilterState
                  setSelectedSort(sort)

                  const updatedFilterState: FilterState = {
                    ...rest,
                  }

                  setFilterState(updatedFilterState)
                }}
                onResetAllFilters={handleMobileResetAll}
                isOpen={true}
              />
              {keyword && !showNoResultsMessage && (
                <div className="shadow-tile bg-pri-100 mx-4 mt-2 flex items-center rounded-xs py-3 text-center md:hidden">
                  <p className="text-fs14 w-full px-4 text-center text-gray-800">
                    <span className="text-pri-700 font-medium">"{keyword}"</span>에 대한 검색
                    결과입니다.
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="hidden items-center justify-between gap-4 sm:flex">
            {deviceType !== 'mobile' && (
              <div className="flex flex-col gap-2">
                <h2 className="text-fs20 md:text-fs24 font-medium">데이터 거래</h2>
                {keyword && !showNoResultsMessage ? (
                  <p className="text-fs14 lg:text-fs16 hidden text-gray-800 md:block">
                    <span className="text-pri-700 font-medium">"{keyword}"</span>에 대한 검색
                    결과입니다.
                  </p>
                ) : (
                  <p className="text-fs14 lg:text-fs16 hidden text-gray-800 md:block">
                    필터를 사용해 조건에 맞는 데이터를 찾아보세요!
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center lg:gap-4">
              {isLoggedIn && (
                <Button
                  text="판매글 작성"
                  onClick={() => navigate('/post-write')}
                  disabled={isDisabledWrite}
                  className={`bg-pri-500 text-gray-10 hidden whitespace-nowrap lg:block ${isDisabledWrite ? 'button-disabled' : 'button-active'}`}
                />
              )}
              {/* 정렬 드롭다운 */}
              <DropDown
                className="z-25 w-35 lg:w-40"
                options={sortLabels}
                selected={selectedSort}
                onSelect={option => setSelectedSort(option as SortLabel)}
              />
            </div>
          </div>
          {/* 게시글 목록 */}
          {isError ? (
            <div className="text-error py-10 text-center">
              데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
            </div>
          ) : showNoResultsMessage ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
              {keyword ? (
                <>
                  <NoIcon className="text-error mb-4 h-8 w-8" />
                  <p>
                    <span className="text-pri-700 font-medium">"{keyword}"</span>에 대한 검색 결과가
                    없습니다.
                  </p>
                </>
              ) : (
                <EndOfFeedMessage type="No" text="조회된 게시글이 없습니다." />
              )}
            </div>
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
                  {Array.from({ length: 8 }).map((_, index) =>
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
                <EndOfFeedMessage />
              )}
              {hasNextPage && <div ref={observerRef} className="relative -top-80 h-1" />}
            </>
          )}
        </div>
      </div>

      {isLoggedIn && deviceType !== 'desktop' && (
        <button
          disabled={isDisabledWrite}
          onClick={() => navigate('/post-write')}
          className={`bg-pri-400 shadow-button text-gray-10 fixed right-4 bottom-7 z-50 flex items-center rounded-full px-4 py-2.5 lg:hidden ${isDisabledWrite ? 'button-disabled' : 'button-active'}`}
        >
          <PlusIcon className="h-4 w-4 pr-1" />
          글쓰기
        </button>
      )}
      <ScrollToTopButton />
    </div>
  )
}

export default PostPage
