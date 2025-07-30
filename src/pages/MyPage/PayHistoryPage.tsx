import { useQuery } from '@tanstack/react-query'
import FadeInUpMotion from '../../components/Animation/FadeInUpMotion'
import Badge from '../../components/Badge/Badge'
import ListTile from '../../components/ListTile/ListTile'
import { formatAmount } from '../../utils/format'
import DatchaCoin from '@/assets/icons/datcha-coin-color.svg?react'
import { getPayHistory, getPayHistoryDetail, PayHistoryDetailResponse } from '../../apis/userInfo'
import { useState } from 'react'
import ReceiptModal, { ReceiptProps } from '../../components/ReceiptModal/ReceiptModal'
import Button from '../../components/Button/Button'
import DatchaCoinIcon from '@/assets/icons/datcha-coin-bold.svg?react'
import { useNavigate } from 'react-router-dom'

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
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const navigate = useNavigate()
  const { data: detail, isSuccess: isDetailSuccess } = useQuery({
    queryKey: ['payHistoryDetail', selectedId],
    queryFn: () => getPayHistoryDetail(selectedId!),
    enabled: !!selectedId,
  })

  const parseToReceipt = (detail: PayHistoryDetailResponse['data']): ReceiptProps | null => {
    if (detail.chargeDetail) {
      return {
        type: 'charge',
        pay: detail.chargeDetail.chargedPay,
        info: detail.chargeDetail,
      }
    } else if (detail.exchangeDetail) {
      return {
        type: 'refund',
        pay: detail.exchangeDetail.exchangedPay,
        info: detail.exchangeDetail,
      }
    } else if (detail.transactionDetail) {
      const mappedType =
        detail.changeType === '구매' ? 'buy' : detail.changeType === '판매' ? 'sell' : 'sell'

      return {
        type: mappedType,
        pay: detail.transactionDetail.transactionPay,
        info: detail.transactionDetail,
      }
    }
    return null
  }

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

  const renderStatusFallback = () => {
    let title = ''
    let subtitle: React.ReactNode = null
    let textColor = 'text-gray-500'

    if (isLoading) {
      title = '페이 변동 내역을 불러오는 중이에요'
    } else if (isError) {
      title = '페이 변동 내역을 불러오지 못했습니다'
      subtitle = (
        <p className="text-fs12 sm:text-fs14 mt-2 text-gray-400">잠시 후 다시 시도해주세요</p>
      )
      textColor = 'text-error'
    } else {
      title = '페이 변동 내역이 존재하지 않습니다'
      subtitle = (
        <div className="text-fs12 sm:text-fs14 mt-2 text-gray-400">
          <Button
            text="데이터 거래"
            shape="underline"
            onClick={() => navigate('/posts')}
            className="text-fs12 sm:text-fs14 hover:text-pri-400 inline p-0 text-gray-400"
          />
          <span> 또는 </span>
          <Button
            text="페이 충전"
            shape="underline"
            onClick={() => navigate('/payment')}
            className="text-fs12 sm:text-fs14 hover:text-pri-400 inline p-0 text-gray-400"
          />
          <span>을 진행해보세요!</span>
        </div>
      )
    }
    return (
      <div
        className={`flex h-[20vh] flex-col items-center justify-center text-center ${textColor}`}
      >
        <DatchaCoinIcon className="h-6 w-8 sm:h-8 sm:w-10" />
        <p className="text-fs16 sm:text-fs18 pt-3 font-medium">{title}</p>
        {subtitle}
      </div>
    )
  }

  if (isLoading || isError || payHistory.length === 0) return renderStatusFallback()

  return (
    <div className="flex flex-col gap-5">
      <ListTile type="title">
        <p>사용 유형</p>
        <p>페이 변동</p>
      </ListTile>
      <div className="flex flex-col gap-2 px-5 sm:px-0">
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
              <ListTile onClick={() => setSelectedId(item.payHistoryId)}>
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
      {selectedId && isDetailSuccess && detail && (
        <ReceiptModal {...parseToReceipt(detail)!} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}

export default PayHistoryPage
