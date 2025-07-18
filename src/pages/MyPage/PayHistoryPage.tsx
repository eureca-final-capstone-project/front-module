import Badge from '../../components/Badge/Badge'
import ListTile from '../../components/ListTile/ListTile'

const dummyPayHistory = [
  { id: 1, type: '데이터 구매', amount: 2500 },
  { id: 2, type: '데이터 판매', amount: 1500 },
  { id: 3, type: '다챠페이 충전', amount: 10000 },
  { id: 4, type: '다챠페이 환전', amount: 3000 },
]
const getBadgeInfo = (type: string) => {
  if (type === '데이터 구매' || type === '데이터 판매') {
    return { label: '거래', className: 'bg-pri-400' }
  }
  if (type === '다챠페이 충전' || type === '다챠페이 환전') {
    return { label: '충전/환전', className: 'bg-pri-300' }
  }
  return { label: '', className: '' }
}
const PayHistoryPage = () => {
  const getFormattedAmount = (type: string, amount: number) => {
    const isIncome = type === '데이터 판매' || type === '다챠페이 충전'
    const sign = isIncome ? '+' : '-'
    const colorClass = isIncome ? 'text-success' : 'text-error'
    return { text: `${sign} ${amount.toLocaleString()}원`, colorClass }
  }
  return (
    <div className="flex flex-col gap-5">
      <ListTile type="title">
        <p>사용 유형</p>
        <p>페이 변동</p>
      </ListTile>
      <div className="flex flex-col gap-2">
        {dummyPayHistory.map(item => {
          const { text, colorClass } = getFormattedAmount(item.type, item.amount)
          return (
            <ListTile key={item.id}>
              <div className="flex gap-2">
                <Badge {...getBadgeInfo(item.type)} variant="default" size="medium" />
                <p>{item.type}</p>
              </div>
              <p className={`${colorClass} font-medium`}>{text}</p>
            </ListTile>
          )
        })}
      </div>
    </div>
  )
}

export default PayHistoryPage
