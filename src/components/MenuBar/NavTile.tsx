import { useNavigate } from 'react-router-dom'
import { useRipple } from '../../hooks/useRipple'
import ArrowBottomIcon from '@/assets/icons/arrow-bottom.svg?react'

interface NavTileProps {
  label: string
  onClick?: () => void
  children?: React.ReactNode
  withArrow?: boolean
  isOpen?: boolean
  active?: boolean
  to?: string
  onClose?: () => void
}

const NavTile = ({
  label,
  onClick,
  children,
  withArrow = false,
  isOpen = false,
  active = false,
  to,
  onClose,
}: NavTileProps) => {
  const navigate = useNavigate()
  const { containerRef, createRipple } = useRipple()

  const handleClick = (e: React.MouseEvent) => {
    createRipple(e)

    if (to) {
      onClose?.()
      setTimeout(() => navigate(to), 150)
    } else {
      onClick?.()
    }
  }

  return (
    <div className="relative">
      <div ref={containerRef} className="relative overflow-hidden">
        <button
          type="button"
          onClick={handleClick}
          className={`text-fs18 flex w-full items-center justify-between px-4 py-3 text-left font-medium ${
            active ? 'text-pri-500 font-semibold' : 'text-gray-900'
          }`}
        >
          <span>{label}</span>
          {withArrow && (
            <ArrowBottomIcon
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>
      </div>
      {children}
    </div>
  )
}

export default NavTile
