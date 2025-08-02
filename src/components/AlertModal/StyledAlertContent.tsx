import React from 'react'
import DatchaCoin from '@/assets/icons/datcha-coin-color.svg?react'

interface Props {
  content: string
  isRead?: boolean
}

const StyledAlertContent: React.FC<Props> = ({ content, isRead = false }) => {
  const baseColorClass = isRead ? 'text-gray-500' : ''

  const pattern = /('[^']+'|\[[^\]]+\]|"[^"]+"|\(다챠페이\)|\d+원)/g
  const parts = content.split(pattern).filter(Boolean)

  return (
    <p
      className={`text-fs14 font-regular flex flex-wrap items-center whitespace-pre-wrap ${baseColorClass}`}
    >
      {parts.map((part, i) => {
        // 게시글 제목 (대괄호)
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <span key={i} className="font-medium">
              {part}
            </span>
          )
        }

        // 쿠폰 코드 (큰따옴표)
        if (part.startsWith('"') && part.endsWith('"')) {
          return (
            <span key={i} className="font-medium">
              {part}
            </span>
          )
        }

        // (다챠페이)
        if (part === '(다챠페이)') {
          return (
            <DatchaCoin
              key={i}
              className={`inline-block h-4 w-4 stroke-2 ${isRead ? 'text-gray-500' : 'text-pri-400'}`}
            />
          )
        }

        // 금액
        if (/^\d+원$/.test(part)) {
          return (
            <span key={i} className={`font-medium ${isRead ? '' : 'text-pri-400'}`}>
              {part}
            </span>
          )
        }

        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

export default StyledAlertContent
