import { useState } from 'react'
import { modalTexts } from '../pages/MyPage/components/config'

type ModalType = keyof typeof modalTexts | null

const useModal = () => {
  const [modalType, setModalType] = useState<ModalType>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (type: ModalType) => {
    setModalType(type)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalType(null)
  }

  return { modalType, isOpen, openModal, closeModal }
}

export default useModal
