import { useQuery } from '@tanstack/react-query'
import Graph from '../../../components/Graph/Graph'
import { getHourlyStatistics } from '../../../apis/graph'
import { transformToGraphData } from '../../../utils/graph'

const PriceGraph = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ['hourly-statistics'],
    queryFn: getHourlyStatistics,
  })

  const graphData = statistics
    ? transformToGraphData(statistics).map(entry => {
        const newEntry: Record<string, number> = {}
        Object.entries(entry).forEach(([key, value]) => {
          if (value !== null) newEntry[key] = value
        })
        return newEntry
      })
    : []

  return (
    <section className="bg-gray-10 flex w-full flex-col gap-4 px-4 py-4 sm:bg-transparent sm:px-0 md:gap-10 md:py-0">
      <h2 className="text-fs18 sm:text-fs24 lg:text-fs28 font-medium">시세 그래프</h2>

      <div className="block border-1 border-gray-200 md:hidden" />

      <div className="sm:bg-gray-10 rounded-none bg-transparent p-4 sm:rounded-md">
        {isLoading ? (
          <p className="flex min-h-78.75 items-center justify-center">
            시세 정보를 불러오는 중입니다...
          </p>
        ) : (
          <Graph type="line" data={graphData} yKeys={['LG U+', 'KT', 'SKT']} height={330} />
        )}
      </div>
    </section>
  )
}

export default PriceGraph
