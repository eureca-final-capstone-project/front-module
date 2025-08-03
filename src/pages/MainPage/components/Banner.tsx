import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { bannerData } from '../../../constants/bannerData'

const Banner = () => {
  return (
    <div className="relative mx-auto mb-6 max-w-[1280px] sm:mb-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerGroup={1}
        slidesPerView={1}
        touchRatio={1}
        threshold={10}
        spaceBetween={24}
        initialSlide={0}
      >
        {bannerData.map(banner => (
          <SwiperSlide key={banner.id}>
            <a href={banner.link}>
              <img
                src={banner.imageUrl}
                alt={banner.alt}
                loading="lazy"
                className="sm:rounded-custom-s w-full rounded-none object-cover transition-transform duration-300"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Banner
