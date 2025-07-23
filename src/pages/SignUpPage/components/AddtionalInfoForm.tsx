import { useNavigate } from 'react-router-dom'
import { useDeviceType } from '../../../hooks/useDeviceType'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CARRIER_ID_MAP } from '../../../constants/carrier'
import { useState } from 'react'
import { agreements } from '../../../constants/agreements'
import Agreement from './Agreement'
import Button from '../../../components/Button/Button'
import { formatPhoneNumber } from '../../../utils/format'
import Input from '../../../components/Input/Input'
import DropDown from '../../../components/DropDown/DropDown'
import { AddtionalInfoSchemaTye } from '../../../types/auth'
import { addtionalInfoSchema } from '../../../utils/validation'
import { requestAddtionalInfo } from '../../../apis/auth'

const AddtionalInfoForm = () => {
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddtionalInfoSchemaTye>({
    resolver: zodResolver(addtionalInfoSchema),
    mode: 'all',
  })

  const carrier = watch('carrier')
  const phoneNumberValue = watch('phoneNumber')

  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const requiredAgreementsChecked = agreements
    .filter(item => item.required)
    .every(item => checked[item.id])

  const isActive = carrier && phoneNumberValue && !errors.phoneNumber && requiredAgreementsChecked

  const handleAgreementChange = (id: string, value: boolean) => {
    setChecked(prev => ({ ...prev, [id]: value }))
  }

  const mutation = useMutation({
    mutationFn: requestAddtionalInfo,
    onSuccess: data => {
      if (data.statusCode === 200) {
        navigate('/')
      } else {
        alert('회원가입 실패: ' + data.message)
      }
    },
    onError: error => {
      alert('회원가입 실패 ' + error.message)
    },
  })

  const handleSignUp = (data: AddtionalInfoSchemaTye) => {
    const payload = {
      telecomCompanyId: CARRIER_ID_MAP[data.carrier],
      phoneNumber: data.phoneNumber.replace(/-/g, ''),
    }
    mutation.mutate(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 sm:gap-10">
        <div className="flex gap-2">
          <Controller
            name="carrier"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DropDown
                type="provider"
                selected={field.value}
                onSelect={field.onChange}
                placeholder="통신사"
                className="w-30"
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                label="휴대폰 번호 *"
                id="phone"
                value={field.value}
                onChange={e => {
                  const formatted = formatPhoneNumber(e.target.value)
                  field.onChange(formatted)
                }}
                error={!!errors.phoneNumber}
                errorMsg={errors.phoneNumber?.message}
                shape={deviceType === 'mobile' ? 'square' : 'floating'}
              />
            )}
          />
        </div>
      </div>

      <Agreement checked={checked} onChange={handleAgreementChange} />

      <Button
        text="가입하기"
        type="submit"
        disabled={!isActive}
        className={
          'border-gray-10 text-gray-10 sm:bg-pri-500 sm:text-gray-10 border bg-transparent disabled:border-transparent disabled:bg-gray-50/50 disabled:text-gray-200 sm:mt-0 sm:border-none sm:disabled:bg-gray-50 sm:disabled:text-gray-500'
        }
      />
    </form>
  )
}

export default AddtionalInfoForm
