import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { getRefundBanks } from '../../../apis/payment'
import { RefundSchemaType } from '../../../types/pay'
import Button from '../../../components/Button/Button'
import BankImageMap from './BankImageMap'

const RefundBankSelector = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<RefundSchemaType>()
  const selectedBankId = watch('bankId')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['refundBanks'],
    queryFn: getRefundBanks,
  })

  if (isLoading) return <div>은행 목록을 불러오는 중입니다</div>
  if (isError) return <div>은행 목록을 불러오지 못했습니다</div>

  const banks = data ?? []

  return (
    <div className="flex flex-wrap gap-2">
      {banks.map(bank => {
        const bankImage = BankImageMap[bank.bankId]

        return (
          <Button
            key={bank.bankId}
            onClick={() => {
              setValue('bankId', bank.bankId)
              console.log('선택된 은행 ID:', bank.bankId)
            }}
            text={
              <div className="flex items-center gap-1">
                <img src={bankImage} alt={bank.bankName} className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm">{bank.bankName}</span>
              </div>
            }
            mediumPadding
            className={`text-fs16 rounded-2 ${
              selectedBankId === bank.bankId
                ? 'bg-pri-500 text-gray-10'
                : 'bg-gray-10 text-gray-700 hover:bg-gray-100'
            }`}
          />
        )
      })}
      {errors.bankId && <p className="text-error mt-1 w-full text-sm">{errors.bankId.message}</p>}
    </div>
  )
}

export default RefundBankSelector
