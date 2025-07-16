import { useState } from 'react'

interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  tabs: TabItem[] // 탭 목록
  defaultTabId?: string // 초기 선택 탭 ID
  onTabChange?: (tabId: string) => void // 탭 변경 시 호출 콜백
}

const Tabs = ({ tabs, defaultTabId, onTabChange }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultTabId || tabs[0]?.id)

  const handleClick = (tabId: string) => {
    setSelectedTab(tabId) // 선택된 탭 상태 변경
    if (onTabChange) {
      onTabChange(tabId) // 콜백 호출 (외부 탭 변경 감지용)
    }
  }

  return (
    <div className="w-full">
      <div className="border-pri-600 flex border-1 pt-2">
        {tabs.map(tab => {
          const isSelected = selectedTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`text-fs18 flex-1 rounded-t-md text-center leading-[1.375rem] transition duration-200 ${
                isSelected
                  ? 'bg-background text-pri-600 border-pri-600 -mt-2 border-t border-r border-l px-4 py-5 font-bold'
                  : 'text-gray-10 bg-pri-gradation-small border-gray-10 mt-0 border-t border-r border-l p-4'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div>
        <p>선택된 탭: {tabs.find(t => t.id === selectedTab)?.label}</p>
      </div>
    </div>
  )
}

export default Tabs
