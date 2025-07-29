import admin from '.'
import { Pageable } from '../transactionFeed'

export const getDashboardData = async () => {
  const response = await admin.get('/dashboard')
  return response.data
}

export const getVolumeData = async (salesType?: string) => {
  const response = await admin.get('/dashboard/volume-stats', { params: { salesType } })
  return response.data
}

export const getUsers = async (pageable: Pageable) => {
  const response = await admin.get('/users', {
    params: pageable,
  })
  return response.data
}
