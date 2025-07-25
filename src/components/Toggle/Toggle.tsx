import { useState, useEffect, useRef } from 'react'

interface ToggleProps {
  initialState?: boolean
  onToggle?: (state: boolean) => void
}

const Toggle = ({ initialState = false, onToggle }: ToggleProps) => {
  const isFirstRender = useRef(true)
  const [isOn, setIsOn] = useState(initialState)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onToggle?.(isOn)
  }, [isOn, onToggle])

  return (
    <div className="inline-block">
      <input
        type="checkbox"
        id="toggle"
        checked={isOn}
        onChange={() => {
          setIsOn(prev => !prev)
        }}
        className="sr-only"
      />
      <label
        htmlFor="toggle"
        className={`relative inline-block h-6 w-12 cursor-pointer rounded-full transition-colors ${
          isOn ? 'bg-pri-400' : 'bg-gray-200'
        }`}
      >
        <span
          className={`bg-gray-10 absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full shadow transition-transform duration-300 ease-in-out ${
            isOn ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></span>
      </label>
    </div>
  )
}

export default Toggle
