import React from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import WarningIcon from '../../assets/icons/warning.svg?react'
import NoticeIcon from '../../assets/icons/notice.svg?react'
import ArrowRightIcon from '../../assets/icons/arrow-right.svg?react'
import FadeInUpMotion from '../Animation/FadeInUpMotion'

interface CardProps {
  type?: 'default' | 'label' | 'warning' | 'notice'
  className?: string
  labelTitle?: string
  iconTitle?: string
  iconDescription?: string
  children?: React.ReactNode
  withMotion?: boolean
  motionCustom?: number
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
  withMotion = false,
  motionCustom = 0,
}: CardProps) => {
  const deviceType = useDeviceType()
  const isIconType = type === 'warning' || type === 'notice'
  const iconCardStyle = isIconType ? typeStyles[type] : undefined
  const Icon = iconCardStyle?.icon

  const responsiveStyles =
    deviceType === 'mobile'
      ? {
          wrapper: 'p-4 gap-4',
          iconTitle: 'text-fs16',
          iconDescription: 'text-fs12',
          labelTitle: 'text-fs18',
        }
      : {
          wrapper: 'p-5 gap-5',
          iconTitle: 'text-fs20',
          iconDescription: 'text-fs14',
          labelTitle: 'text-fs20',
        }

  const cardContent = (
    <div
      className={`shadow-card flex w-full flex-col rounded-md ${responsiveStyles.wrapper} ${
        isIconType ? iconCardStyle?.cardBg : 'bg-gray-10'
      } ${className}`}
    >
      {type === 'label' && labelTitle && (
        <div className="flex flex-col gap-2">
          <div className={`w-full font-medium text-gray-900 ${responsiveStyles.labelTitle}`}>
            {labelTitle}
          </div>
          <hr className="border-t border-gray-100" />
        </div>
      )}

      {isIconType && iconTitle && iconDescription ? (
        <div
          className={`flex w-full items-center gap-3 ${type === 'notice' ? 'justify-between' : ''}`}
        >
          <div
            className={`text-fs24 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconCardStyle?.iconWrapper}`}
          >
            {Icon && <Icon />}
          </div>
          <div className="flex w-full flex-col justify-center gap-1">
            <p className={`${responsiveStyles.iconTitle} font-medium ${iconCardStyle?.title}`}>
              {iconTitle}
            </p>
            <p className={`${responsiveStyles.iconDescription} text-gray-700`}>{iconDescription}</p>
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

  return withMotion ? (
    <FadeInUpMotion custom={motionCustom ?? 0}>{cardContent}</FadeInUpMotion>
  ) : (
    cardContent
  )
}

export default Card
