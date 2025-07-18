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
  error?: string
  shape?: 'square' | 'floating' | 'underline'
  prefix?: ReactNode
  suffix?: ReactNode
}

const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  error = '',
  shape = 'square',
  prefix,
  suffix,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const isClearVisible = shape === 'underline' && value.length > 0

  const handleClear = () => {
    onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
  }

  const inputBaseClasses = `
    w-full p-4 text-sm text-gray-900 peer focus:outline-none disabled:cursor-not-allowed font-regular
    ${prefix ? 'pl-12' : ''} ${shape === 'underline' ? 'pr-7' : suffix || isPassword ? 'pr-11' : ''}
  `

  const borderClasses =
    shape === 'underline'
      ? `border-b bg-transparent px-1 py-2 ${error ? 'border-b-error' : 'border-b-gray-400 focus:border-b-pri-500 hover:border-b-pri-500'} bg-transparent`
      : `rounded-sm border bg-gray-10  ${error ? 'border-error' : 'border-gray-400 focus:border-pri-500 hover:border-pri-500'}`

  const renderSuffixOrToggle = () => {
    if (isPassword) {
      return (
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="cursor-pointer focus:outline-none"
        >
          {showPassword ? <PasswordOnIcon className="text-pri-500" /> : <PasswordOffIcon />}
        </button>
      )
    }
    if (suffix) {
      return <div className="pointer-events-none">{suffix}</div>
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
    <div className="flex flex-col">
      <div className="relative">
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
          placeholder={shape === 'floating' ? '' : label}
          className={`${inputBaseClasses} ${borderClasses}`}
        />

        {shape === 'floating' && (
          <label
            htmlFor={id}
            className={`bg-gray-10 absolute top-2 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 ${error ? 'text-error' : 'peer-focus:text-pri-500 text-gray-400'} `}
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

      {error && <span className="text-error text-fs12 p-1 text-left">{error}</span>}
    </div>
  )
}

export default Input
