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
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ListIcon from '@/assets/icons/list.svg?react'
const TransactionHistoryPage = () => {
  const deviceType = useDeviceType()
  // const { showToast } = useToast()
  const { modalType, isOpen: isModalOpen, openModal, closeModal } = useModal()
  const navigate = useNavigate()

  const [selectedType, setSelectedType] = useState<'ALL' | 'PURCHASE' | 'SALE'>('ALL')

  const { data, isPending, isError } = useQuery({
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

  const renderStatusFallback = () => {
    let title = ''
    let subtitle: React.ReactNode = null
    let textColor = 'text-gray-500'

    if (isPending) {
      title = '거래 내역을 불러오는 중이에요'
    } else if (isError) {
      title = '거래 내역을 불러오지 못했습니다'
      subtitle = (
        <p className="text-fs12 sm:text-fs14 mt-2 text-gray-400">잠시 후 다시 시도해주세요</p>
      )
      textColor = 'text-error'
    } else {
      title = '진행하신 거래가 없습니다'
      subtitle = (
        <div className="text-fs12 sm:text-fs14 mt-2 text-gray-400">
          <Button text="판매글을 조회" shape="underline" onClick={() => navigate('/posts')} />
          <span>하고 거래를 시작해보세요!</span>
        </div>
      )
    }

    return (
      <div
        className={`flex h-[20vh] flex-col items-center justify-center text-center ${textColor}`}
      >
        <ListIcon className="h-6 w-8 sm:h-8 sm:w-10" />
        <p className="text-fs16 sm:text-fs18 pt-3 font-medium">{title}</p>
        {subtitle}
      </div>
    )
  }

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
      {isPending || isError || data?.length === 0 ? (
        renderStatusFallback()
      ) : (
        <div className={`grid gap-4 ${gridColsClass}`}>
          {data.map((post, index) => (
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
      )}
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
