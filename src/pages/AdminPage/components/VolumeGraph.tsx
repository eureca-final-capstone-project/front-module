import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Card from '../../../components/Card/Card'
import Graph from '../../../components/Graph/Graph'
import ToggleText from '../../../components/Toggle/ToggleText'
import { getVolumeData } from '../../../apis/admin/dashboard'
import { useState } from 'react'

interface VolumeItem {
  date: string
  hour: number | null
  saleVolume: number
}

const VolumeGraph = () => {
  const [salesType, setSalesType] = useState('일반 판매')

  const {
    data: statistics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['volume', salesType],
    queryFn: () => getVolumeData(salesType),
    placeholderData: keepPreviousData,
  })

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>
  if (isError || !statistics?.data) return <div>데이터를 불러오지 못했습니다.</div>

  const { volumes } = statistics.data
  const formattedVolumes = volumes.map((item: VolumeItem) => ({
    ...item,
    date: item.date.slice(5).replace('-', '.'),
  }))

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="text-fs24">거래량 그래프</h2>
        <ToggleText
          leftText="일반 판매"
          rightText="입찰 판매"
          onToggle={setSalesType}
          selectedText={salesType}
        />
      </div>

      <Card className="px-4">
        <Graph
          type="bar"
          data={formattedVolumes}
          name="거래량"
          xKey={salesType === '일반 판매' ? 'hour' : 'date'}
          yKeys={['saleVolume']}
          height={328}
        />
      </Card>
    </section>
  )
}

export default VolumeGraph
