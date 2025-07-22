import { useState } from 'react'
import Button from '../../components/Button/Button'
import { useDeviceType } from '../../hooks/useDeviceType'
import CheckBox from '../../components/CheckBox/CheckBox'

const FavoritesPage = () => {
  const deviceType = useDeviceType()
  const gridColsClass = deviceType === 'mobile' ? 'grid-cols-1 bg-gray-10 p-4 ' : 'grid-cols-2'
  const [selectedType, setSelectedType] = useState<'both' | 'deal' | 'bid'>('both')
  const [checked, setChecked] = useState(false)
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
    <div className="flex flex-col gap-5">
      {/* 상단 */}
      <div className="flex items-center justify-between p-4 sm:p-0">
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
      <div className={`grid gap-4 ${gridColsClass}`}>
        <div className="flex gap-2">
          <CheckBox
            checked={checked}
            onChange={() => setChecked(prev => !prev)}
            type={deviceType === 'mobile' ? 'smallCheckBox' : 'default'}
          />
          <div></div>
        </div>
        <div className="flex gap-2">
          <CheckBox
            checked={checked}
            onChange={() => setChecked(prev => !prev)}
            type={deviceType === 'mobile' ? 'smallCheckBox' : 'default'}
          />
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage
