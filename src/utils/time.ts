export const formatRelativeTime = (dateString: string): string => {
  const now = new Date()
  const createdAt = new Date(dateString)
  const diffMs = now.getTime() - createdAt.getTime()

  const minutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const months = Math.floor(days / 30)

  if (minutes < 1) return '방금 전'
  if (minutes < 60) return `${minutes}분 전`
  if (hours < 24) return `${hours}시간 전`
  if (days < 30) return `${days}일 전`
  if (months < 12) return `${months}개월 전`

  // 1년 이상은 yyyy.MM.dd 형식으로 표시
  const yyyy = createdAt.getFullYear()
  const mm = String(createdAt.getMonth() + 1).padStart(2, '0')
  const dd = String(createdAt.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

export const formatFullDate = (
  dateString: string,
  device: 'desktop' | 'tablet' | 'mobile'
): string => {
  const date = new Date(dateString)

  const fullYear = date.getFullYear()
  const year = String(fullYear).slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  let hour = date.getHours()
  const minute = String(date.getMinutes()).padStart(2, '0')

  const isPM = hour >= 12
  const period = isPM ? '오후' : '오전'
  hour = hour % 12 || 12 // 0시는 12시로 보정

  const timeText = `${period} ${String(hour).padStart(2, '0')}시 ${minute}분`

  if (device === 'desktop') {
    return `${year}년 ${month}월 ${day}일 | ${timeText}`
  } else {
    return `${month}월 ${day}일 ${timeText}`
  }
}
export const formatCompactDateTime = (
  dateString: string,
  style: 'dot' | 'dash' = 'dot'
): string => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  if (style === 'dash') {
    return `${year}-${month}-${day} | ${hour}:${minute}`
  }

  return `${year}. ${month}. ${day} | ${hour}:${minute}`
}
export const formatCompactDate = (
  dateString: string,
  style: 'dot' | 'dash' | 'text' = 'dot'
): string => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  if (style === 'dash') {
    return `${year}-${month}-${day}`
  } else if (style === 'text') {
    return `${year}년 ${month}월 ${day}일`
  }

  return `${year}. ${month}. ${day}`
}
