import { useQuery } from '@tanstack/react-query'
import { useDeviceType } from '../../hooks/useDeviceType'
import DataChargeVoucher from './components/DataChargeVoucher/DataChargeVoucher'
import { DataCoupon, getDataCoupons } from '../../apis/dataVoucher'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import DataChargeIcon from '@/assets/icons/data-charge.svg?react'

const sortByStatusAndCreatedAt = (a: DataCoupon, b: DataCoupon) => {
  const getPriority = (statusCode: string) => {
    if (statusCode === 'ISSUED') return 0
    if (statusCode === 'USED') return 1
    if (statusCode === 'EXPIRED') return 2
    return 3
  }

  const statusPriorityA = getPriority(a.status.code)
  const statusPriorityB = getPriority(b.status.code)

  if (statusPriorityA !== statusPriorityB) {
    return statusPriorityA - statusPriorityB
  }

  return b.userDataCouponId - a.userDataCouponId
}

const useDataCoupons = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ['dataCoupons', page, size],
    queryFn: () => getDataCoupons(page, size),
    staleTime: 1000 * 60 * 3,
  })
}

const DataChargePage = () => {
  const deviceType = useDeviceType()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useDataCoupons()
  const coupons = (data?.content ?? []).slice().sort(sortByStatusAndCreatedAt)

  const gridCols = {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-3',
  }[deviceType]

  if (isLoading || isError || coupons.length === 0) {
    let title = ''
    let subtitle: React.ReactNode = null
    let textColor = 'text-gray-500'

    if (isLoading) {
      title = '데이터 충전권을 불러오는 중이에요'
    } else if (isError) {
      title = '데이터 충전권을 불러오지 못했습니다'
      subtitle = (
        <p className="text-fs12 sm:text-fs14 mt-2 text-gray-400">잠시 후 다시 시도해주세요</p>
      )
      textColor = 'text-error'
    } else {
      title = '보유하신 데이터 충전권이 없습니다'
      subtitle = (
        <div className="text-fs12 sm:text-fs14 mt-2 text-gray-400">
          <Button text="데이터 거래" shape="underline" onClick={() => navigate('/posts')} />
          <span>를 진행하시고 충전권 발급받아보세요!</span>
        </div>
      )
    }

    return (
      <div
        className={`flex h-[20vh] flex-col items-center justify-center text-center ${textColor}`}
      >
        <DataChargeIcon className="h-6 w-8 sm:h-8 sm:w-10" />
        <p className="text-fs16 sm:text-fs18 pt-3 font-medium">{title}</p>
        {subtitle}
      </div>
    )
  }

  return (
    <div>
      <div className={`grid ${gridCols} gap-5 px-4 sm:p-0`}>
        {coupons.map(coupon => (
          <DataChargeVoucher key={coupon.userDataCouponId} coupon={coupon} />
        ))}
      </div>
    </div>
  )
}

export default DataChargePage
