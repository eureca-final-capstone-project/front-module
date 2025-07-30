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
