import React from 'react'

type BadgeSize = 'extra-small' | 'small' | 'medium'
type BadgeVariant = 'default' | 'secondary' | 'outline'

interface BaseBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string | number
  size?: BadgeSize
  variant?: BadgeVariant
  className?: string
}

interface DefaultBadgeProps extends BaseBadgeProps {
  variant?: 'default'
}

interface SecondaryBadgeProps extends BaseBadgeProps {
  variant: 'secondary'
  background: 'gray50' | 'gray200'
}

interface OutlineBadgeProps extends BaseBadgeProps {
  variant: 'outline'
  status: 'success' | 'error'
}

type BadgeProps = DefaultBadgeProps | SecondaryBadgeProps | OutlineBadgeProps

const Badge = (props: BadgeProps) => {
  const { label, size = 'medium', variant = 'default', className = '', ...rest } = props

  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-full'

  const sizeStyle =
    size === 'extra-small'
      ? 'text-fs12 px-1.5 py-0.75 leading-none'
      : size === 'small'
        ? 'text-fs12 px-2 py-1.25 leading-none'
        : 'text-fs14 px-2 py-1.5 leading-none'
  let variantStyle = ''

  switch (variant) {
    case 'default': {
      const hasCustomBg = className.includes('bg-')
      const hasCustomText = className.includes('text-')

      if (hasCustomBg && hasCustomText) {
        variantStyle = ''
      } else if (hasCustomBg) {
        variantStyle = 'text-gray-10'
      } else if (hasCustomText) {
        variantStyle = 'bg-pri-500'
      } else {
        variantStyle = 'bg-pri-500 text-gray-10'
      }
      break
    }

    case 'secondary': {
      const { background } = props as SecondaryBadgeProps
      variantStyle =
        background === 'gray50' ? 'bg-gray-50 text-gray-800' : 'bg-gray-200 text-gray-800'
      break
    }

    case 'outline': {
      const { status } = props as OutlineBadgeProps
      variantStyle =
        status === 'success'
          ? 'border border-success text-success'
          : 'border border-error text-error'
      break
    }
  }

  const fullClassName = [baseStyle, sizeStyle, variantStyle, className]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <div className={fullClassName} {...rest}>
      {label}
    </div>
  )
}

export default Badge
