import InfoCard from './InfoCard'
import Button from '../../../../components/Button/Button'
import { formatAmount } from '../../../../utils/format'
import DatchaCoin from '@/assets/icons/datcha-coin.svg?react'
import { getUserPayStatus } from '../../../../apis/userInfo'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { usePermissionStore } from '../../../../store/authStore'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'
const PayStatus = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userPayStatus'],
    queryFn: getUserPayStatus,
  })

  const payAmount = data?.balance ?? 0
  const navigate = useNavigate()
  const permissions = usePermissionStore(state => state.permissions)
  const isDisabeldButton = !permissions.includes('PAY_CHARGE')

  return (
    <InfoCard title="다챠페이 정보">
      {isLoading || isError || !data ? (
        <div className="flex h-40 items-center justify-center text-sm text-gray-500">
          {isLoading ? (
            <LoadingSpinner text="다챠페이 정보를 불러오는 중입니다" />
          ) : (
            '다챠페이 정보를 불러오지 못했습니다.'
          )}
        </div>
      ) : (
        <>
          <div className="text-fs14 lg:text-fs18 flex w-full justify-between font-medium text-gray-900">
            <p>보유 다챠페이</p>
            <div className="text-pri-500 flex items-center gap-0.5 lg:gap-1">
              <DatchaCoin className="h-4 w-4 lg:h-5 lg:w-5" />
              <p>{formatAmount(payAmount)}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2 lg:gap-4">
            <Button
              text="충전하기"
              className={`text-truncate text-fs14 lg:text-fs18 border-pri-600 text-pri-600 flex-1 border-[1.7px] font-medium ${isDisabeldButton ? 'button-disabled border-none' : ''}`}
              onClick={() =>
                navigate('/payment', {
                  state: {
                    backTo: '/mypage/data-charge',
                  },
                })
              }
              disabled={isDisabeldButton}
            />
            <Button
              text="환전하기"
              className="text-truncate text-fs14 lg:text-fs18 border-pri-600 text-pri-600 flex-1 border-[1.7px] font-medium"
              onClick={() => navigate('/refund')}
            />
          </div>
        </>
      )}
    </InfoCard>
  )
}

export default PayStatus
