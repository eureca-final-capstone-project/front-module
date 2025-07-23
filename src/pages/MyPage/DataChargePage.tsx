import { useQuery } from '@tanstack/react-query'
import { useDeviceType } from '../../hooks/useDeviceType'
import DataChargeVoucher from './components/DataChargeVoucher/DataChargeVoucher'
import { getDataCoupons } from '../../apis/dataVoucher'

const useDataCoupons = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ['dataCoupons', page, size],
    queryFn: () => getDataCoupons(page, size),
    staleTime: 1000 * 60 * 3, // 3분
  })
}

const DataChargePage = () => {
  const deviceType = useDeviceType()

  const { data, isLoading, isError } = useDataCoupons()

  const gridCols = {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-3',
  }[deviceType]

  if (isLoading) return <div>로딩 중...</div>
  if (isError || !data) return <div>에러가 발생했어요.</div>

  return (
    <div>
      <div className={`grid ${gridCols} gap-4`}>
        {data.content.map(coupon => (
          <DataChargeVoucher key={coupon.userDataCouponId} coupon={coupon} />
        ))}
      </div>
    </div>
  )
}

export default DataChargePage
