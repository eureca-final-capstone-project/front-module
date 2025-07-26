import { Controller, useFormContext } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react'

const ImageSelect = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name="defaultImageNumber"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div>
          <Swiper slidesPerView={4.5} spaceBetween={16} className="w-full">
            {[...Array(9)].map((_, idx) => {
              const isSelected = idx === field.value
              return (
                <SwiperSlide
                  key={idx}
                  className={`cursor-pointer overflow-hidden rounded-sm ${isSelected ? 'border-pri-500 border-4' : ''} transition-border max-h-30 max-w-30 duration-300 ease-in-out`}
                  onClick={() => field.onChange(idx)}
                >
                  <img
                    src={`https://swiperjs.com/demos/images/nature-${idx + 1}.jpg`}
                    alt={`nature-${idx + 1}`}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
          <span className="text-error text-fs12 p-1">
            {errors.defaultImageNumber?.message?.toString() || ''}
          </span>
        </div>
      )}
    />
  )
}

export default ImageSelect
