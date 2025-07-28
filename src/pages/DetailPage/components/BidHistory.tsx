import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import ListTile from '../../../components/ListTile/ListTile'
import RefreshIcon from '@/assets/icons/refresh.svg?react'
import DatchaCoinIcon from '@/assets/icons/datcha-coin-color.svg?react'
import { formatRelativeTime } from '../../../utils/time'
import { formatAmount } from '../../../utils/format'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDeviceType } from '../../../hooks/useDeviceType'
import { getBidHistory, Bids } from '../../../apis/transactionFeedDetail'
import FadeInUpMotion from '../../../components/Animation/FadeInUpMotion'

const BidHistory = () => {
  const deviceType = useDeviceType()
  const { transactionFeedId } = useParams()

  const {
    data: bids = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['bidHistory', transactionFeedId],
    queryFn: () => getBidHistory(Number(transactionFeedId)),
    enabled: !!transactionFeedId,
    select: (data): Bids[] => data ?? [],
  })

  const handleRefresh = () => {
    refetch()
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <ListTile
          type="title"
          className="shadow-bid-history bg-gray-10 z-5 px-4 py-4 md:px-5.5 md:py-5.5"
        >
          <p className="lg:text-fs18 animate-pulse text-gray-800">입찰 내역을 불러오는 중...</p>
        </ListTile>
      )
    }

    if (!bids || bids.length === 0) {
      return (
        <ListTile
          type="title"
          className="shadow-bid-history bg-gray-10 z-5 px-4 py-4 md:px-5.5 md:py-5.5"
        >
          <p className="lg:text-fs18 text-gray-800">
            아직 입찰 내역이 없습니다. 첫 입찰자가 되어보세요!
          </p>
        </ListTile>
      )
    }

    const [topBid, ...otherBids] = bids

    return (
      <>
        {/* 고정된 현재 입찰 히스토리 */}
        {topBid && (
          <FadeInUpMotion custom={0} delayUnit={0.07} duration={0.3}>
            <ListTile
              key={topBid.bidId}
              type="title"
              className="shadow-bid-history bg-gray-10 z-5 px-4 py-4 md:px-5.5 md:py-5.5"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1">
                  <DatchaCoinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="text-pri-600 text-fs16 sm:text-fs18 lg:text-fs22 font-semibold">
                    {formatAmount(topBid.bidAmount)}
                  </span>
                </div>
                <div className="sm:text-fs18 text-fs16 lg:text-fs20 font-medium">
                  {topBid.bidderNickname}
                </div>
                <div className="sm:text-fs18 text-fs16 lg:text-fs20 text-end font-medium">
                  {formatRelativeTime(topBid.bidAt)}
                </div>
              </div>
            </ListTile>
          </FadeInUpMotion>
        )}

        {/* 이전 입찰 히스토리 */}
        {otherBids.length > 0 && (
          <div className="z-4 mx-1 mt-2 h-[250px] overflow-y-hidden md:h-[277px]">
            <Swiper
              direction="vertical"
              slidesPerView={deviceType == 'mobile' ? 4.6 : 4.3}
              spaceBetween={4}
              slidesPerGroup={1}
              touchRatio={0.5}
              threshold={5}
              mousewheel
              className="h-full"
              breakpoints={{
                0: {
                  slidesPerView: 4.6,
                  spaceBetween: 4,
                },
                768: {
                  slidesPerView: 4.3,
                  spaceBetween: 4,
                },
              }}
            >
              {otherBids.map((bid, index) => (
                <SwiperSlide key={bid.bidId}>
                  <FadeInUpMotion custom={index + (topBid ? 1 : 0)} delayUnit={0.07} duration={0.3}>
                    <ListTile
                      type="title"
                      className="bg-gray-10 shadow-tile px-4 py-4 md:px-5 md:py-5"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DatchaCoinIcon className="text-gray-700" />
                          <span className="text-fs14 md:text-fs16 text-gray-700">
                            {formatAmount(bid.bidAmount)}
                          </span>
                        </div>
                        <div className="text-fs14 md:text-fs16 text-gray-700">
                          {bid.bidderNickname}
                        </div>
                        <div className="text-fs14 md:text-fs16 text-end text-gray-700">
                          {formatRelativeTime(bid.bidAt)}
                        </div>
                      </div>
                    </ListTile>
                  </FadeInUpMotion>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </>
    )
  }

  return (
    <section className="bg-gray-10 flex w-full flex-col gap-4 px-4 py-4 sm:bg-transparent sm:px-0 md:gap-10 md:py-0">
      {/* 상단 타이틀 */}
      <div className="flex items-center justify-between">
        <h2 className="text-fs18 sm:text-fs24 lg:text-fs28 font-medium">입찰 히스토리</h2>
        <button onClick={handleRefresh} aria-label="입찰 내역 새로고침">
          <RefreshIcon className="hover:text-pri-500 h-4 w-4 text-gray-800 transition duration-200 hover:rotate-90 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="block border-1 border-gray-200 md:hidden" />

      <div className="flex flex-col gap-1">{renderContent()}</div>
    </section>
  )
}

export default BidHistory
