import axios from 'axios'
import { attachRequestInterceptor, attachResponseInterceptor } from './interceptors'

const adminClient = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

attachRequestInterceptor(adminClient, 'userAccessToken')
attachResponseInterceptor(adminClient, 'userAccessToken')

export interface ReportHistoryItem {
  transactionFeedId: number
  title: string
  salesType: string
  salesDataAmount: number
  reportType: string
  createdAt: string
  status: string
  reason: string
}

export interface ReportHistoryPageResponse {
  content: ReportHistoryItem[]
  totalPages: number
  number: number
  size: number
}

export const getMyReportHistory = async (
  page = 0,
  size = 6
): Promise<{ posts: ReportHistoryItem[]; totalPages: number }> => {
  const res = await adminClient.get<{ data: ReportHistoryPageResponse }>('/mypage/reports', {
    params: {
      page,
      size,
    },
  })
  return {
    posts: res.data.data.content,
    totalPages: res.data.data.totalPages,
  }
}

export interface ReportPayload {
  transactionFeedId: number
  reportTypeId: number
  reason: string
}

export interface ReportResponse {
  statusCode: number
  message: string
  data?: {
    statusCode: number
    statusCodeName: string
    detailMessage: string
  }
}

export const postReport = async (body: ReportPayload): Promise<ReportResponse> => {
  const res = await adminClient.post<ReportResponse>('/reports', body)
  return res.data
}
