import { useQuery } from '@tanstack/react-query'
import { getUserDataStatus } from '../../../apis/userInfo'
import { formatDataSize } from '../../../utils/format'

const CurrentDataInfoField = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userDataStatus'],
    queryFn: getUserDataStatus,
  })

  if (isLoading) {
    return <div className="text-fs14 text-gray-400">데이터 정보를 불러오는 중...</div>
  }

  if (isError || !data) {
    return <div className="text-fs14 text-error">데이터 정보를 불러올 수 없습니다.</div>
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div>보유 데이터</div>
        <div>{formatDataSize(data.totalDataMb)}</div>
      </div>
      <div className="flex justify-between">
        <div>판매 가능 데이터</div>
        <div>{formatDataSize(data.sellableDataMb)}</div>
      </div>
    </div>
  )
}

export default CurrentDataInfoField
