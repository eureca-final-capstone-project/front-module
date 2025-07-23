import DashboardIcon from '@/assets/icons/dashboard.svg?react'
import UsersIcon from '@/assets/icons/user.svg?react'
import ReportIcon from '@/assets/icons/report.svg?react'
import RestrictionIcon from '@/assets/icons/restriction.svg?react'

export const sidebarMenu = [
  { label: '대시보드', path: '/admin/dashboard', icon: DashboardIcon },
  { label: '회원 내역', path: '/admin/users', icon: UsersIcon },
  { label: '신고 내역', path: '/admin/reports', icon: ReportIcon },
  { label: '제재 내역', path: '/admin/restrictions', icon: RestrictionIcon },
]
