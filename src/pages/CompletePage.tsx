import { useEffect, useState } from 'react'
import { useMatches } from 'react-router-dom'
import Card from '../components/Card/Card'

const CompletePage = () => {
  const matches = useMatches() as { handle?: { text?: string } }[]
  const text = matches.reverse().find(match => match.handle?.text)?.handle?.text ?? ''
  const [secondsLeft, setSecondsLeft] = useState(5)

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown) // 카운트다운 중단
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const closeTimer = setTimeout(() => {
      window.close()
    }, 5000)

    return () => {
      clearInterval(countdown)
      clearTimeout(closeTimer)
    }
  }, [])

  return (
    <div className="mx-6 h-screen max-w-[640px] pt-[20vh] sm:mx-auto">
      <Card className="h-[50vh] items-center space-y-5">
        <h1 className="text-fs18 sm:text-fs24 pt-20 font-bold">{text}</h1>
        <p className="text-gray-700">
          기존 탭으로 돌아가 로그인해 주세요.
          <br />
          <br />
          현재 탭은 <span className="text-pri-500 font-semibold">{secondsLeft}초</span> 후 자동으로
          닫힙니다.
        </p>
      </Card>
    </div>
  )
}

export default CompletePage
