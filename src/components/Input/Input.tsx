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
  sm:bg-transparent
  hover:bg-gray-10 focus:bg-gray-10 sm:focus:bg-transparent sm:hover:bg-transparent
  ${!value && 'bg-mobile-transparent'} ${value && (shape === 'underline' ? 'bg-transparent' : 'bg-gray-10')} ${shape === 'underline' && 'bg-transparent hover:bg-transparent focus:bg-transparent'}

  /* 텍스트 */
  sm:text-gray-900 sm:focus:text-gray-900 sm:hover:text-gray-900 ${!value && 'text-gray-100'} ${value && (shape === 'underline' ? 'text-gray-100' : 'text-gray-900')} ${shape === 'underline' ? 'focus:text-gray-100 hover:text-gray-100' : 'hover:text-gray-900 focus:text-gray-900'}

  /* placeholder */
  hover:placeholder-gray-400 focus:placeholder-gray-400
  sm:placeholder-gray-400 sm:focus:placeholder-gray-400 sm:hover:placeholder-gray-400
  ${shape === 'underline' ? 'placeholder-gray-400' : 'placeholder-gray-100'}

  /* padding */
  ${prefix ? 'pl-12' : ''}
  ${shape === 'underline' ? 'pr-7' : suffix || isPassword ? 'pr-11' : ''}
`

  const borderClasses =
    shape === 'underline'
      ? `border-b px-1 py-2 ${error ? 'border-b-error' : value ? 'border-b-gray-100 sm:border-b-pri-500' : 'border-b-gray-400 sm:focus:border-b-pri-500 focus:border-b-gray-100 hover:border-b-gray-100 sm:hover:border-b-pri-500'}`
      : `rounded-sm border  ${error ? 'border-error' : value ? 'border-gray-400 sm:border-pri-500' : 'border-gray-200 focus:border-gray-400 hover:border-gray-400 sm:border-gray-400 sm:focus:border-pri-500 sm:hover:border-pri-500'}`

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
          <ClearIcon className="sm:hover:text-pri-500 h-3 w-3 text-gray-400 hover:text-gray-100" />
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
