import Button from '../../../../components/Button/Button'

interface ButtonOption {
  label: string
  value: string
}

interface ButtonHeaderProps {
  buttonOptions: readonly ButtonOption[]
  selectedType: string
  onSelectType: (value: string) => void
  onOpenDeleteModal: (modalType: 'delete') => void
  onSelectAll: () => void
  allChecked: boolean
  hideActionButtons?: boolean
}

const ButtonHeader = ({
  buttonOptions,
  selectedType,
  onSelectType,
  onOpenDeleteModal,
  onSelectAll,
  allChecked,
  hideActionButtons,
}: ButtonHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 sm:p-0">
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
      {!hideActionButtons && (
        <div className="flex gap-3 sm:gap-5">
          <Button
            text="선택 삭제"
            onClick={() => onOpenDeleteModal('delete')}
            shape="underline"
            className="hover:text-pri-800 text-fs12 lg:text-fs14 text-gray-700"
          />
          <Button
            text={allChecked ? '선택 해제' : '전체 선택'}
            onClick={onSelectAll}
            shape="underline"
            className="hover:text-pri-800 text-fs12 lg:text-fs14 text-gray-700"
          />
        </div>
      )}
    </div>
  )
}

export default ButtonHeader
