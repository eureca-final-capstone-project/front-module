import Badge from '../../../../components/Badge/Badge'
import InfoCard from './InfoCard'

const Profile = () => {
  const profileInfo = {
    nickname: '닉네임네임 닉네임',
    email: 'email@email.com',
    phoneNumber: '010-0000-0000',
    telecomCompany: {
      telecomCompanyId: 1,
      name: 'LG U+',
    },
  }
  // 추후 useQuery로 데이터 연동

  const getTelecomBadgeColor = (companyName: string) => {
    switch (companyName) {
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
    <InfoCard title="내 정보" showEditBtn={true}>
      <div>
        <h3 className="text-fs16 lg:text-fs18 font-medium">{profileInfo.nickname}</h3>
        <div className="text-fs14 mt-7 flex flex-col gap-3 text-gray-700">
          <p>{profileInfo.email}</p>
          <div className="flex items-center gap-[0.375rem]">
            <Badge
              size="small"
              className={`leading-none ${getTelecomBadgeColor(profileInfo.telecomCompany.name)}`}
              label={profileInfo.telecomCompany.name}
            />{' '}
            <p>{profileInfo.phoneNumber}</p>
          </div>
        </div>
      </div>
    </InfoCard>
  )
}

export default Profile
