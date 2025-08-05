import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules'
import PostCard from '../../../components/PostCard/PostCard'
import { getTransactionFeeds } from '../../../apis/transactionFeed'
import { transformPostCard } from '../../../utils/postCardParse'
import type { FeedSearchRequestDto, Pageable } from '../../../apis/transactionFeed'
import { useDeviceType } from '../../../hooks/useDeviceType'
import EndOfFeedMessage from '../../PostPage/components/EndOfFeedMessage'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'

const BidSection = () => {
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'
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
    return <LoadingSpinner text="진행 중인 경매를 불러오는 중..." className="min-h-91" />
  }

  if (isError || !data?.content) {
    return <EndOfFeedMessage type="No" text="진행 중인 경매를 불러올 수 없습니다." />
  }

  if (data.content.length === 0) {
    return <EndOfFeedMessage type="No" text="진행 중인 경매가 없어요." />
  }

  const posts = data.content.map(post => transformPostCard(post, 'row'))

  const groupedPosts = isMobile
    ? Array.from({ length: Math.ceil(posts.length / 2) }, (_, i) => posts.slice(i * 2, i * 2 + 2))
    : []

  return (
    <section>
      <Swiper
        modules={[Pagination, Mousewheel, Autoplay]}
        mousewheel={isMobile ? false : true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        direction={isMobile ? 'horizontal' : 'vertical'}
        slidesPerView={isMobile ? 1 : 2.5}
        slidesPerGroup={1}
        touchRatio={0.5}
        threshold={15}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          641: {
            slidesPerView: 2.5,
          },
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        style={{ height: isMobile ? '300px' : '' }}
        className="h-91"
      >
        {isMobile
          ? // 모바일: 2개씩 묶어서 한 슬라이드에 렌더링
            groupedPosts.map((pair, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full flex-col gap-6">
                  {pair.map(post => (
                    <div key={post.transactionFeedId}>
                      <PostCard {...post} type="row" />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))
          : posts.map((post, index) => (
              <SwiperSlide key={post.transactionFeedId} className="h-auto">
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
