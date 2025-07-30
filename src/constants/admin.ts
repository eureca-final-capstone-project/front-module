import DashboardIcon from '@/assets/icons/dashboard.svg?react'
import UsersIcon from '@/assets/icons/user.svg?react'
import ReportIcon from '@/assets/icons/report.svg?react'
import RestrictionIcon from '@/assets/icons/restriction.svg?react'
import { Report, ReportStatus, Restriction, RestrictionStatus, User } from '../types/admin'

export const adminSidebarMenu = [
  { label: '대시보드', path: '/admin/dashboard', icon: DashboardIcon },
  { label: '회원 내역', path: '/admin/users', icon: UsersIcon },
  { label: '신고 내역', path: '/admin/reports', icon: ReportIcon },
  { label: '제재 내역', path: '/admin/restrictions', icon: RestrictionIcon },
]

export const userColumns: { header: string; key: keyof User }[] = [
  { header: '이메일', key: 'email' },
  { header: '닉네임', key: 'nickName' },
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
  '검수 대기': { variant: 'secondary', background: 'gray200' },
  'AI 승인': { variant: 'outline', status: 'success' },
  'AI 거절': { variant: 'outline', status: 'error' },
  '관리자 승인': { className: 'bg-success' },
  '관리자 거절': { className: 'bg-error' },
  '제재 승인': { variant: 'default' },
  '제재 거절': { className: 'bg-error' },
  '제재 대기 중': { variant: 'secondary', background: 'gray200' },
  '제재 만료': { variant: 'secondary', background: 'gray50' },
}

export const reportTab = [
  { id: '', label: '전체' },
  { id: 'pending', label: '검수 대기' },
  { id: 'ai-accept', label: 'AI 승인' },
  { id: 'ai-reject', label: 'AI 거절' },
  { id: 'admin-accept', label: '관리자 승인' },
  { id: 'admin-reject', label: '관리자 거절' },
  { id: 'restrict-accept', label: '제재 완료' },
]

export const reportTabCode: Record<string, ReportStatus> = {
  pending: 'PENDING',
  'ai-accept': 'AI_ACCEPTED',
  'ai-reject': 'AI_REJECTED',
  'admin-accept': 'ADMIN_ACCEPTED',
  'admin-reject': 'ADMIN_REJECTED',
  'restrict-accept': 'COMPLETED',
}

export const reportColumns: { header: string; key: keyof Report }[] = [
  { header: '신고 번호', key: 'reportHistoryId' },
  { header: '신고글 제목', key: 'transactionFeedTitle' },
  { header: '신고자 이메일', key: 'reporterEmail' },
  { header: '신고 유형', key: 'reportType' },
  { header: '신고일', key: 'reportedAt' },
  { header: '상태', key: 'status' },
]

export const REPORT_STATUS_LABEL: Record<ReportStatus, string> = {
  PENDING: '검수 대기',
  AI_ACCEPTED: 'AI 승인',
  AI_REJECTED: 'AI 거절',
  ADMIN_ACCEPTED: '관리자 승인',
  ADMIN_REJECTED: '관리자 거절',
  COMPLETED: '제재 승인',
  REJECTED: '제재 거절',
}

export const restrictionTab = [
  { id: '', label: '전체' },
  { id: 'pending', label: '제재 대기 중' },
  { id: 'accept', label: '제재 승인' },
  { id: 'rejected', label: '제재 거절' },
  { id: 'expired', label: '제재 만료' },
]

export const restrictionTabCode: Record<string, RestrictionStatus> = {
  pending: 'PENDING',
  accept: 'COMPLETED',
  rejected: 'REJECTED',
  expired: 'RESTRICT_EXPIRATION',
}

export const restrictionColumns: { header: string; key: keyof Restriction }[] = [
  { header: '이메일', key: 'userEmail' },
  { header: '상태', key: 'status' },
  { header: '제재 승인/거절', key: 'restrictionStatus' },
]

export const RESTRICTION_STATUS_LABEL: Record<RestrictionStatus, string> = {
  PENDING: '제재 대기 중',
  COMPLETED: '제재 승인',
  REJECTED: '제재 거절',
  RESTRICT_EXPIRATION: '제재 만료',
}
