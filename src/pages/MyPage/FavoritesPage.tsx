import { useEffect, useState } from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import CheckBox from '../../components/CheckBox/CheckBox'
import BasicModal from './components/Modal/BasicModal'
import { buttonOptions } from './components/config'
import FavoritesHeader from './components/ButtonHeader/ButtonHeader'
import PostCard, { PostCardProps } from '../../components/PostCard/PostCard'
import React from 'react'
import { useToast } from '../../hooks/useToast'
import useSelect from '../../hooks/useSelect'
import useModal from '../../hooks/useModal'

const dummyFavorites: PostCardProps[] = [
  {
    transactionFeedId: 1,
    type: 'row',
    telecomCompany: 'SKT',
    // imageWrapperClassName: 'w-30 h-30',
    defaultImageNumber: 1,
    salesDataAmount: '1500',
    title: 'SKT 데이터 팝니다',
    nickname: '데이터왕',
    createdAt: '2025.07.22 13:30',
    liked: true,
    onToggleLike: () => console.log('toggle like 1'),
    salesType: 'deal',
    salesPrice: 10000,
    currentHeightPrice: 0,
    status: 'active',
    onClick: () => console.log('카드 클릭 1'),
    favorite: true,
  },
  {
    transactionFeedId: 2,
    type: 'row',
    telecomCompany: 'LG U+',
    defaultImageNumber: 1,
    salesDataAmount: '1500',
    // imageWrapperClassName: 'w-30 h-30',
    title: 'U+ 데이터 팝니다',
    nickname: '데이터왕',
    createdAt: '2025.07.22 13:30',
    liked: true,
    onToggleLike: () => console.log('toggle like 1'),
    salesType: 'bid',
    salesPrice: 10000,
    currentHeightPrice: 0,
    status: 'active',
    onClick: () => console.log('카드 클릭 1'),
    favorite: true,
  },
  {
    transactionFeedId: 3,
    type: 'row',
    telecomCompany: 'KT',
    defaultImageNumber: 1,
    salesDataAmount: '800',
    title: 'KT 데이터 저렴하게!',
    nickname: '친절한KT',
    createdAt: '어제',
    liked: false,
    onToggleLike: () => console.log('toggle like 2'),
    salesType: 'bid',
    salesPrice: 7000,
    currentHeightPrice: 9500,
    status: 'completed',
    onClick: () => console.log('카드 클릭 2'),
    favorite: true,
    payhistory: true,
    payhistorytime: '2025.07.22 13:30',
    payhistorypay: 9500,
  },
]

type ModalType = 'delete'

const FavoritesPage = () => {
  const deviceType = useDeviceType()
  const { showToast } = useToast()
  const postIds = dummyFavorites.map(post => post.transactionFeedId)

  const { selectedIds, toggleId, selectAll, clearAll, isSelected } = useSelect(postIds)
  const [selectedType, setSelectedType] = useState<'both' | 'deal' | 'bid'>('both')
  const { modalType, isOpen: isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    console.log('--------선택 삭제:', selectedIds)
  }, [selectedIds])

  const gridColsClass = deviceType === 'mobile' ? 'grid-cols-1 bg-gray-10 p-4 ' : 'grid-cols-2'
  const allChecked = postIds.length > 0 && postIds.every(id => selectedIds.includes(id))

  const handleSelectType = (value: string) => {
    if (value === 'both' || value === 'deal' || value === 'bid') {
      setSelectedType(value)
    }
  }

  const toggleSelected = (id: number) => {
    toggleId(id)
  }

  const handleSelectAll = () => {
    const isAllSelected = postIds.every(id => selectedIds.includes(id))
    if (isAllSelected) {
      clearAll()
      console.log('---------전체 선택 해제: []')
    } else {
      selectAll()
      console.log('---------전체 선택:', postIds)
    }
  }

  const handleOpenModal = (type: ModalType) => {
    if (selectedIds.length === 0) {
      showToast({ type: 'error', msg: '삭제할 항목을 선택해주세요.' })
      return
    }
    openModal(type)
  }

  const handleConfirmDelete = () => {
    console.log('---------삭제 완료', selectedIds)
    // 삭제 API 로직
    closeModal()
  }

  return (
    <div className="flex flex-col gap-5">
      {/* 상단 */}
      <FavoritesHeader
        buttonOptions={buttonOptions.fav}
        selectedType={selectedType}
        onSelectType={handleSelectType}
        onOpenDeleteModal={handleOpenModal}
        onSelectAll={handleSelectAll}
        allChecked={allChecked}
      />
      {/* 콘텐츠 */}
      <div className={`grid gap-4 ${gridColsClass}`}>
        {dummyFavorites.map((post, index) => (
          <React.Fragment key={index}>
            <div className="flex items-start gap-2">
              <CheckBox
                checked={isSelected(post.transactionFeedId)}
                onChange={() => toggleSelected(post.transactionFeedId)}
                type={deviceType === 'mobile' ? 'smallCheckBox' : 'default'}
              />
              <div className="sm:bg-gray-10 sm:shadow-card-shadow w-full sm:block sm:rounded-[10px] sm:p-5">
                <PostCard {...post} />
              </div>
            </div>

            {/* 카드 div 바깥에서 hr 삽입 */}
            {index < dummyFavorites.length - 1 && (
              <hr className="border-0.5 block border-t border-gray-200 sm:hidden" />
            )}
          </React.Fragment>
        ))}
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
