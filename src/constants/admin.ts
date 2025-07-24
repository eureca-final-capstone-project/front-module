import DashboardIcon from '@/assets/icons/dashboard.svg?react'
import UsersIcon from '@/assets/icons/user.svg?react'
import ReportIcon from '@/assets/icons/report.svg?react'
import RestrictionIcon from '@/assets/icons/restriction.svg?react'
import { User } from '../types/admin'

export const adminSidebarMenu = [
  { label: '대시보드', path: '/admin/dashboard', icon: DashboardIcon },
  { label: '회원 내역', path: '/admin/users', icon: UsersIcon },
  { label: '신고 내역', path: '/admin/reports', icon: ReportIcon },
  { label: '제재 내역', path: '/admin/restrictions', icon: RestrictionIcon },
]

export const userColumns: { header: string; key: keyof User }[] = [
  { header: '이메일', key: 'email' },
  { header: '닉네임', key: 'nickname' },
  { header: '통신사', key: 'telecomCompany' },
  { header: '휴대폰 번호', key: 'phoneNumber' },
  { header: '가입일', key: 'createdAt' },
  { header: '피신고수', key: 'reportCount' },
  { header: '상태', key: 'status' },
  { header: '차단 관리', key: 'isBlocked' },
]
