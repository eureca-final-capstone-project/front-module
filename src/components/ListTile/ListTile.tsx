interface ListTileProps {
  children: React.ReactNode
  type?: 'title'
  className?: string
  onClick?: () => void
}

const ListTile = ({ children, type, className = '', onClick }: ListTileProps) => {
  const fontSizeClass = type === 'title' ? 'text-fs14 lg:text-fs16' : 'text-fs16 lg:text-fs18'
  const baseClass = `${fontSizeClass} flex w-full justify-between rounded-md`
  const typeClass =
    type === 'title' ? 'bg-background px-5 py-0' : 'cursor-pointer shadow-tile bg-gray-10 px-5 py-6'

  return <div onClick={onClick} className={`${baseClass} ${typeClass} ${className}`}>{children}</div>
}

export default ListTile
