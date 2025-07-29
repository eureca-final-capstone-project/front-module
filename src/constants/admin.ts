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

type StatusStyle =
  | { variant: 'default' }
  | { variant: 'secondary'; background: 'gray50' | 'gray200' }
  | { variant: 'outline'; status: 'success' | 'error' }
  | { className: string }

export const STATUS_STYLE: Record<string, StatusStyle> = {
  활성: { variant: 'default' },
  차단: { variant: 'secondary', background: 'gray50' },
  검수대기: { variant: 'secondary', background: 'gray200' },
  AI승인: { variant: 'outline', status: 'success' },
  AI거절: { variant: 'outline', status: 'error' },
  관리자승인: { className: 'bg-success' },
  관리자거절: { className: 'bg-error' },
  '제재 완료': { variant: 'default' },
  '제재 대기 중': { variant: 'secondary', background: 'gray200' },
}
