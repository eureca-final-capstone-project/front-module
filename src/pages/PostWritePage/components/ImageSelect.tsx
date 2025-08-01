import { Controller, useFormContext } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imagePost } from '../../../constants/imageData'
import { Mousewheel } from 'swiper/modules'

interface ImageSelectProps {
  transactionType: number
  unit: 'MB' | 'GB'
}

const ImageSelect = ({ transactionType, unit }: ImageSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const filteredImages = [
    ...imagePost.filter(img => img.type === transactionType && img.unit === unit),
    ...imagePost.filter(img => img.type === transactionType && img.unit === ''),
    ...imagePost.filter(img => img.type === 0 && img.unit === unit),
    ...imagePost.filter(img => img.type === 0 && img.unit === ''),
  ]

  return (
    <Controller
      name="defaultImageNumber"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div>
          <Swiper
            slidesPerView={4.5}
            spaceBetween={16}
            className="w-full"
            modules={[Mousewheel]}
            mousewheel={true}
          >
            {filteredImages.map(img => {
              const isSelected = img.id === field.value
              return (
                <SwiperSlide
                  key={img.id}
                  className={`cursor-pointer overflow-hidden rounded-sm ${isSelected ? 'border-pri-400 border-3' : ''} transition-border max-h-30 max-w-30 duration-300 ease-in-out`}
                  onClick={() => field.onChange(img.id)}
                >
                  <img src={img.src} alt={img.alt} />
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
