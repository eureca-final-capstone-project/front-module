export interface User {
  userId: number
  email: string
  nickName: string
  telecomCompany: string
  phoneNumber: string
  createdAt: string
  reportCount: number
  status: string
  isBlocked: boolean
}

export interface UserReport {
  reportId: number
  reportType: string
  content: string
  createdAt: string
  status: string
}

export type ReportStatus =
  | 'PENDING'
  | 'AI_ACCEPTED'
  | 'AI_REJECTED'
  | 'ADMIN_ACCEPTED'
  | 'ADMIN_REJECTED'
  | 'COMPLETED'
  | 'REJECTED'

export interface Report {
  reportHistoryId: number
  reportType: string
  reason: string
  status: ReportStatus
  reportedAt: string
  reporterId: number
  reporterEmail: string
  transactionFeedId: number
  transactionFeedTitle: string
}

export type RestrictionStatus = 'PENDING' | 'COMPLETED' | 'REJECTED' | 'RESTRICT_EXPIRATION'

export interface Restriction {
  restrictionTargetId: number
  userId: number
  userEmail: string
  reportType: string
  restrictionContent: string
  restrictionDuration: number
  status: RestrictionStatus
  expiresAt: string
  restrictionStatus: boolean
}

export interface RestrictionReport {
  reportId: number
  reportType: string
  content: string
  reportedAt: string
  status: ReportStatus
}
