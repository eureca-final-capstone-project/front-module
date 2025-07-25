import { useState } from 'react'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDeviceType } from '../../hooks/useDeviceType'
// import { useToast } from '../../hooks/useToast'
import useModal from '../../hooks/useModal'
import { getTransactionHistory } from '../../apis/userInfo'
import TransactionHeader from './components/ButtonHeader/ButtonHeader'

import PostCard from '../../components/PostCard/PostCard'
import { transformTransactionPostCard } from '../../utils/postCardParse'
import BasicModal from './components/Modal/BasicModal'
import { buttonOptions } from './components/config'

const TransactionHistoryPage = () => {
  const deviceType = useDeviceType()
  // const { showToast } = useToast()
  const { modalType, isOpen: isModalOpen, openModal, closeModal } = useModal()

  const [selectedType, setSelectedType] = useState<'ALL' | 'PURCHASE' | 'SALE'>('ALL')

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['transactionHistory', selectedType],
    queryFn: async () => {
      const res = await getTransactionHistory({ type: selectedType })
      return res.content.map(item => transformTransactionPostCard(item, 'row'))
    },
    placeholderData: previousData => previousData,
    retry: 1,
  })

  const gridColsClass =
    deviceType === 'mobile' ? 'grid-cols-1 bg-gray-10 p-4 ' : 'grid-cols-1 md:grid-cols-2'

  const handleSelectType = (value: string) => {
    if (['ALL', 'PURCHASE', 'SALE'].includes(value)) setSelectedType(value as typeof selectedType)
  }

  const handleOpenModal = () => openModal('delete')

  return (
    <div className="flex flex-col gap-5">
      {/* 상단 */}
      <TransactionHeader
        buttonOptions={buttonOptions.trade}
        selectedType={selectedType}
        onSelectType={handleSelectType}
        onOpenDeleteModal={handleOpenModal}
        onSelectAll={() => {}}
        allChecked={false}
      />
      {/* 콘텐츠 */}
      <div className={`grid gap-4 ${gridColsClass}`}>
        {isPending && <p>로딩중</p>}
        {isError && (
          <>
            {console.error(error)}
            <p className="text-error">로딩 중 에러가 발생했습니다</p>
          </>
        )}
        {data?.map((post, index) => (
          <React.Fragment key={post.transactionFeedId}>
            <div className="flex items-start gap-2">
              <div className="sm:bg-gray-10 sm:shadow-card-shadow sm:rounded-custom-m h-full min-w-0 flex-1 sm:block sm:p-3 lg:p-5">
                <PostCard {...post} type="row" page="tradehistory" />
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
          onClickRight={() => {}}
        />
      )}
    </div>
  )
}

export default TransactionHistoryPage
