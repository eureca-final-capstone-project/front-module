import admin from '.'
import { Pageable } from '../transactionFeed'

export const getUsers = async ({ keyword, pageable }: { keyword?: string; pageable: Pageable }) => {
  const response = await admin.get('/users', {
    params: { ...pageable, ...(keyword ? { keyword } : {}) },
  })
  return response.data
}

export const banUser = async ({ userId, isBanned }: { userId: number; isBanned: boolean }) => {
  const response = await admin.patch(`/users/${userId}/ban`, {
    isBanned,
  })
  return response.data
}

export const getUserReport = async (userId: number) => {
  const response = await admin.get(`/users/${userId}/report-list`)
  return response.data
}
