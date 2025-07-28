import { useNavigate } from 'react-router-dom'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react'

interface BreadcrumbProps {
  current: string
}

const Breadcrumb = ({ current }: BreadcrumbProps) => {
  const navigate = useNavigate()

  return (
    <nav className="flex flex-col gap-4 px-4 pb-4">
      <div className="flex items-center gap-1.5 text-gray-900">
        <button onClick={() => navigate('/')} className="font-medium text-gray-900">
          홈
        </button>
        <ArrowRightIcon className="w-1.75" />
        <span className="cursor-default font-medium text-gray-900">{current}</span>
      </div>
      <div className="my-0.5 h-[0.5px] w-full bg-gray-200" />
    </nav>
  )
}

export default Breadcrumb
