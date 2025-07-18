import { useDeviceType } from '../../hooks/useDeviceType'

interface ListTileProps {
  children: React.ReactNode
  type?: 'title'
}

const ListTile = ({ children, type }: ListTileProps) => {
  const deviceType = useDeviceType()

  const fontSizeClass = (() => {
    if (type === 'title') {
      return deviceType === 'mobile' ? 'text-fs14' : 'text-fs16'
    } else {
      return deviceType === 'mobile' ? 'text-fs16' : 'text-fs18'
    }
  })()

  const baseClass = `${fontSizeClass} flex w-full justify-between rounded-md`

  const typeClass =
    type === 'title' ? 'bg-background px-5 py-0' : 'shadow-tile bg-gray-10 px-5 py-6'

  return <div className={`${baseClass} ${typeClass}`}>{children}</div>
}

export default ListTile
