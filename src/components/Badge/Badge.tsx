import React from 'react'
import { cn } from '../../lib/utils'
import { badgeVariants, type BadgeVariantProps } from './badgeVariants'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, BadgeVariantProps {
  label: string
  color?: 'gray50' | 'gray200' | 'success' | 'error'
}

const Badge = ({ className, variant, size, color, label, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant, size, color }), className)} {...props}>
      {label}
    </div>
  )
}

export default Badge
