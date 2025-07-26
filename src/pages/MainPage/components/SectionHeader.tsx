import { Link } from 'react-router-dom'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react'
import BidIcon from '@/assets/icons/bid-feed.svg?react'
import RecommendIcon from '@/assets/icons/recommend-feed.svg?react'
import LatestIcon from '@/assets/icons/latest-feed.svg?react'
import PriceGraphIcon from '@/assets/icons/price-graph.svg?react'

type IconType = 'bid' | 'recommend' | 'latest' | 'priceGraph'

interface SectionHeaderProps {
  title: string
  linkText?: string
  linkHref?: string | { pathname: string; search?: string }
  className?: string
  iconType?: IconType
}

const iconMap: Record<IconType, typeof BidIcon> = {
  bid: BidIcon,
  recommend: RecommendIcon,
  latest: LatestIcon,
  priceGraph: PriceGraphIcon,
}

const SectionHeader = ({
  title,
  linkText,
  linkHref,
  className = '',
  iconType,
}: SectionHeaderProps) => {
  const IconComponent = iconType ? iconMap[iconType] : null

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {IconComponent && <IconComponent className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />}
        <h2 className="text-fs18 sm:text-fs20 lg:text-fs24 leading-tight font-medium">{title}</h2>
      </div>
      {linkText && linkHref && (
        <Link
          to={linkHref}
          className="group hover:text-pri-500 text-fs14 sm:text-fs16 flex items-center leading-none"
        >
          {linkText}
          <ArrowRightIcon
            className="ml-1 h-3 w-3.5 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 sm:h-3.5 sm:w-4"
            strokeWidth={2}
          />
        </Link>
      )}
    </div>
  )
}

export default SectionHeader
