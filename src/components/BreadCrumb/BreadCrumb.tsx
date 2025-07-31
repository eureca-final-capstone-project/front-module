import { useNavigate } from 'react-router-dom'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react'

interface BreadcrumbProps {
  current: string
  clickableCurrent?: boolean
  currentPath?: string
  isDesktop?: boolean
  prevs?: {
    label: string
    path: string
  }[]
}

const Breadcrumb = ({
  current,
  clickableCurrent = false,
  currentPath,
  isDesktop = false,
  prevs = [],
}: BreadcrumbProps) => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    if (path) navigate(path)
  }

  return (
    <nav className="flex flex-col gap-4 px-4 pb-4 sm:px-0">
      <div className="flex items-center gap-1.5 text-gray-900">
        <button onClick={() => navigate('/')} className="font-medium text-gray-900">
          홈
        </button>
        <ArrowRightIcon className="w-1.75" />
        {isDesktop &&
          prevs.map((item, idx) => (
            <div key={item.path + idx} className="flex items-center gap-1.5">
              <button
                onClick={() => handleNavigate(item.path)}
                className="font-medium text-gray-900"
              >
                {item.label}
              </button>
              <ArrowRightIcon className="w-1.75" />
            </div>
          ))}

        {clickableCurrent && currentPath ? (
          <button onClick={() => handleNavigate(currentPath)} className="font-medium text-gray-900">
            {current}
          </button>
        ) : (
          <span className="cursor-default font-medium text-gray-900">{current}</span>
        )}
      </div>
      <div className="my-0.5 h-[0.5px] w-full bg-gray-200" />
    </nav>
  )
}

export default Breadcrumb
