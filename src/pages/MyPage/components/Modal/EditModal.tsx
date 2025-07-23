import { useEffect, useState } from 'react'
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/Input'
import Modal from '../../../../components/Modal/Modal'
import { putUserPassword, putUserNickname } from '../../../../apis/userInfo'

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
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const passwordFields = [
    {
      label: '기존 비밀번호',
      description: '기존 비밀번호를 입력해주세요',
      id: 'currentPassword',
      value: currentPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value),
    },
    {
      label: '새 비밀번호',
      description: '영문, 숫자, 특수문자 조합 8-16자',
      id: 'newPassword',
      value: newPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value),
    },
    {
      label: '새 비밀번호 확인',
      description: '영문, 숫자, 특수문자 조합 8-16자',
      id: 'confirmPassword',
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value),
    },
  ]

  useEffect(() => {
    if (isOpen) {
      setNewNickname(nickname)
      setNicknameError(null)
      setPasswordError(null)
    }
  }, [isOpen, nickname])

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

  const handleEditPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('모든 필드를 입력해주세요.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      setLoading(true)
      await putUserPassword({ password: newPassword })
      // 성공 후 초기화
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
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
                loading ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
                  ? 'bg-gray-50 text-gray-500'
                  : 'bg-pri-500 text-gray-10'
              }`}
              onClick={handleEditPassword}
              disabled={
                loading ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
            />
          </div>
          <div className="mb-3 flex flex-col gap-5">
            {passwordFields.map(({ label, description, id, value, onChange }) => (
              <div key={id}>
                <h4 className="text-fs12">{label}</h4>
                <Input
                  label={description}
                  id={id}
                  value={value}
                  onChange={onChange}
                  shape="underline"
                  type="password"
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
