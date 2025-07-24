import Card from '../../../components/Card/Card'
import Graph from '../../../components/Graph/Graph'
import ToggleText from '../../../components/Toggle/ToggleText'
import { barData } from '../../../mocks/graphData'

const VolumeGraph = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="text-fs24">거래량 그래프</h2>
        <ToggleText
          leftText="일반 판매"
          rightText="입찰 판매"
          onToggle={state => console.log('텍스트 토글 상태:', state)}
        />
      </div>

      <Card className="px-0">
        <Graph type="bar" data={barData} yKeys={['거래량']} height={328} />
      </Card>
    </section>
  )
}

export default VolumeGraph
