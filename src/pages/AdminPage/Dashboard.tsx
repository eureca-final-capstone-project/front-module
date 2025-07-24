import PriceGraph from './components/PriceGraph'
import SystemManagement from './components/SystemManagement'
import VolumeGraph from './components/VolumeGraph'

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <SystemManagement />
      <PriceGraph />
      <VolumeGraph />
    </div>
  )
}

export default Dashboard
