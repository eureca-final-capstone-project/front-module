import { Controller, useFormContext } from 'react-hook-form'
import { RefundSchemaType } from '../../../types/pay'
import Input from '../../../components/Input/Input'
import { formatAccountNumber, stripAccountNumber } from '../../../utils/format'

const RefundAccountInput = () => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<RefundSchemaType>()

  return (
    <Controller
      name="exchangeAccount"
      control={control}
      defaultValue=""
      render={({ field }) => {
        const onlyDigits = stripAccountNumber(field.value)
        const formatted = formatAccountNumber(onlyDigits)

        const isShort = onlyDigits.length > 0 && onlyDigits.length < 10
        const errorMessage =
          errors.exchangeAccount?.message ||
          (isShort ? '계좌번호는 최소 10자리 이상 14자리 미만으로 입력해주세요.' : '')

        return (
          <Input
            id="exchangeAccount"
            label="환전하실 계좌번호를 입력해주세요."
            type="text"
            value={formatted}
            onChange={e => {
              const input = stripAccountNumber(e.target.value)
              if (/^\d*$/.test(input)) {
                field.onChange(input)
                if (errors.exchangeAccount) clearErrors('exchangeAccount')
              }
            }}
            error={!!errorMessage}
            errorMsg={errorMessage}
            shape="square"
            inputMode="numeric"
          />
        )
      }}
    />
  )
}

export default RefundAccountInput
