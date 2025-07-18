import React from 'react'

type DefaultBadge = {
  label: string
  variant?: 'default'
  size?: 'small' | 'medium'
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

type SecondaryBadge = {
  label: string
  variant: 'secondary'
  background: 'gray50' | 'gray200'
  size?: 'small' | 'medium'
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

type OutlineBadge = {
  label: string
  variant: 'outline'
  status: 'success' | 'error'
  size?: 'small' | 'medium'
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

type BadgeProps = DefaultBadge | SecondaryBadge | OutlineBadge

const Badge = (props: BadgeProps) => {
  const { label, variant = 'default', size = 'medium', className, ...rest } = props

  const baseStyle = 'inline-flex items-center font-medium justify-center rounded-full'

  const sizeClassMap = {
    small: 'text-fs12 px-2 py-1.5',
    medium: 'text-fs14 px-2 py-1.5 leading-none',
  }

  const getVariantClass = (): string => {
    if (variant === 'default') {
      return className ? 'text-gray-10' : 'bg-pri-500 text-gray-10'
    }

    if (variant === 'secondary' && 'background' in props) {
      const bgMap = {
        gray50: 'bg-gray-50 text-gray-800',
        gray200: 'bg-gray-200 text-gray-800',
      }
      return bgMap[props.background]
    }

    if (variant === 'outline' && 'status' in props) {
      const statusMap = {
        success: 'border border-success text-success',
        error: 'border border-error text-error',
      }
      return statusMap[props.status]
    }

    return ''
  }

  const fullClassName = [baseStyle, sizeClassMap[size], getVariantClass(), className]
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
