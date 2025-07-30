import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'

import Profile from './components/InfoCard/Profile'
import DataStatus from './components/InfoCard/DataStatus'
import PayStatus from './components/InfoCard/PayStatus'

import Tabs from '../../components/Tabs/Tabs'

import FavoritesPage from './FavoritesPage'
import DataChargePage from './DataChargePage'
import EventCouponPage from './EventCouponPage'
import TransactionHistoryPage from './TransactionHistoryPage'
import PayHistoryPage from './PayHistoryPage'
import ReportHistoryPage from './ReportHistoryPage'
import { useScrollStore } from '../../store/scrollStore'

const tabData = [
  { id: 'data-charge', label: '데이터 충전권', content: <DataChargePage /> },
  { id: 'favorites', label: '관심 거래', content: <FavoritesPage /> },
  { id: 'event-coupons', label: '이벤트 쿠폰함', content: <EventCouponPage /> },
  { id: 'transaction-history', label: '거래 내역', content: <TransactionHistoryPage /> },
  { id: 'pay-history', label: '페이 내역', content: <PayHistoryPage /> },
  { id: 'report-history', label: '신고 내역', content: <ReportHistoryPage /> },
]

const MyPage = () => {
  const { tabId } = useParams()
  const navigate = useNavigate()
  const deviceType = useDeviceType()
  const contentRef = useRef<HTMLDivElement>(null)

  const shouldScrollToBottom = useScrollStore(s => s.scrollToBottom)
  const resetScrollFlag = useScrollStore(s => s.reset)
  const triggerScrollToBottom = useScrollStore(s => s.triggerScrollToBottom)

  useEffect(() => {
    if (shouldScrollToBottom) {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' })
      resetScrollFlag()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [tabId])

  useEffect(() => {
    if (!tabData.some(tab => tab.id === tabId)) {
      navigate('/mypage/data-charge', { replace: true })
    }
  }, [tabId, navigate])

  const selected = tabData.find(tab => tab.id === tabId)
  if (!selected) {
    return null // 로딩 스피너 or 404 UI 추가 예정
  }

  if (deviceType === 'mobile') {
    return selected?.content ? <div>{selected.content}</div> : null
  }
  return (
    <div className="">
      {/* 상단 */}
      <section className="mb-10 flex h-[280px] justify-between gap-3 lg:gap-5">
        <Profile />
        <DataStatus />
        <PayStatus />
      </section>

      {/* 탭 */}
      <Tabs
        tabs={tabData}
        defaultTabId={tabId}
        onTabChange={id => {
          triggerScrollToBottom()
          navigate(`/mypage/${id}`)
        }}
      />
      {/* 콘텐츠 */}
      <div ref={contentRef} className="px-5 py-8">
        {selected.content}
      </div>
    </div>
  )
}

export default MyPage
