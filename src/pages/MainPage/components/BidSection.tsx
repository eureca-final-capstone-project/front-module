import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Mousewheel, Pagination } from 'swiper/modules'
import PostCard from '../../../components/PostCard/PostCard'
import { getTransactionFeeds } from '../../../apis/transactionFeed'
import { transformPostCard } from '../../../utils/postCardParse'
import type { FeedSearchRequestDto, Pageable } from '../../../apis/transactionFeed'

const BidSection = () => {
  const swiperRef = useRef<SwiperClass | null>(null)

  const requestDto: FeedSearchRequestDto = {
    sortBy: 'LATEST',
    salesTypeIds: [2],
    statuses: ['ON_SALE'],
  }

  const pageable: Pageable = {
    page: 0,
    size: 10,
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['bid-posts'],
    queryFn: () => getTransactionFeeds(requestDto, pageable),
  })

  if (isLoading) {
    return (
      <section className="flex min-h-91 items-center justify-center">
        진행 중인 경매 불러오는 중...
      </section>
    )
  }

  if (isError || !data?.content) {
    return (
      <section className="flex min-h-91 items-center justify-center">
        진행 중인 경매를 불러올 수 없습니다.
      </section>
    )
  }

  if (data.content.length === 0) {
    return (
      <section className="flex min-h-91 items-center justify-center">
        진행 중인 경매가 없습니다.
      </section>
    )
  }

  const posts = data.content.map(post => transformPostCard(post, 'row'))

  return (
    <section>
      <Swiper
        modules={[Pagination, Mousewheel]}
        mousewheel={true}
        pagination={{ clickable: true }}
        direction="vertical"
        slidesPerView={2.5}
        slidesPerGroup={1}
        touchRatio={0.5}
        threshold={15}
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        className="h-91"
      >
        {posts.map((post, index) => (
          <SwiperSlide key={post.transactionFeedId} className="w-fit sm:h-auto">
            <div
              className={`h-full py-4 ${
                index !== posts.length - 1
                  ? 'mr-8 border-b-[0.5px] border-gray-200 lg:mr-12'
                  : 'mr-8 lg:mr-12'
              }`}
            >
              <PostCard
                {...post}
                type="row"
                imageWrapperClassName="sm:w-28 sm:h-28 justify-center lg:ml-8"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default BidSection
