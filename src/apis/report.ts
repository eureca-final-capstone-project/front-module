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

export const getMyReportHistory = async (): Promise<ReportHistoryItem[]> => {
  const res = await adminClient.get<{ data: { content: ReportHistoryItem[] } }>('/mypage/reports')
  return res.data.data.content
}
