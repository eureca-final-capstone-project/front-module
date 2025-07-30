import admin from '.'
import { Pageable } from '../transactionFeed'

export const restrictionAccept = async (restrictionTargetId: number) => {
  const response = await admin.patch(`/restrict/${restrictionTargetId}/accept`)
  return response.data
}

export const restrictionReject = async (restrictionTargetId: number) => {
  const response = await admin.patch(`/restrict/${restrictionTargetId}/reject`)
  return response.data
}

export const getRestrictions = async ({
  keyword,
  statusCode,
  pageable,
}: {
  keyword?: string
  statusCode?: string
  pageable: Pageable
}) => {
  const response = await admin.get('/restrictions', {
    params: { ...pageable, ...(keyword ? { keyword } : {}), ...(statusCode ? { statusCode } : {}) },
  })
  return response.data
}

export const getRestrictinoReport = async (restrictId: number) => {
  const response = await admin.get(`/restricts/${restrictId}/report-list`)
  return response.data
}
