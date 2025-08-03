import ShareIcon from '@/assets/icons/share.svg?react'
import CalendarIcon from '@/assets/icons/calendar.svg?react'
import { useToast } from '../../../../hooks/useToast'

interface BannerHeaderProps {
  title: string
  period?: string
}

const BannerHeader = ({
  title,
  period = '2025.08.08 ~ 별도 공지 시까지 (상시 진행)',
}: BannerHeaderProps) => {
  const { showToast } = useToast()

  const handleCopyUrl = async () => {
    try {
      const urlToCopy = window.location.href

      await navigator.clipboard.writeText(urlToCopy)

      showToast({ type: 'success', msg: 'URL이 복사되었습니다!' })
    } catch {
      showToast({ type: 'error', msg: 'URL 복사에 실패했습니다.' })
    }
  }

  return (
    <div>
      <h1 className="text-fs24 sm:text-fs28 w-full border-b-2 pb-4 text-center font-bold sm:pb-6">
        이벤트
      </h1>
      <div className="flex items-center justify-between border-b-1 border-gray-200 px-4 py-4 sm:px-2 sm:py-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-fs18 sm:text-fs20 font-semibold">{title}</h2>
          <div className="text-fs14 flex items-center gap-1 text-gray-700">
            <CalendarIcon />
            <p>{period}</p>
          </div>
        </div>
        <ShareIcon onClick={handleCopyUrl} className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  )
}

export default BannerHeader
