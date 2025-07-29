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
