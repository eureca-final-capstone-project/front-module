import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import Tabs from '../../components/Tabs/Tabs'
import FavoritesPage from './FavoritesPage'
import DataChargePage from './DataChargePage'
import EventCouponPage from './EventCouponPage'
import TransactionHistoryPage from './TransactionHistoryPage'
import PayHistoryPage from './PayHistoryPage'
import ReportHistoryPage from './ReportHistoryPage'

const tabData = [
  { id: 'favorites', label: '관심 거래', content: <FavoritesPage /> },
  { id: 'data-charge', label: '데이터 충전권', content: <DataChargePage /> },
  { id: 'event-coupons', label: '이벤트 쿠폰함', content: <EventCouponPage /> },
  { id: 'transaction-history', label: '거래 내역', content: <TransactionHistoryPage /> },
  { id: 'pay-history', label: '페이 내역', content: <PayHistoryPage /> },
  { id: 'report-history', label: '신고 내역', content: <ReportHistoryPage /> },
]

const MyPage = () => {
  const { tabId } = useParams()
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  useEffect(() => {
    if (!tabData.some(tab => tab.id === tabId)) {
      navigate('/mypage/favorites', { replace: true })
    }
  }, [tabId, navigate])

  const selected = tabData.find(tab => tab.id === tabId)
  if (!selected) {
    return null // 로딩 스피너 or 404 UI 추가 예정
  }

  if (deviceType === 'mobile') {
    return selected?.content ?? null
  }
  return (
    <>
      {/* 상단 */}
      <section>
        <div className="border-3 px-4 py-3">
          <p className="text-fs20">top area</p>
        </div>
      </section>

      {/* 탭 */}
      <Tabs
        tabs={tabData}
        defaultTabId={tabId}
        onTabChange={id => {
          console.log('탭 변경:', id)
          navigate(`/mypage/${id}`)
        }}
      />
      {/* 콘텐츠 */}
      {selected.content}
    </>
  )
}

export default MyPage
