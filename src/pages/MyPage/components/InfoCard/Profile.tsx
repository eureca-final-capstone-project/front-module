import { useQuery, useQueryClient } from '@tanstack/react-query'
import Badge from '../../../../components/Badge/Badge'
import InfoCard from './InfoCard'
import { getUserProfile } from '../../../../apis/userInfo'
import { useState } from 'react'
import EditModal from '../Modal/EditModal'
import { getTelecomBadgeColor } from '../../../../utils/telecom'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'

const Profile = () => {
  const queryClient = useQueryClient()
  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleNicknameUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['userProfile'] })
  }

  return (
    <>
      <InfoCard title="프로필" showEditBtn={true} onEditClick={openModal}>
        {isLoading || isError || !profileInfo || !profileInfo.telecomCompany ? (
          <div className="flex h-40 items-center justify-center text-sm text-gray-500">
            {isLoading ? (
              <LoadingSpinner text="프로필 정보를 불러오는 중입니다" />
            ) : (
              '프로필 정보를 불러오지 못했습니다.'
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-fs16 lg:text-fs18 font-medium">{profileInfo.nickname}</h3>
            <div className="text-fs14 mt-7 flex flex-col gap-3 text-gray-700">
              <p>{profileInfo.email}</p>
              <div className="flex items-center gap-[0.375rem]">
                <Badge
                  size="small"
                  className={`leading-none ${getTelecomBadgeColor(profileInfo.telecomCompany.name)}`}
                  label={profileInfo.telecomCompany.name}
                />
                <p>{profileInfo.phoneNumber}</p>
              </div>
            </div>
          </div>
        )}
      </InfoCard>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        nickname={profileInfo?.nickname ?? ''}
        onSuccess={handleNicknameUpdate}
      />
    </>
  )
}

export default Profile
