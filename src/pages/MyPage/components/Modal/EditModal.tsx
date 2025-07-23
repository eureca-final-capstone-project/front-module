import { useEffect, useState } from 'react'
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/Input'
import Modal from '../../../../components/Modal/Modal'
import { putUserNickname } from '../../../../apis/userInfo'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  nickname: string
  onSuccess?: (newNickname: string) => void
}

const EditModal = ({ isOpen, onClose, nickname, onSuccess }: EditModalProps) => {
  const [newNickname, setNewNickname] = useState(nickname)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setNewNickname(nickname)
      setError(null)
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
      setError('닉네임 변경에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="flex flex-col gap-7">
      <h2 className="text-fs20 font-semibold">프로필 수정하기</h2>
      <div className="flex flex-col gap-11">
        <div>
          <div className="flex justify-between">
            <h3 className="text-fs16 font-medium">닉네임</h3>
            <Button
              smallPadding
              text="변경"
              className={`text-fs12 transition-colors duration-200 ${
                loading || !newNickname || newNickname === nickname
                  ? 'bg-gray-50 text-gray-500'
                  : 'bg-pri-500 text-gray-10'
              }`}
              onClick={handleEditNickname}
              disabled={loading || !newNickname || newNickname === nickname}
            />
          </div>
          <Input
            label="변경하실 닉네임을 입력해주세요."
            id="nickname"
            value={newNickname}
            onChange={e => setNewNickname(e.target.value)}
            shape="underline"
          />
        </div>
      </div>
      {error && <p className="text-error text-fs12 mt-2">{error}</p>}
    </Modal>
  )
}

export default EditModal
