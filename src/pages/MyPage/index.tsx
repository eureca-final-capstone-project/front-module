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
import InfoCard from './components/InfoCard/InfoCard'
import Badge from '../../components/Badge/Badge'
import Button from '../../components/Button/Button'

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
    return selected?.content ? <div className="p-4">{selected.content}</div> : null
  }
  return (
    <>
      {/* 상단 */}
      <section className="mb-10 flex h-[280px] justify-between gap-5">
        <InfoCard title="내 정보" showEditBtn={true}>
          <div>
            <h3 className="text-fs18 font-medium">닉네임네임 닉네임</h3>
            <div className="text-fs14 mt-7 flex flex-col gap-3 text-gray-700">
              <p>email@email.com</p>
              <div className="flex items-center gap-[0.375rem]">
                <Badge
                  size="small"
                  className="bg-lguplus w-fit py-1 leading-[100%]"
                  label="LG U+"
                />
                <p>010-0000-0000</p>
              </div>
            </div>
          </div>
        </InfoCard>
        <InfoCard title="내 데이터 정보">
          <>
            <div className="flex flex-col gap-3">
              <div className="text-fs18 flex w-full justify-between font-medium text-gray-900">
                <p>보유 데이터</p>
                <p>1.9GB</p>
              </div>
              <div className="text-fs18 flex w-full justify-between font-medium text-gray-900">
                <p>구매 데이터</p>
                <p>600MB</p>
              </div>
              <div className="text-fs18 flex w-full justify-between font-medium text-gray-900">
                <p>판매 가능 데이터</p>
                <p>300MB</p>
              </div>
            </div>
            <Button
              text="데이터 전환하기"
              className="text-fs18 border-pri-600 text-pri-600 border-[1.7px] font-medium"
            />
          </>
        </InfoCard>
        <InfoCard title="내 다챠페이 정보">
          <div className="text-fs18 flex w-full justify-between font-medium text-gray-900">
            <p>보유 다챠페이</p>
            <p>10,400원</p>
          </div>
          <div className="flex gap-4">
            <Button
              text="충전하기"
              className="text-fs18 border-pri-600 text-pri-600 w-full border-[1.7px] font-medium"
            />
            <Button
              text="환전하기"
              className="text-fs18 border-pri-600 text-pri-600 w-full border-[1.7px] font-medium"
            />
          </div>
        </InfoCard>
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
      <div className="px-5 py-8">{selected.content}</div>
    </>
  )
}

export default MyPage
