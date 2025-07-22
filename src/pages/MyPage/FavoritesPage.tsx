import { useState } from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import CheckBox from '../../components/CheckBox/CheckBox'
import BasicModal from './components/Modal/BasicModal'
import { modalTexts, buttonOptions } from './components/config'
import FavoritesHeader from './components/ButtonHeader/ButtonHeader'

type ModalType = keyof typeof modalTexts

const FavoritesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [selectedType, setSelectedType] = useState<'both' | 'deal' | 'bid'>('both')

  const handleSelectType = (value: string) => {
    if (value === 'both' || value === 'deal' || value === 'bid') {
      setSelectedType(value)
    }
  }
  const deviceType = useDeviceType()
  const gridColsClass = deviceType === 'mobile' ? 'grid-cols-1 bg-gray-10 p-4 ' : 'grid-cols-2'

  const [checked, setChecked] = useState(false)

  const openModal = (type: ModalType) => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalType(null)
  }

  const handleConfirmDelete = () => {
    // 삭제 처리 로직
    console.log('삭제 완료')
    closeModal()
  }
  return (
    <div className="flex flex-col gap-5">
      {/* 상단 */}
      <FavoritesHeader
        buttonOptions={buttonOptions.fav}
        selectedType={selectedType}
        onSelectType={handleSelectType}
        onOpenDeleteModal={openModal}
      />
      {/* 콘텐츠 */}
      <div className={`grid gap-4 ${gridColsClass}`}>
        <div className="flex gap-2">
          <CheckBox
            checked={checked}
            onChange={() => setChecked(prev => !prev)}
            type={deviceType === 'mobile' ? 'smallCheckBox' : 'default'}
          />
          <div>
            <p>postCard 자리</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CheckBox
            checked={checked}
            onChange={() => setChecked(prev => !prev)}
            type={deviceType === 'mobile' ? 'smallCheckBox' : 'default'}
          />
          <div></div>
        </div>
      </div>
      {modalType && (
        <BasicModal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalType={modalType}
          onClickLeft={closeModal}
          onClickRight={handleConfirmDelete}
        />
      )}
    </div>
  )
}

export default FavoritesPage
