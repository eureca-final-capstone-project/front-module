import { HourlyStatistic } from '../apis/graph'

export const transformToGraphData = (data: HourlyStatistic[]) => {
  return data.map(item => {
    const entry: Record<string, number | null> = { hour: item.hour }
    item.pricesByCarrier.forEach(carrier => {
      if (carrier.carrierName === 'SKT') entry['SKT'] = carrier.pricePerMb
      if (carrier.carrierName === 'KT') entry['KT'] = carrier.pricePerMb
      if (carrier.carrierName === 'LG U+') entry['LG U+'] = carrier.pricePerMb
    })
    return entry
  })
}
