import { useEffect, useMemo, useState } from 'react'

interface BidDeadLineProps {
  statusCode: string
}

const BidDeadLine = ({ statusCode }: BidDeadLineProps) => {
  const [timeLeft, setTimeLeft] = useState('')

  const deadlineTime = useMemo(() => {
    const deadline = new Date()
    deadline.setHours(24, 0, 0, 0)
    return deadline.getTime()
  }, [])

  useEffect(() => {
    if (statusCode !== 'ON_SALE') {
      setTimeLeft('')
      return
    }

    const updateRemainingTime = () => {
      const now = new Date().getTime()
      const diff = deadlineTime - now

      if (diff <= 0) {
        setTimeLeft('00:00:00')
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
          seconds
        ).padStart(2, '0')}`
      )
    }

    updateRemainingTime()
    const intervalId = setInterval(updateRemainingTime, 1000)
    return () => clearInterval(intervalId)
  }, [deadlineTime, statusCode])

  if (statusCode !== 'ON_SALE') {
    return null
  }

  return (
    <div className="text-fs12 sm:text-fs16 flex flex-col items-end gap-0.5">
      <p>
        모든 입찰 판매는 <span className="font-semibold">오전 12시에 마감</span>됩니다.
      </p>
      <p>
        입찰 마감까지 <span className="text-error font-semibold">{timeLeft}</span> 남았습니다.
      </p>
    </div>
  )
}

export default BidDeadLine
