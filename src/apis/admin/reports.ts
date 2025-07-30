import admin from '.'
import { Pageable } from '../transactionFeed'

export const getReports = async ({
  keyword,
  statusCode,
  pageable,
}: {
  keyword?: string
  statusCode?: string
  pageable: Pageable
}) => {
  const response = await admin.get('/reports/history', {
    params: { ...pageable, ...(keyword ? { keyword } : {}), ...(statusCode ? { statusCode } : {}) },
  })
  return response.data
}

export const getReportDetail = async (reportId: number) => {
  const response = await admin.get(`/reports/${reportId}/detail`)
  return response.data
}

export const processReportByAdmin = async ({
  reportHistoryId,
  approved,
}: {
  reportHistoryId: number
  approved: boolean
}) => {
  const response = await admin.patch(`/reports/history/${reportHistoryId}/process`, {
    approved,
  })
  return response.data
}
