import { Controller, useFormContext } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imagePost } from '../../../constants/imageData'

interface ImageSelectProps {
  transactionType: number
}

const ImageSelect = ({ transactionType }: ImageSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const filteredImages = [
    ...imagePost.filter(img => img.option === transactionType),
    ...imagePost.filter(img => img.option === 0),
  ]

  return (
    <Controller
      name="defaultImageNumber"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div>
          <Swiper slidesPerView={4.5} spaceBetween={16} className="w-full">
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
