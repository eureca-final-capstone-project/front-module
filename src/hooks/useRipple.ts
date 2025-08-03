import { useRef } from 'react'

export const useRipple = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const createRipple = (event: React.MouseEvent) => {
    const button = containerRef.current
    if (!button) return

    const circle = document.createElement('span')
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    const rect = button.getBoundingClientRect()
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - rect.left - radius}px`
    circle.style.top = `${event.clientY - rect.top - radius}px`
    circle.className = 'ripple'

    const ripple = button.getElementsByClassName('ripple')[0]
    if (ripple) ripple.remove()

    button.appendChild(circle)
  }

  return { containerRef, createRipple }
}
