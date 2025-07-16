import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return <div className={`mx-auto h-full w-full max-w-[1280px] ${className}`}>{children}</div>
}
export default Container
