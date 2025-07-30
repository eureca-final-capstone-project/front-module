import { HourlyStatistic } from '../apis/graph'

export const transformToGraphData = (data: HourlyStatistic[]) => {
  if (data.length === 0) return []

  const latestDate = data.map(d => d.date).sort((a, b) => (a > b ? -1 : 1))[0]
  const filteredByDate = data.filter(d => d.date === latestDate)

  const sorted = filteredByDate.sort((a, b) => b.hour - a.hour)

  const limited = sorted.slice(0, 12)

  return limited
    .sort((a, b) => a.hour - b.hour)
    .map(item => {
      const entry: Record<string, number | null> = { hour: item.hour }
      item.pricesByCarrier.forEach(carrier => {
        entry[carrier.carrierName] = carrier.pricePerMb
      })
      return entry
    })
}
