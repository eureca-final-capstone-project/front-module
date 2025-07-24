import Card from '../../../components/Card/Card'
import UserIcon from '@/assets/icons/user.svg?react'
import ReportIcon from '@/assets/icons/report.svg?react'

interface ManagementCardProps {
  title: string
  stats: { label: string; value: number }[]
  icon: React.ReactNode
  iconBgColor: string
}

const ManagementCard = ({ title, stats, icon, iconBgColor }: ManagementCardProps) => {
  return (
    <Card className="flex-1">
      <div className="flex items-center justify-between gap-5">
        <div className="space-y-5">
          <h3 className="text-fs20 font-bold">{title}</h3>
          <div className="flex gap-5">
            {stats.map((stat, idx) => (
              <div className="space-y-3" key={idx}>
                <div>{stat.label}</div>
                <div className="text-fs32">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`flex items-center justify-center rounded-full p-9`}
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
      </div>
    </Card>
  )
}

const SystemManagement = () => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-fs24">시스템 관리</h2>
      <div className="flex gap-11">
        <ManagementCard
          title="회원 관리"
          stats={[
            { label: '오늘 가입한 사용자', value: 17 },
            { label: '전체 사용자', value: 200 },
          ]}
          icon={<UserIcon className="text-pri-400 h-12 w-12" />}
          iconBgColor="#DCFAF8"
        />
        <ManagementCard
          title="신고 관리"
          stats={[
            { label: '오늘 신고 건수', value: 17 },
            { label: '전체 신고 건수', value: 200 },
          ]}
          icon={<ReportIcon className="text-error h-12 w-12" />}
          iconBgColor="#FFE0E1"
        />
      </div>
    </section>
  )
}

export default SystemManagement
