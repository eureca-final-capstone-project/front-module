import { useEffect, useState } from 'react'
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/Input'
import Modal from '../../../../components/Modal/Modal'
import { putUserPassword, putUserNickname } from '../../../../apis/userInfo'
import { nicknameSchema, passwordChangeSchema } from '../../../../utils/validation'
import { NicknameSchemaType, PasswordChangeSchemaType } from '../../../../types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { passwordFields } from '../config'
import { useToast } from '../../../../hooks/useToast'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  nickname: string
  onSuccess?: (newNickname: string) => void
}

const EditModal = ({ isOpen, onClose, nickname, onSuccess }: EditModalProps) => {
  const { showToast } = useToast()

  const [nicknameLoading, setNicknameLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    watch: watchPassword,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
  } = useForm<PasswordChangeSchemaType>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'all',
  })
  const {
    control: nicknameControl,
    handleSubmit: handleNicknameSubmit,
    reset: resetNicknameForm,
    watch: watchNickname,
    formState: { errors: nicknameErrors, isValid: isNicknameValid },
  } = useForm<NicknameSchemaType>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: { nickname },
    mode: 'onChange',
  })

  const nicknameValue = watchNickname('nickname')
  const isNicknameUnchanged = nicknameValue === nickname

  const { currentPassword, newPassword, confirmPassword } = watchPassword()
  const isPasswordFormIncomplete =
    !isPasswordValid || !currentPassword || !newPassword || !confirmPassword

  const onSubmitNicknameChange = async ({ nickname }: NicknameSchemaType) => {
    try {
      setNicknameLoading(true)
      await putUserNickname({ nickname })
      onSuccess?.(nickname)
      onClose()
    } catch {
      showToast({ type: 'error', msg: '닉네임 변경에 실패했습니다. 다시 시도해주세요.' })
    } finally {
      setNicknameLoading(false)
    }
  }

  const onSubmitPasswordChange = async (data: PasswordChangeSchemaType) => {
    try {
      setPasswordLoading(true)
      await putUserPassword({ password: data.newPassword })
      resetPasswordForm()
      onClose()
    } catch {
      showToast({ type: 'error', msg: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.' })
    } finally {
      setPasswordLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      resetPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      resetNicknameForm({ nickname })
    }
  }, [isOpen, nickname, resetPasswordForm, resetNicknameForm])

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
              disabled={nicknameLoading || !isNicknameValid || isNicknameUnchanged}
              className={`text-fs12 ${
                nicknameLoading || !isNicknameValid || isNicknameUnchanged
                  ? 'bg-gray-50 text-gray-500'
                  : 'bg-pri-500 text-gray-10'
              }`}
              onClick={handleNicknameSubmit(onSubmitNicknameChange)}
            />
          </div>
          <Controller
            name="nickname"
            control={nicknameControl}
            render={({ field }) => (
              <Input
                label="변경하실 닉네임을 입력해주세요"
                id="nickname"
                shape="underline"
                {...field}
                error={!!nicknameErrors.nickname}
                errorMsg={nicknameErrors.nickname?.message}
              />
            )}
          />
        </div>
        <div>
          <div className="mb-5 flex justify-between">
            <h3 className="text-fs16 my-1 font-medium">비밀번호 변경</h3>
            <Button
              extraSmallPadding
              text="변경"
              disabled={passwordLoading || isPasswordFormIncomplete}
              className={`text-fs12 transition-colors duration-200 ${
                passwordLoading || isPasswordFormIncomplete
                  ? 'bg-gray-50 text-gray-500'
                  : 'bg-pri-500 text-gray-10'
              }`}
              onClick={handlePasswordSubmit(onSubmitPasswordChange)}
            />
          </div>
          <div className="mb-3 flex flex-col gap-5">
            {passwordFields.map(({ name, label, placeholder }) => (
              <div key={name}>
                <h4 className="text-fs12">{label}</h4>
                <Controller
                  name={name}
                  control={passwordControl}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      id={name}
                      label={placeholder}
                      type="password"
                      shape="underline"
                      {...field}
                      error={!!passwordErrors[name]}
                      errorMsg={passwordErrors[name]?.message}
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditModal
