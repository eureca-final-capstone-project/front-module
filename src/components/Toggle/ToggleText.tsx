interface ToggleTextProps {
  leftText: string
  rightText: string
  selectedText: string
  onToggle?: (selectedText: string) => void
}

const ToggleText = ({ leftText, rightText, selectedText, onToggle }: ToggleTextProps) => {
  const isSelected = (text: string) => selectedText === text

  return (
    <div className="relative h-8 w-50 overflow-hidden rounded-xs bg-gray-100 p-1 select-none">
      <div
        className={`bg-gray-10 absolute top-1 left-1 h-6 w-[calc(50%-0.25rem)] rounded-xs shadow-md transition-transform duration-300 ease-in-out ${
          isSelected(leftText) ? 'translate-x-0' : 'translate-x-full'
        }`}
      />

      <div className="flex h-full font-medium">
        <button
          type="button"
          className={`z-10 flex flex-1 items-center justify-center ${
            isSelected(leftText) ? 'text-black' : 'text-gray-500'
          }`}
          onClick={() => onToggle?.(leftText)}
        >
          {leftText}
        </button>
        <button
          type="button"
          className={`z-10 flex flex-1 items-center justify-center ${
            isSelected(rightText) ? 'text-black' : 'text-gray-500'
          }`}
          onClick={() => onToggle?.(rightText)}
        >
          {rightText}
        </button>
      </div>
    </div>
  )
}

export default ToggleText
