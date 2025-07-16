import Tabs from '../components/Tabs/Tabs'

const tabData = [
  { id: 'favorites', label: '관심 거래' },
  { id: 'dataCharge', label: '데이터 충전권' },
  { id: 'eventCoupons', label: '이벤트 쿠폰함' },
  { id: 'transactionHistory', label: '거래 내역' },
  { id: 'payHistory', label: '페이 내역' },
  { id: 'reportHistory', label: '신고 내역' },
]

const MyPage = () => {
  return (
    <>
      <div className="h-[200px]">마이페이지</div>
      <Tabs tabs={tabData} defaultTabId="favorites" />
    </>
  )
}

export default MyPage
