import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import PostCard from '../../../components/PostCard/PostCard'
import { getRecommendedPosts } from '../../../apis/recommend'
import { transformPostCard } from '../../../utils/postCardParse'
import type { ServerPostCard } from '../../../utils/postCardParse'
import { useDeviceType } from '../../../hooks/useDeviceType'

const RecommendSection = () => {
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const {
    data: serverPosts,
    isLoading,
    isError,
  } = useQuery<ServerPostCard[]>({
    queryKey: ['recommended-posts'],
    queryFn: getRecommendedPosts,
  })

  if (isLoading) {
    return <div className="flex min-h-91 items-center justify-center">추천 상품 불러오는 중...</div>
  }

  if (isError || !serverPosts) {
    return (
      <div className="flex min-h-91 items-center justify-center">
        추천 상품을 불러올 수 없습니다.
      </div>
    )
  }

  const posts = serverPosts.map(post =>
    transformPostCard(post, deviceType === 'mobile' ? 'row' : 'col')
  )

  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={isMobile ? { clickable: true } : false}
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

export default RecommendSection
