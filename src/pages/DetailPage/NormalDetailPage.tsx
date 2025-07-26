import { allPostCardMockData } from '../../mocks/postData'
import { imageData as PostImage } from '../../constants/imageData'
import ProviderBadge from '../../components/PostCard/ProviderBadge'
import DataBadge from '../../components/Badge/Badge'
import { formatAmount, formatDataSize } from '../../utils/format'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'
import Button from '../../components/Button/Button'
import ReportStrokeIcon from '@/assets/icons/report-stroke.svg?react'
import UesrIcon from '@/assets/icons/user.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'

const NormalDetailPage = () => {
  const data = allPostCardMockData[0]

  return (
    <main>
      <div className="flex gap-7">
        {/* 이미지 */}
        <div className="relative h-full w-full max-w-75 overflow-hidden rounded-md">
          <img src={PostImage[1]} alt={'이미지'} className={`h-full w-full object-cover`} />
          {data.status !== 'active' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70">
              <span className="text-fs16 text-gray-10 font-semibold transition-transform duration-200 group-hover:scale-105">
                {data.status === 'completed' ? '거래 완료' : '기간 만료'}
              </span>
            </div>
          )}
          <div className="absolute right-0 bottom-0 h-auto w-[45%]">
            <ProviderBadge telecomCompany={'LG U+'} />
          </div>
        </div>

        {/* 내용 */}
        <div className="flex w-full max-w-164 min-w-100 flex-col justify-between gap-4 px-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <DataBadge
                label={formatDataSize(data.salesDataAmount)}
                className="text-fs18 text-gray-10 px-3.5 py-2.5 font-medium"
              />
              <span className="text-fs28">{data.title}</span>
            </div>
            <div className="text-fs20 mb-5 flex items-center gap-3 text-gray-800">
              <div className="flex items-center gap-2">
                <UesrIcon className="text-pri-300" />
                <span>{data.nickname}</span>
              </div>
              <div className="flex items-center gap-2">
                <TimeIcon />
                <span>{data.createdAt}</span>
              </div>
            </div>
            <p className="text-fs20 text-gray-800">{'제곧내'}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-fs28 flex items-center justify-between font-bold">
              <span>거래 페이</span>
              <div className="flex items-center gap-1">
                <DatchaCoinIcon className="w-8.25 md:hidden lg:block" />
                <p className="text-pri-500 font-bold">{formatAmount(3000)}</p>
              </div>
            </div>
            <div className="bg-pri-100 p-1 text-center">
              현재 시세 대비 약 <span>4.6</span>% 저렴해요!
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col justify-between">
          <div className="mt-6 flex items-end justify-end gap-1">
            <ReportStrokeIcon className="text-error" />
            <Button text="신고하기" shape="underline" className="text-gray-700" />
          </div>
          <div className="flex w-67 flex-col gap-4">
            <Button
              text={`관심 거래 ${2}`}
              className="bg-gray-10 text-pri-500 border-pri-500 text-fs20 border-2 p-5 font-medium"
            />
            <Button text="구매하기" className="bg-pri-500 text-gray-10 text-fs20 p-5 font-medium" />
          </div>
        </div>
      </div>

      {/* 관련 상품 */}
      <div></div>
    </main>
  )
}

export default NormalDetailPage
