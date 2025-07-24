import { useEffect, useState } from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'
import CheckBox from '../../components/CheckBox/CheckBox'
import BasicModal from './components/Modal/BasicModal'
import { buttonOptions } from './components/config'
import FavoritesHeader from './components/ButtonHeader/ButtonHeader'
import PostCard from '../../components/PostCard/PostCard'
import React from 'react'
import { useToast } from '../../hooks/useToast'
import useSelect from '../../hooks/useSelect'
import useModal from '../../hooks/useModal'
import { deleteWishPosts, getWishList, WishPost } from '../../apis/wish'
import { transformPostCard } from '../../utils/postCardParse'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type ModalType = 'delete'

const FavoritesPage = () => {
  const deviceType = useDeviceType()
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const [selectedType, setSelectedType] = useState<'both' | 'normal' | 'bid'>('both')
  const { modalType, isOpen: isModalOpen, openModal, closeModal } = useModal()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['wishList', selectedType],
    queryFn: async () => {
      const filterParam = mapFilterToApiParam(selectedType)
      const res = await getWishList({ filter: filterParam, page: 0, size: 20 })
      return res.data.content.map((item: WishPost) => transformPostCard(item, 'row'))
    },
    placeholderData: previousData => previousData,
    retry: 1,
  })

  const postIds = data?.map(post => post.transactionFeedId) || []
  const { selectedIds, toggleId, selectAll, clearAll, isSelected } = useSelect(postIds)
  const allChecked = postIds.length > 0 && postIds.every(id => selectedIds.includes(id))

  useEffect(() => {
    console.log('--------선택 삭제:', selectedIds)
  }, [selectedIds])

  const gridColsClass =
    deviceType === 'mobile' ? 'grid-cols-1 bg-gray-10 p-4 ' : 'grid-cols-1 md:grid-cols-2'

  const handleSelectType = (value: string) => {
    if (value === 'both' || value === 'normal' || value === 'bid') {
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

  const handleConfirmDelete = async () => {
    try {
      await deleteWishPosts(selectedIds)
      showToast({ type: 'success', msg: '삭제가 완료되었습니다.' })

      clearAll()

      queryClient.invalidateQueries({
        queryKey: ['wishList', selectedType],
      })
      closeModal()
    } catch (error) {
      showToast({ type: 'error', msg: '삭제 중 오류가 발생했습니다.' })
      console.error('삭제 오류:', error)
    }
  }

  const mapFilterToApiParam = (type: 'both' | 'normal' | 'bid'): 'ALL' | 'NORMAL' | 'BID' => {
    switch (type) {
      case 'both':
        return 'ALL'
      case 'normal':
        return 'NORMAL'
      case 'bid':
        return 'BID'
    }
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
        {isPending && <p>로딩중</p>}
        {isError && (
          <>
            {console.log(error)}
            <p className="text-red-500">로딩 중 에러가 발생했습니다</p>
          </>
        )}
        {!isPending &&
          !isError &&
          data &&
          data.map((post, index) => (
            <React.Fragment key={post.transactionFeedId}>
              <div className="flex items-start gap-2">
                <CheckBox
                  checked={isSelected(post.transactionFeedId)}
                  onChange={() => toggleSelected(post.transactionFeedId)}
                  type={deviceType === 'mobile' ? 'smallCheckBox' : 'default'}
                />
                <div className="sm:bg-gray-10 sm:shadow-card-shadow sm:rounded-custom-m h-full min-w-0 flex-1 sm:block sm:p-3 lg:p-5">
                  <PostCard {...post} type="row" page="favorite" />
                </div>
              </div>
              {index < data.length - 1 && (
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
