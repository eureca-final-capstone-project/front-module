import { ChangeEvent, ReactNode, useState } from 'react'
import PasswordOffIcon from '@/assets/icons/password-off.svg?react'
import PasswordOnIcon from '@/assets/icons/password-on.svg?react'

interface FloatingLabelInputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  error?: string
  className?: string
  floating?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

const FloatingLabelInput = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  error = '',
  className = '',
  floating = false,
  prefix,
  suffix,
}: FloatingLabelInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const renderSuffixOrToggle = () => {
    if (isPassword) {
      return (
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="cursor-pointer focus:outline-none"
        >
          {showPassword ? <PasswordOnIcon /> : <PasswordOffIcon />}
        </button>
      )
    }
    if (suffix) {
      return <div className="pointer-events-none">{suffix}</div>
    }
    return null
  }

  return (
    <div className="flex flex-col">
      <div className={`relative ${className}`}>
        {prefix && (
          <div className="pointer-events-none absolute top-1/2 left-4 flex h-6 w-6 -translate-y-1/2 items-center">
            {prefix}
          </div>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={floating ? '' : label}
          className={`w-full rounded-sm border bg-white p-4 text-sm text-gray-900 ${prefix ? 'pl-12' : ''} ${suffix || isPassword ? 'pr-11' : ''} ${error ? 'border-red-500' : 'focus:border-pri-500 hover:border-pri-500 border-gray-400'} peer focus:ring-0 focus:outline-none disabled:cursor-not-allowed`}
        />

        {floating && (
          <label
            htmlFor={id}
            className={`absolute top-2 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 ${error ? 'text-red-500' : 'peer-focus:text-pri-500 text-gray-400'} `}
          >
            {label}
          </label>
        )}

        {(suffix || isPassword) && (
          <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center">
            {renderSuffixOrToggle()}
          </div>
        )}
      </div>

      {error && <span className="text-error text-fs12 p-1 text-left">{error}</span>}
    </div>
  )
}

export default FloatingLabelInput
