import { useState } from 'react'
import Button from '../../components/Button/Button'
import { useDeviceType } from '../../hooks/useDeviceType'

const FavoritesPage = () => {
  const [selectedType, setSelectedType] = useState<'both' | 'deal' | 'bid'>('both')
  const deviceType = useDeviceType()
  const gridColsClass = deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'

  const buttonOptions = [
    { label: '전체', value: 'both' },
    { label: '일반 거래', value: 'deal' },
    { label: '입찰 거래', value: 'bid' },
  ] as const
  const deleteOptions = [
    { label: '선택 삭제', value: 'delete' },
    { label: '전체 삭제', value: 'delete-all' },
  ] as const
  return (
    <>
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {buttonOptions.map(({ label, value }) => {
            const isSelected = selectedType === value
            return (
              <Button
                key={value}
                text={label}
                smallPadding
                noShadow={true}
                onClick={() => setSelectedType(value)}
                className={`text-fs14 lg:text-fs16 border-1 ${
                  isSelected
                    ? 'text-pri-500 border-pri-500'
                    : 'hover:text-pri-500 border-gray-300 text-gray-300'
                }`}
              />
            )
          })}
        </div>
        <div className="flex gap-5">
          {deleteOptions.map(({ label, value }) => (
            <Button
              key={value}
              text={label}
              onClick={() => {
                if (value === 'delete') {
                  // 모달
                } else if (value === 'delete-all') {
                  // 모달
                }
              }}
              shape="underline"
              className="hover:text-pri-800 text-fs12 lg:text-fs14 text-gray-700"
            />
          ))}
        </div>
      </div>
      {/* 콘텐츠 */}
      <div className={`grid gap-4 ${gridColsClass}`}></div>
    </>
  )
}

export default FavoritesPage
