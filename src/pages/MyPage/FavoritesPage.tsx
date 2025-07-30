import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDeviceType } from '../../hooks/useDeviceType'
import { useToast } from '../../hooks/useToast'
import useSelect from '../../hooks/useSelect'
import useModal from '../../hooks/useModal'
import { deleteWishPosts, getWishList, WishPost } from '../../apis/wish'
import { transformPostCard } from '../../utils/postCardParse'
import CheckBox from '../../components/CheckBox/CheckBox'
import BasicModal from './components/Modal/BasicModal'
import FavoritesHeader from './components/ButtonHeader/ButtonHeader'
import PostCard from '../../components/PostCard/PostCard'
import { buttonOptions } from './components/config'
import HeartIcon from '@/assets/icons/heart-bold.svg?react'
import Pagination from '../../components/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/BreadCrumb'

const FavoritesPage = () => {
  const deviceType = useDeviceType()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [selectedType, setSelectedType] = useState<'all' | 'normal' | 'bid'>('all')
  const { modalType, isOpen: isModalOpen, openModal, closeModal } = useModal()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const scroll = searchParams.get('scroll')
    if (scroll === 'bottom') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    setPage(1)
  }, [selectedType])

  const { data, isPending, isError } = useQuery({
    queryKey: ['wishList', selectedType, page],
    queryFn: async () => {
      const filterParam = mapFilterToApiParam(selectedType)
      const res = await getWishList({ filter: filterParam, page: page - 1, size: 4 })
      return {
        posts: res.data.content.map((item: WishPost) => transformPostCard(item, 'row')),
        totalPages: res.data.totalPages,
      }
    },
    placeholderData: previousData => previousData,
    retry: 1,
  })

  const postIds = data?.posts.map(post => post.transactionFeedId) || []
  const { selectedIds, toggleId, selectAll, clearAll, isSelected } = useSelect(postIds)
  const allChecked = postIds.length > 0 && postIds.every(id => selectedIds.includes(id))
  const gridColsClass =
    deviceType === 'mobile' ? 'grid-cols-1 bg-gray-10 p-4 ' : 'grid-cols-1 md:grid-cols-2'

  const handleSelectType = (value: string) => {
    if (['all', 'normal', 'bid'].includes(value)) setSelectedType(value as typeof selectedType)
  }
  const handleSelectAll = () => {
    const isAllSelected = postIds.every(id => selectedIds.includes(id))
    if (isAllSelected) {
      clearAll()
    } else {
      selectAll()
    }
  }

  const handleOpenModal = () => {
    if (selectedIds.length === 0) {
      showToast({ type: 'error', msg: '삭제할 항목을 선택해주세요.' })
      return
    }
    openModal('delete')
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
    } catch {
      showToast({ type: 'error', msg: '삭제 중 오류가 발생했습니다.' })
    }
  }

  const renderStatusFallback = () => {
    let title = ''
    let subtitle: React.ReactNode = null
    let textColor = 'text-gray-500'

    if (isPending) {
      title = '관심 목록을 불러오는 중이에요'
    } else if (isError) {
      title = '관심 목록을 불러오지 못했습니다'
      subtitle = (
        <p className="text-fs12 sm:text-fs14 mt-2 text-gray-400">잠시 후 다시 시도해주세요</p>
      )
      textColor = 'text-error'
    } else {
      title = '관심 거래로 등록하신 게시글이 없습니다'
      subtitle = (
        <div className="text-fs12 sm:text-fs14 mt-2 text-gray-400">
          <span>게시글 왼쪽 상단 하트를 통해 관심 거래를 등록해보세요!</span>
        </div>
      )
    }

    return (
      <div
        className={`flex h-[20vh] flex-col items-center justify-center text-center ${textColor}`}
      >
        <HeartIcon className="h-6 w-8 sm:h-8 sm:w-10" />
        <p className="text-fs16 sm:text-fs18 pt-3 font-medium">{title}</p>
        {subtitle}
      </div>
    )
  }

  return (
    <>
      {deviceType === 'mobile' ? <Breadcrumb current="관심 거래" /> : ''}
      <div className="flex flex-col gap-4 sm:gap-5">
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
        {isPending || isError || data?.posts.length === 0 ? (
          renderStatusFallback()
        ) : (
          <div className={`grid gap-4 ${gridColsClass}`}>
            {data.posts.map((post, index) => (
              <React.Fragment key={post.transactionFeedId}>
                <div className="flex items-start gap-2">
                  <CheckBox
                    checked={isSelected(post.transactionFeedId)}
                    onChange={() => toggleId(post.transactionFeedId)}
                    type={deviceType === 'mobile' ? 'smallCheckBox' : 'default'}
                  />
                  <div className="sm:bg-gray-10 sm:shadow-card-shadow sm:rounded-custom-m h-full min-w-0 flex-1 sm:block sm:p-3 lg:p-5">
                    <PostCard {...post} type="row" page="favorite" />
                  </div>
                </div>
                {index < data.posts.length - 1 && (
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
            onClickRight={handleConfirmDelete}
          />
        )}
        <div className="mt-3 flex justify-center pb-6">
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </>
  )
}

const mapFilterToApiParam = (type: 'all' | 'normal' | 'bid'): 'ALL' | 'NORMAL' | 'BID' => {
  switch (type) {
    case 'all':
      return 'ALL'
    case 'normal':
      return 'NORMAL'
    case 'bid':
      return 'BID'
  }
}

export default FavoritesPage
