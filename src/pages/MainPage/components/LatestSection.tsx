import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Mousewheel, Navigation, Pagination, Autoplay } from 'swiper/modules'
import PostCard from '../../../components/PostCard/PostCard'
import { getTransactionFeeds } from '../../../apis/transactionFeed'
import { transformPostCard } from '../../../utils/postCardParse'
import { useDeviceType } from '../../../hooks/useDeviceType'
import type { FeedSearchRequestDto, Pageable } from '../../../apis/transactionFeed'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import EndOfFeedMessage from '../../PostPage/components/EndOfFeedMessage'

const LatestSection = () => {
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const requestDto: FeedSearchRequestDto = {
    sortBy: 'LATEST',
    salesTypeIds: [1],
  }

  const pageable: Pageable = {
    page: 0,
    size: 10,
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['latest-posts'],
    queryFn: () => getTransactionFeeds(requestDto, pageable),
  })

  if (isLoading) {
    return <LoadingSpinner text="최신 상품을 불러오는 중..." className="min-h-91" />
  }

  if (isError || !data?.content) {
    return <EndOfFeedMessage type="No" text="최신 상품을 불러올 수 없습니다." />
  }

  const posts = data.content.map(post => transformPostCard(post, isMobile ? 'row' : 'col'))

  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Autoplay]}
        mousewheel={isMobile ? false : true}
        pagination={isMobile ? { clickable: true } : false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        direction={isMobile ? 'vertical' : 'horizontal'}
        slidesPerView={isMobile ? 2.5 : 2.5}
        slidesPerGroup={1}
        touchRatio={0.5}
        threshold={15}
        breakpoints={{
          0: {
            slidesPerView: 2.5,
            spaceBetween: 0,
            direction: 'vertical',
          },
          641: {
            slidesPerView: 3.2,
            spaceBetween: 20,
            direction: 'horizontal',
          },
          748: {
            slidesPerView: 4,
            spaceBetween: 20,
            direction: 'horizontal',
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 20,
            direction: 'horizontal',
          },
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper

          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)

          swiper.on('slideChange', () => {
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          })

          swiper.on('reachBeginning', () => {
            setIsBeginning(true)
          })

          swiper.on('reachEnd', () => {
            setIsEnd(true)
          })

          swiper.on('fromEdge', () => {
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          })
        }}
        style={{ height: isMobile ? '364px' : 'auto' }}
      >
        {posts.map((post, index) => (
          <SwiperSlide key={post.transactionFeedId} className={isMobile ? 'h-auto' : 'w-fit'}>
            <div
              className={`${isMobile ? 'h-full py-4' : ''} ${
                isMobile && index !== posts.length - 1
                  ? 'mr-8 border-b-[0.5px] border-gray-200'
                  : isMobile && index === posts.length - 1
                    ? 'mr-8'
                    : ''
              }`}
            >
              <PostCard {...post} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {!isMobile && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            disabled={isBeginning}
            onClick={() => swiperRef.current?.slidePrev()}
            className={`rounded px-3 py-0.5 text-sm text-gray-50 ${isBeginning ? 'bg-gray-300' : 'bg-pri-500 hover:bg-pri-400'}`}
          >
            ◀
          </button>
          <button
            disabled={isEnd}
            onClick={() => swiperRef.current?.slideNext()}
            className={`rounded px-3 py-0.5 text-sm text-gray-50 ${isEnd ? 'bg-gray-300' : 'bg-pri-500 hover:bg-pri-400'}`}
          >
            ▶
          </button>
        </div>
      )}
    </section>
  )
}

export default LatestSection
