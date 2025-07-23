import { useQuery } from '@tanstack/react-query'
import Badge from '../../../../components/Badge/Badge'
import InfoCard from './InfoCard'
import { getUserProfile } from '../../../../apis/userInfo'

const Profile = () => {
  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  })

  const getTelecomBadgeColor = (companyName: string) => {
    switch (companyName) {
      case 'LGU+':
      case 'LG U+':
        return 'bg-lguplus'
      case 'SKT':
        return 'bg-skt'
      case 'KT':
        return 'bg-kt'
      default:
        return 'bg-kt'
    }
  }

  return (
    <InfoCard title="프로필" showEditBtn={true}>
      {isLoading || isError || !profileInfo || !profileInfo.telecomCompany ? (
        <div className="flex h-40 items-center justify-center text-sm text-gray-700">
          {isLoading ? '로딩 중' : '프로필 정보를 불러오지 못했습니다.'}
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
  )
}

export default Profile
