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
    <section className="bg-gray-10 flex w-full flex-col gap-4 sm:bg-transparent md:gap-10">
      <h2 className="text-fs18 sm:text-fs24 lg:text-fs28 px-4 pt-4 font-medium sm:px-0 md:pt-0">
        시세 그래프
      </h2>

      <div className="mx-4 block border-1 border-gray-200 sm:mx-0 md:hidden" />

      <div className="sm:bg-gray-10 rounded-none bg-transparent p-4 sm:rounded-md">
        {isLoading ? (
          <p className="flex min-h-78.75 items-center justify-center">
            시세 정보를 불러오는 중입니다...
          </p>
        ) : (
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <Graph type="line" data={graphData} yKeys={['LG U+', 'KT', 'SKT']} height={330} />{' '}
            <p className="bg-pri-100 md:text-fs16 text-fs14 rounded-xs py-1 text-center text-gray-800">
              통신사의 <span className="text-pri-500 font-semibold">시간 당 100MB </span>
              평균 시세 정보입니다.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PriceGraph
