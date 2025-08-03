import { useNavigate } from 'react-router-dom'
import { useRipple } from '../../hooks/useRipple'

interface SubNavTileProps {
  label: string
  to: string
  active?: boolean
  onClose?: () => void
}

const SubNavTile = ({ label, to, active = false, onClose }: SubNavTileProps) => {
  const navigate = useNavigate()
  const { containerRef, createRipple } = useRipple()

  const handleClick = (e: React.MouseEvent) => {
    createRipple(e)
    navigate(to)
    onClose?.()
    setTimeout(() => navigate(to), 150)
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <button
        type="button"
        onClick={handleClick}
        className={`text-fs16 font-regular w-full px-4 py-3 text-left transition-colors duration-200 ${
          active ? 'text-pri-500 font-semibold' : 'text-gray-900'
        }`}
      >
        {label}
      </button>
    </div>
  )
}

export default SubNavTile
