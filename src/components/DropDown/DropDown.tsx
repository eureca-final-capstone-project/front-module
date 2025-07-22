import { useCallback, useEffect, useRef, useState } from 'react'
import DropDownIcon from '@/assets/icons/arrow-bottom.svg?react'
import { useDeviceType } from '../../hooks/useDeviceType'
import DropdownMotion from '../Animation/DropDownMotion'
import { AnimatePresence } from 'framer-motion'

interface DropdownProps {
  type?: 'default' | 'provider' | 'filter'
  options?: string[]
  selected: string
  onSelect: (option: string) => void
  className?: string
  paddingClassName?: string
  placeholder?: string
  children?: React.ReactNode
}

const providerColorMap: Record<string, string> = {
  KT: 'text-kt',
  'LG U+': 'text-lguplus',
  SKT: 'text-skt',
}

const DropDown = ({
  type = 'default',
  options,
  selected,
  onSelect,
  className = '',
  paddingClassName = '',
  placeholder = '',
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const deviceType = useDeviceType()

  const toggleOpen = () => setIsOpen(prev => !prev)

  const handleSelect = useCallback(
    (option: string) => {
      onSelect(option)
      if (type !== 'filter') setIsOpen(false)
    },
    [onSelect, type]
  )

  const handleClickOutside = (e: MouseEvent) => {
    if (
      type !== 'filter' &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside)
    }
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [isOpen])

  const renderButtonContent = () => {
    if (type === 'provider') {
      const isEmpty = !selected
      const textColor = isEmpty
        ? deviceType === 'mobile'
          ? 'text-gray-100'
          : 'text-gray-400'
        : providerColorMap[selected]

      return <span className={textColor}>{selected || placeholder}</span>
    }

    if (type === 'filter') {
      return <span className="text-gray-800">{placeholder}</span>
    }

    return <span className="text-gray-900">{selected}</span>
  }

  const renderOptions = () => {
    if (type === 'filter') return <div>{children}</div>

    const baseOptions: string[] = type === 'provider' ? ['SKT', 'LG U+', 'KT'] : (options ?? [])

    return (
      <div role="listbox" className="flex flex-col gap-0.25">
        {baseOptions.map((option, index) => {
          const isFirst = index === 0
          const isLast = index === baseOptions.length - 1
          const roundedClass = `${isFirst ? 'rounded-t-sm' : ''} ${isLast ? 'rounded-b-sm' : ''}`
          const baseClass = `cursor-pointer px-5 py-3 hover:bg-gray-50 ${roundedClass}`

          if (type === 'provider') {
            const colorClass = providerColorMap[option]
            return (
              <div
                role="option"
                key={option}
                onClick={() => handleSelect(option)}
                className={`${baseClass} ${colorClass}`}
              >
                {option}
              </div>
            )
          }

          return (
            <div
              role="option"
              key={option}
              onClick={() => handleSelect(option)}
              className={`${baseClass} hover:bg-gray-50 ${
                option === selected ? 'text-pri-500' : 'text-gray-900'
              }`}
            >
              {option}
            </div>
          )
        })}
      </div>
    )
  }

  const renderDropdownMotion = () => {
    const sharedClass = 'dropdown-panel bg-gray-10'
    if (type === 'filter') {
      return <DropdownMotion className={`${sharedClass}`}>{renderOptions()}</DropdownMotion>
    }

    const motionClass =
      type === 'default'
        ? `${sharedClass} shadow-drop-down gap-2 rounded-sm`
        : `${sharedClass} rounded-sm border ${
            deviceType === 'mobile' ? 'bg-gray-10 border-gray-200' : 'bg-gray-10 border-gray-400'
          }`

    return <DropdownMotion className={motionClass}>{renderOptions()}</DropdownMotion>
  }

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col ${type !== 'filter' ? 'gap-2' : 'gap-0'} ${className}`}
    >
      {/* 드롭다운 버튼 */}
      <button
        type="button"
        onClick={toggleOpen}
        className={`flex cursor-pointer items-center justify-between ${
          type === 'default'
            ? 'bg-gray-10 shadow-drop-down rounded-sm'
            : type === 'provider'
              ? `rounded-sm border ${
                  deviceType === 'mobile'
                    ? `${selected ? 'bg-gray-10' : 'bg-mobile-transparent'} border-gray-200`
                    : 'bg-gray-10 border-gray-400'
                }`
              : 'bg-gray-10'
        } ${paddingClassName || 'px-5 py-4'}`}
      >
        {renderButtonContent()}
        <DropDownIcon
          aria-hidden="true"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
            type === 'provider'
              ? deviceType === 'mobile'
                ? `${selected ? 'text-gray-600' : 'text-gray-100'}`
                : 'text-gray-600'
              : type === 'filter'
                ? 'text-gray-800'
                : 'text-gray-600'
          }`}
        />
      </button>

      {/* 드롭다운 콘텐츠 */}
      <AnimatePresence>{isOpen && renderDropdownMotion()}</AnimatePresence>
    </div>
  )
}

export default DropDown
