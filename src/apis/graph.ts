import client from './client'

export interface CarrierPrice {
  carrierName: 'SKT' | 'KT' | 'LG U+'
  pricePerMb: number | null
}

export interface HourlyStatistic {
  date: string
  hour: number
  pricesByCarrier: CarrierPrice[]
}

export interface StatisticResponse {
  statusCode: number
  message: string
  data: HourlyStatistic[]
}

export const getHourlyStatistics = async (): Promise<HourlyStatistic[]> => {
  const res = await client.get<StatisticResponse>('/statistic')
  return res.data.data
}
