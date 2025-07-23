import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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

  useEffect(() => {
    if (defaultTabId && defaultTabId !== selectedTab) {
      setSelectedTab(defaultTabId)
    }
  }, [defaultTabId])

  const handleClick = (tabId: string) => {
    setSelectedTab(tabId) // 선택된 탭 상태 변경
    if (onTabChange) {
      onTabChange(tabId) // 콜백 호출 (외부 탭 변경 감지용)
    }
  }

  return (
    <div className="w-full">
      <div className="relative flex items-end">
        {tabs.map(tab => {
          const isSelected = selectedTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className="flex-1 outline-none"
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`cursor-pointer rounded-t-md px-2 pb-4 lg:px-4 ${
                  isSelected
                    ? 'bg-background text-pri-600 border-pri-600 border-x-2 border-t-2 pt-6 font-bold'
                    : 'bg-pri-gradation-small text-gray-10 border-gray-10 pt-4'
                } border-x border-t`}
              >
                <span className="text-fs14 lg:text-fs18">{tab.label}</span>
              </motion.div>
            </button>
          )
        })}
      </div>

      {/* <div className="mt-4">
        <p>선택된 탭: {tabs.find(t => t.id === selectedTab)?.label}</p>
      </div> */}
    </div>
  )
}

export default Tabs
