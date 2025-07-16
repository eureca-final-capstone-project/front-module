import { useEffect, useState } from 'react'

export const useDeviceType = () => {
  const getDeviceType = () => {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  const [deviceType, setDeviceType] = useState(getDeviceType())

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return deviceType
}
