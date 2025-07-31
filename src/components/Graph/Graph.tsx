import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useDeviceType } from '../../hooks/useDeviceType'

interface DataPoint {
  [key: string]: string | number
}

interface GraphProps {
  type: 'line' | 'bar'
  data: DataPoint[]
  width?: number | string
  height?: number | string
  xKey?: string
  yKeys?: string[]
  colors?: Record<string, string>
  name?: string
}

const colors: Record<string, string> = {
  default: '#2F8C8E',
  'LG U+': '#E6007E',
  KT: '#3617CE',
  SKT: '#D71826',
}

const Graph = ({
  type,
  data,
  width = '100%',
  height = 300,
  xKey = 'hour',
  yKeys,
  name,
}: GraphProps) => {
  const deviceType = useDeviceType()

  const isMobile = deviceType === 'mobile'

  if (!data || data.length === 0) return <p>데이터 없음</p>

  const renderKeys = yKeys ?? Object.keys(data[0]).filter(key => key !== xKey)

  const commonChart = {
    data,
    margin: { top: 4, right: 4, left: 0, bottom: 0 },
  }

  return (
    <ResponsiveContainer width={width} height={height}>
      {type === 'line' ? (
        <LineChart {...commonChart}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey={xKey}
            interval={0}
            tick={{ fontSize: isMobile ? 12 : 14, fontWeight: 500 }}
            tickFormatter={(_, index) => {
              return index % 4 === 0 ? `${data[index][xKey]}시` : ''
            }}
          />
          <YAxis
            tick={{ fontSize: isMobile ? 12 : 14, fontWeight: 500 }}
            tickFormatter={value => `${value}원`}
          />
          <Tooltip formatter={value => `${value}원`} labelFormatter={label => `${label}시`} />
          <Legend
            wrapperStyle={{
              paddingTop: isMobile ? 4 : 8,
              fontSize: isMobile ? 12 : 14,
            }}
          />
          {renderKeys.map(key => (
            <Line
              key={key}
              type="linear"
              dataKey={key}
              stroke={colors[key] ?? colors['default']}
              activeDot={{ r: 6 }}
              dot={{ r: 3, fill: colors[key] ?? colors['default'] }}
            />
          ))}
        </LineChart>
      ) : (
        <BarChart {...commonChart}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip formatter={value => `${value}`} labelFormatter={label => `${label}시`} />
          <Legend />
          {renderKeys.map(key => (
            <Bar key={key} dataKey={key} name={name} fill={colors[key] ?? colors['default']} />
          ))}
        </BarChart>
      )}
    </ResponsiveContainer>
  )
}

export default Graph
