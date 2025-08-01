import { ChangeEvent, ReactNode, useState } from 'react'
import PasswordOffIcon from '@/assets/icons/password-off.svg?react'
import PasswordOnIcon from '@/assets/icons/password-on.svg?react'
import ClearIcon from '@/assets/icons/clear.svg?react'

interface InputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  error?: boolean
  errorMsg?: string
  shape?: 'square' | 'floating' | 'underline'
  prefix?: ReactNode
  suffix?: ReactNode
  suffixAlwaysVisible?: boolean
  className?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  variant?: 'default' | 'auth'
}

const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  errorMsg = '',
  shape = 'square',
  prefix,
  suffix,
  suffixAlwaysVisible = false,
  className,
  inputMode = 'text',
  variant = 'default',
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const isClearVisible = shape === 'underline' && value.length > 0

  const handleClear = () => {
    onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
  }

  const inputBaseClasses = `
  w-full p-4 peer focus:outline-none disabled:cursor-not-allowed

  /* 배경 */
  ${variant === 'auth' ? `hover:bg-gray-10 focus:bg-gray-10 sm:bg-transparent ${!value && 'bg-mobile-transparent'}` : 'bg-transparent'}
  ${!value && 'bg-mobile-transparent'} ${value && (shape === 'underline' ? 'bg-transparent' : 'bg-gray-10')}

  /* placeholder */
  ${variant === 'auth' ? 'placeholder-gray-100 sm:placeholder-gray-400' : 'placeholder-gray-400'} hover:placeholder-gray-400 focus:placeholder-gray-400 

  /* padding */
  ${prefix ? 'pl-12' : ''}
  ${shape === 'underline' ? 'pr-7' : suffix || isPassword ? 'pr-11' : ''}
`

  const borderClasses =
    shape === 'underline'
      ? `border-b px-1 py-2 ${error ? 'border-b-error' : value ? 'border-b-pri-500' : 'border-b-gray-400 focus:border-b-pri-500 hover:border-b-pri-500'}`
      : `rounded-sm border  ${error ? 'border-error' : value ? `${variant === 'auth' ? 'border-gray-400 sm:border-pri-500' : 'border-pri-500'}` : `${variant === 'auth' ? 'border-gray-200 focus:border-gray-400 hover:border-gray-400 sm:border-gray-400 sm:focus:border-pri-500 sm:hover:border-pri-500' : 'border-gray-400 focus:border-pri-500 hover:border-pri-500'}`}`

  const renderSuffixOrToggle = () => {
    if (isPassword && value) {
      return (
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="cursor-pointer focus:outline-none"
        >
          {showPassword ? (
            <PasswordOnIcon className="text-pri-500" />
          ) : (
            <PasswordOffIcon className="text-gray-400" />
          )}
        </button>
      )
    }

    if (suffix) {
      if (suffixAlwaysVisible) {
        return <div>{suffix}</div>
      } else if (value) {
        return <div className="sm:text-fs18 pointer-events-none">{suffix}</div>
      }
    }

    if (isClearVisible) {
      return (
        <button type="button" onClick={handleClear} className="cursor-pointer focus:outline-none">
          <ClearIcon className="hover:text-pri-500 h-3 w-3 text-gray-400" />
        </button>
      )
    }

    return null
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="group relative">
        {prefix && (
          <div className="pointer-events-none absolute top-1/2 left-4 flex size-6 -translate-y-1/2 items-center">
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
          placeholder={shape === 'floating' ? '' : label}
          className={`${inputBaseClasses} ${borderClasses} ${className}`}
          inputMode={inputMode}
        />

        {shape === 'floating' && (
          <label
            htmlFor={id}
            className={`bg-gray-10 absolute top-2 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 ${error ? 'text-error' : value ? 'text-pri-500' : 'peer-focus:text-pri-500 text-gray-400'} `}
          >
            {label}
          </label>
        )}

        {(suffix || isPassword || isClearVisible) && (
          <div
            className={`absolute top-1/2 ${shape === 'underline' ? 'right-1' : 'right-4'} flex -translate-y-1/2 items-center`}
          >
            {renderSuffixOrToggle()}
          </div>
        )}
      </div>

      {error && errorMsg && <span className="text-error text-fs12 p-1 text-left">{errorMsg}</span>}
    </div>
  )
}

export default Input
