import Badge from '../../../components/Badge/Badge'
import { getTelecomBadgeColor } from '../../../utils/telecom'

const CarrierField = () => {
  return <Badge label={'LG U+'} className={getTelecomBadgeColor('LG U+')} size="small" />
}

export default CarrierField
