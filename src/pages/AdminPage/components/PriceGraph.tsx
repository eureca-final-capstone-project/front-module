import Card from '../../../components/Card/Card'
import Graph from '../../../components/Graph/Graph'
import { lineData } from '../../../mocks/graphData'

const PriceGraph = () => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-fs24">시세 그래프</h2>
      <Card className="px-0">
        <Graph type="line" data={lineData} yKeys={['LG U+', 'KT', 'SKT']} height={328} />
      </Card>
    </section>
  )
}

export default PriceGraph
