import InfoCard from './InfoCard'
import Button from '../../../../components/Button/Button'
import { formatDataSize } from '../../../../utils/format'
import { useQuery } from '@tanstack/react-query'
import { getUserDataStatus, UserDataStatus } from '../../../../apis/userInfo'
import { useNavigate } from 'react-router-dom'
import { usePermissionStore } from '../../../../store/authStore'
import { useToast } from '../../../../hooks/useToast'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'

const DataStatus = () => {
  const { data, isLoading, isError } = useQuery<UserDataStatus>({
    queryKey: ['userDataStatus'],
    queryFn: getUserDataStatus,
  })
  const navigate = useNavigate()
  const permissions = usePermissionStore(state => state.permissions)
  const isDisabeldButton = !permissions.includes('DATA_TRANSFER')
  const { showToast } = useToast()

  const handleClick = () => {
    if ((data?.totalDataMb ?? 0) === 0) {
      showToast({ type: 'error', msg: '보유 중인 데이터가 없어 전환할 수 없습니다.' })
      return
    }
    navigate('/change-data')
  }

  const items = [
    { label: '보유 데이터', value: data?.totalDataMb ?? 0 },
    { label: '구매 데이터', value: data?.buyerDataMb ?? 0 },
    { label: '판매 가능 데이터', value: data?.sellableDataMb ?? 0 },
  ]
  return (
    <InfoCard title="데이터 정보">
      {isLoading || isError || !data ? (
        <div className="flex h-40 items-center justify-center text-sm text-gray-500">
          {isLoading ? (
            <LoadingSpinner text="데이터 정보를 불러오는 중입니다" />
          ) : (
            '데이터를 불러오지 못했습니다.'
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {items.map(({ label, value }) => (
              <div
                key={label}
                className="text-fs14 lg:text-fs18 flex w-full justify-between font-medium text-gray-900"
              >
                <p>{label}</p>
                <p>{formatDataSize(value)}</p>
              </div>
            ))}
          </div>
          <Button
            text="데이터 전환하기"
            className={`${isDisabeldButton ? 'button-disabled border-none' : ''} text-fs14 lg:text-fs18 border-pri-500 text-pri-500 mt-4 border-[1.7px] font-medium`}
            onClick={handleClick}
            disabled={isDisabeldButton}
          />
        </>
      )}
    </InfoCard>
  )
}

export default DataStatus
