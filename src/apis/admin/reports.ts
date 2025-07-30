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
