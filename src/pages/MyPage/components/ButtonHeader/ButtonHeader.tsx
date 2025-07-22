// import { Dispatch, SetStateAction } from 'react'
import Button from '../../../../components/Button/Button'

const deleteOptions = [
  { label: '선택 삭제', value: 'delete' },
  { label: '전체 삭제', value: 'delete-all' },
] as const

interface ButtonOption {
  label: string
  value: string
}

interface ButtonHeaderProps {
  buttonOptions: readonly ButtonOption[]
  selectedType: string
  onSelectType: (value: string) => void
  onOpenDeleteModal: (modalType: (typeof deleteOptions)[number]['value']) => void
}

const ButtonHeader = ({
  buttonOptions,
  selectedType,
  onSelectType,
  onOpenDeleteModal,
}: ButtonHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 sm:p-0">
      <div className="flex gap-2 sm:gap-3">
        {buttonOptions.map(({ label, value }) => {
          const isSelected = selectedType === value
          return (
            <Button
              key={value}
              text={label}
              smallPadding
              noShadow
              onClick={() => onSelectType(value)}
              className={`text-fs14 lg:text-fs16 border-1 ${
                isSelected
                  ? 'text-pri-500 border-pri-500'
                  : 'hover:text-pri-500 border-gray-300 text-gray-300'
              }`}
            />
          )
        })}
      </div>
      <div className="flex gap-3 sm:gap-5">
        {deleteOptions.map(({ label, value }) => (
          <Button
            key={value}
            text={label}
            onClick={() => onOpenDeleteModal(value)}
            shape="underline"
            className="hover:text-pri-800 text-fs12 lg:text-fs14 text-gray-700"
          />
        ))}
      </div>
    </div>
  )
}

export default ButtonHeader
