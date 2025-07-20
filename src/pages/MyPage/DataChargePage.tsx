import { useDeviceType } from '../../hooks/useDeviceType'
import DataChargeVoucher from './components/DataChargeVoucher/DataChargeVoucher'

const DataChargePage = () => {
  const deviceType = useDeviceType()
  const vouchers = Array(5).fill(null)

  const gridCols = {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-3',
  }[deviceType]

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {vouchers.map((_, index) => (
        <DataChargeVoucher key={index} />
      ))}
    </div>
  )
}

export default DataChargePage
