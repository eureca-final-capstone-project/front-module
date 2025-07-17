import { cva, VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-pri-500 text-gray-10',
        secondary: 'text-gray-800',
        outline: 'border',
      },
      size: {
        small: 'text-[0.75rem] px-3 py-0.5',
        medium: 'text-[0.875rem]  min-w-[4.5rem] px-3 py-1',
      },
      color: {
        gray50: '',
        gray200: '',
        success: '',
        error: '',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        color: 'gray50',
        class: 'bg-gray-50',
      },
      {
        variant: 'secondary',
        color: 'gray200',
        class: 'bg-gray-200',
      },
      {
        variant: 'secondary',
        color: 'success',
        class: 'bg-success text-gray-10',
      },
      {
        variant: 'secondary',
        color: 'error',
        class: 'bg-error text-gray-10',
      },
      {
        variant: 'outline',
        color: 'success',
        class: 'border-success text-success',
      },
      {
        variant: 'outline',
        color: 'error',
        class: 'border-error text-error',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      color: 'gray200',
    },
  }
)

export type BadgeVariantProps = VariantProps<typeof badgeVariants>
