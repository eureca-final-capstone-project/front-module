import React from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import WarningIcon from '../../assets/icons/warningIcon.svg?react'
import NoticeIcon from '../../assets/icons/noticeIcon.svg?react'
import ArrowRightIcon from '../../assets/icons/arrowRightIcon.svg?react'

interface CardProps {
  type?: 'default' | 'label' | 'warning' | 'notice'
  className?: string
  labelTitle?: string
  iconTitle?: string
  iconDescription?: string
  children?: React.ReactNode
}
const typeStyles = {
  warning: {
    cardBg: 'bg-error-light',
    icon: WarningIcon,
    iconWrapper: 'bg-error text-error-light',
    title: 'text-error',
  },
  notice: {
    cardBg: 'bg-gray-10',
    icon: NoticeIcon,
    iconWrapper: 'bg-pri-500 text-pri-100',
    title: 'text-pri-700',
  },
}

const Card = ({
  type = 'default',
  className = '',
  labelTitle,
  iconTitle,
  iconDescription,
  children,
}: CardProps) => {
  const deviceType = useDeviceType()
  const paddingClass = deviceType === 'mobile' ? 'p-4 gap-4' : 'p-5 gap-5'
  const labelTextClass = deviceType === 'mobile' ? 'text-fs18' : 'text-fs20'
  const isIconType = type === 'warning' || type === 'notice'
  const iconCardStyle = isIconType ? typeStyles[type] : undefined
  const Icon = iconCardStyle?.icon
  return (
    <div
      className={`shadow-card flex w-full flex-col rounded-md ${paddingClass} ${
        isIconType ? iconCardStyle?.cardBg : 'bg-gray-10'
      } ${className}`}
    >
      {type === 'label' && labelTitle && (
        <div className="flex flex-col gap-2">
          <div className={`w-full font-medium text-gray-900 ${labelTextClass}`}>{labelTitle}</div>
          <hr className="border-t border-gray-100" />
        </div>
      )}
      {isIconType && iconTitle && iconDescription ? (
        <div
          className={`flex w-full items-center gap-3 ${type === 'notice' ? 'justify-between' : ''}`}
        >
          <div
            className={`text-fs24 flex h-12 w-12 items-center justify-center rounded-full ${iconCardStyle?.iconWrapper}`}
          >
            {Icon && <Icon />}
          </div>
          <div className="flex w-full flex-col justify-center gap-1">
            <p className={`text-fs20 font-medium ${iconCardStyle?.title}`}>{iconTitle}</p>
            <p className="text-fs14 text-gray-700">{iconDescription}</p>
          </div>
          {type === 'notice' && (
            <div className="flex items-center">
              <ArrowRightIcon />
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default Card
