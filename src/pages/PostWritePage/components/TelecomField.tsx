import { useQuery } from '@tanstack/react-query'
import Badge from '../../../components/Badge/Badge'
import { getTelecomBadgeColor } from '../../../utils/telecom'
import { getUserProfile } from '../../../apis/userInfo'
import { useUserStore } from '../../../store/userStore'
import { useEffect } from 'react'

const TelecomField = () => {
  const setTelecom = useUserStore(state => state.setTelecom)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['telecom'],
    queryFn: getUserProfile,
  })

  useEffect(() => {
    if (data?.telecomCompany?.telecomCompanyId && data?.telecomCompany?.name) {
      setTelecom({
        id: data.telecomCompany.telecomCompanyId,
        name: data.telecomCompany.name,
      })
    }
  }, [data, setTelecom])

  if (isLoading) {
    return <div className="text-fs14 text-gray-400">통신사 정보를 불러오는 중...</div>
  }

  if (isError || !data?.telecomCompany?.name) {
    return <div className="text-fs14 text-red-500">통신사 정보를 불러올 수 없습니다.</div>
  }

  return (
    <Badge
      label={data?.telecomCompany.name ?? ''}
      className={getTelecomBadgeColor(data?.telecomCompany.name ?? '')}
      size="small"
    />
  )
}

export default TelecomField
