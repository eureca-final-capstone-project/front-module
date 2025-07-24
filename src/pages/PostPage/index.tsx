import { useMemo, useState } from 'react'
import FilterBar from './components/FilterBar'
import PostCardGrid from './components/PostCardGrid'
import type { PostCardProps } from '../../components/PostCard/PostCard'
import DropDown from '../../components/DropDown/DropDown'
import { useDeviceType } from '../../hooks/useDeviceType'
import { SORT_BY, SortLabel } from '../../constants/sortBy'

const PostPage = () => {
  const sortLabels = SORT_BY.map(option => option.label) as SortLabel[]
  const [selectedSort, setSelectedSort] = useState<SortLabel>('최신순')
  const deviceType = useDeviceType()

  const mockPosts = useMemo((): PostCardProps[] => {
    return Array.from({ length: 20 }, (_, i) => {
      const common = {
        transactionFeedId: i + 1,
        telecomCompany: 'LG U+' as const,
        defaultImageNumber: 1,
        salesDataAmount: 1200,
        title: `데이터 팝니다 ${i + 1} 어쩌고 저쩌고`,
        nickname: `유저${i + 1}`,
        createdAt: '2시간 전',
        liked: false,
        onToggleLike: () => {},
        salesType: i % 2 === 0 ? 'normal' : 'bid',
        salesPrice: 1200 + i * 100,
        currentHeightPrice: i % 2 === 0 ? undefined : 1500 + i * 80,
        status: 'active',
      }

      if (deviceType === 'mobile') {
        return {
          type: 'row',
          page: 'default',
          ...common,
        } as PostCardProps
      }

      return {
        type: 'col',
        ...common,
      } as PostCardProps
    })
  }, [deviceType])

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
              className="z-10 w-35 lg:w-40"
              options={sortLabels}
              selected={selectedSort}
              onSelect={option => setSelectedSort(option as SortLabel)}
            />
          </div>

          {/* 게시글 목록 */}
          <PostCardGrid posts={mockPosts} />
        </div>
      </div>
    </div>
  )
}

export default PostPage
