import { useQuery } from '@tanstack/react-query'
import FadeInUpMotion from '../../components/Animation/FadeInUpMotion'
import Badge from '../../components/Badge/Badge'
import ListTile from '../../components/ListTile/ListTile'
import { formatAmount } from '../../utils/format'
import DatchaCoin from '@/assets/icons/datcha-coin-color.svg?react'
import { getPayHistory } from '../../apis/userInfo'

const getBadgeInfo = (type: '충전' | '환전' | '구매' | '판매') => {
  if (type === '구매' || type === '판매') {
    return { label: '거래', className: 'bg-pri-400' }
  }
  if (type === '충전' || type === '환전') {
    return { label: '충전/환전', className: 'bg-pri-300' }
  }
  return { label: '', className: '' }
}

const PayHistoryPage = () => {
  const {
    data: payHistory = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['payHistory'],
    queryFn: () => getPayHistory(0, 20),
  })
  const getFormattedAmount = (type: '충전' | '환전' | '구매' | '판매', amount: number) => {
    const isIncome = type === '판매' || type === '충전'
    const sign = isIncome ? '+' : '-'
    const colorClass = isIncome ? 'text-success' : 'text-error'
    return { sign, text: formatAmount(Math.abs(amount)), colorClass }
  }

  if (isLoading) return <p>로딩중</p>
  if (isError) return <p>에러</p>
  if (payHistory.length === 0) return <p>페이 변동 내역 없음</p>

  return (
    <div className="flex flex-col gap-5">
      <ListTile type="title">
        <p>사용 유형</p>
        <p>페이 변동</p>
      </ListTile>
      <div className="flex flex-col gap-2">
        {payHistory.map((item, i) => {
          const { sign, text, colorClass } = getFormattedAmount(item.changeType, item.changePay)
          const labelText =
            item.changeType === '구매'
              ? '데이터 구매'
              : item.changeType === '판매'
                ? '데이터 판매'
                : item.changeType === '충전'
                  ? '다챠페이 충전'
                  : '다챠페이 환전'

          return (
            <FadeInUpMotion key={item.payHistoryId} custom={i} delayUnit={0.07} duration={0.3}>
              <ListTile>
                <div className="flex gap-2">
                  <Badge {...getBadgeInfo(item.changeType)} variant="default" size="medium" />
                  <p>{labelText}</p>
                </div>
                <div className={`font-medium ${colorClass} flex items-center gap-1 lg:gap-1.5`}>
                  <span className="font-medium">{sign}</span>
                  <div className="flex items-center gap-0.5 lg:gap-1">
                    <DatchaCoin className="h-4 w-4 stroke-[2.5] lg:h-5 lg:w-5" />
                    <p>{text}</p>
                  </div>
                </div>
              </ListTile>
            </FadeInUpMotion>
          )
        })}
      </div>
    </div>
  )
}

export default PayHistoryPage
