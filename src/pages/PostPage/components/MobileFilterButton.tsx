import ArrowBottomIcon from '@/assets/icons/arrow-bottom.svg?react'

interface MobileFilterButtonProps {
  title: string
  appliedValue?: string
  isApplied: boolean
  onClick: () => void
  className?: string
}

const MobileFilterButton = ({
  title,
  appliedValue,
  isApplied,
  onClick,
  className = '',
}: MobileFilterButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-fs14 flex items-center gap-1 rounded-full border px-2.5 py-2 transition-colors duration-200 ease-in-out ${
        isApplied
          ? 'bg-pri-500 text-gray-10 border-transparent'
          : 'bg-gray-10 border-[0.5px] border-gray-200 text-gray-900'
      } ${className} `}
    >
      <span>{isApplied && appliedValue ? appliedValue : title}</span>
      {isApplied ? (
        <ArrowBottomIcon className="text-gray-10 w-3" />
      ) : (
        <ArrowBottomIcon className="w-3 text-gray-900" />
      )}
    </button>
  )
}

export default MobileFilterButton
