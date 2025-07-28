import Graph from '../../../components/Graph/Graph'
import { lineData } from '../../../mocks/graphData'

const PriceGraph = () => {
  return (
    <section className="bg-gray-10 flex w-full flex-col gap-4 px-4 py-4 sm:bg-transparent sm:px-0 md:gap-10 md:py-0">
      <h2 className="text-fs18 sm:text-fs24 lg:text-fs28 font-medium">시세 그래프</h2>

      <div className="block border-1 border-gray-200 md:hidden" />

      <div className="sm:bg-gray-10 rounded-none bg-transparent py-4 sm:rounded-md">
        <Graph type="line" data={lineData} yKeys={['u+', 'kt', 'skt']} height={315} />
      </div>
    </section>
  )
}

export default PriceGraph
