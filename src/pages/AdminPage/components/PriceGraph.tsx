import { useQuery } from '@tanstack/react-query'
import Card from '../../../components/Card/Card'
import Graph from '../../../components/Graph/Graph'
import { getHourlyStatistics } from '../../../apis/graph'
import { transformToGraphData } from '../../../utils/graph'

const PriceGraph = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ['hourly-statistics'],
    queryFn: getHourlyStatistics,
  })

  const graphData = statistics ? transformToGraphData(statistics) : []

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-fs24">시세 그래프</h2>
      <Card className="px-4">
        {isLoading ? (
          <p className="flex min-h-75 items-center justify-center">
            시세 정보를 불러오는 중입니다...
          </p>
        ) : (
          <Graph type="line" data={graphData} yKeys={['LG U+', 'KT', 'SKT']} height={328} />
        )}
      </Card>
    </section>
  )
}

export default PriceGraph
