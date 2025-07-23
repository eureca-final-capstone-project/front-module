import { useEffect, useState } from 'react'
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/Input'
import Modal from '../../../../components/Modal/Modal'
import { putUserPassword, putUserNickname } from '../../../../apis/userInfo'
import { passwordChangeSchema } from '../../../../utils/validation'
import { PasswordChangeSchemaType } from '../../../../types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { passwordFields } from '../config'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  nickname: string
  onSuccess?: (newNickname: string) => void
}

const EditModal = ({ isOpen, onClose, nickname, onSuccess }: EditModalProps) => {
  const [newNickname, setNewNickname] = useState(nickname)
  const [loading, setLoading] = useState(false)
  const [nicknameError, setNicknameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setNewNickname(nickname)
      setNicknameError(null)
      setPasswordError(null)
      reset() // 폼 초기화
    }
  }, [isOpen, nickname])

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordChangeSchemaType>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'all',
  })

  const currentPassword = watch('currentPassword')
  const newPassword = watch('newPassword')
  const confirmPassword = watch('confirmPassword')
  const isPasswordFormIncomplete = !isValid || !currentPassword || !newPassword || !confirmPassword

  const handleEditNickname = async () => {
    if (!newNickname || newNickname === nickname) return
    try {
      setLoading(true)
      await putUserNickname({ nickname: newNickname })
      onSuccess?.(newNickname)
      onClose()
    } catch {
      setNicknameError('닉네임 변경에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const onSubmitPasswordChange = async (data: PasswordChangeSchemaType) => {
    try {
      setLoading(true)
      await putUserPassword({ password: data.newPassword })
      reset()
      setPasswordError(null)
      onClose()
    } catch {
      setPasswordError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="flex flex-col gap-7">
      <h2 className="text-fs20 font-semibold">프로필 수정하기</h2>
      <div className="flex flex-col gap-11">
        <div>
          <div className="mb-1 flex justify-between">
            <h3 className="text-fs16 my-1 font-medium">닉네임 변경</h3>
            <Button
              extraSmallPadding
              text="변경"
              className={`text-fs12 ${
                loading || !newNickname || newNickname === nickname
                  ? 'bg-gray-50 text-gray-500'
                  : 'bg-pri-500 text-gray-10'
              }`}
              onClick={handleEditNickname}
              disabled={loading || !newNickname || newNickname === nickname}
            />
          </div>
          <Input
            label="변경하실 닉네임을 입력해주세요"
            id="nickname"
            value={newNickname}
            onChange={e => setNewNickname(e.target.value)}
            shape="underline"
          />
        </div>
        <div>
          <div className="mb-5 flex justify-between">
            <h3 className="text-fs16 my-1 font-medium">비밀번호 변경</h3>
            <Button
              extraSmallPadding
              text="변경"
              className={`text-fs12 transition-colors duration-200 ${
                loading || isPasswordFormIncomplete
                  ? 'bg-gray-50 text-gray-500'
                  : 'bg-pri-500 text-gray-10'
              }`}
              onClick={handleSubmit(onSubmitPasswordChange)}
              disabled={loading || isPasswordFormIncomplete}
            />
          </div>
          <div className="mb-3 flex flex-col gap-5">
            {passwordFields.map(({ name, label, placeholder }) => (
              <div key={name}>
                <h4 className="text-fs12">{label}</h4>
                <Controller
                  name={name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      id={name}
                      label={placeholder}
                      type="password"
                      shape="underline"
                      {...field}
                      error={!!errors[name]}
                      errorMsg={errors[name]?.message}
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {nicknameError && <p className="text-error text-fs12 mt-2">{nicknameError}</p>}
      {passwordError && <p className="text-error text-fs12 mt-2">{passwordError}</p>}
    </Modal>
  )
}

export default EditModal
