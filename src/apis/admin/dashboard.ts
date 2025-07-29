import admin from '.'

export const getDashboardData = async () => {
  const response = await admin.get('/dashboard')
  return response.data
}

export const getVolumeData = async (salesType?: string) => {
  const response = await admin.get('/dashboard/volume-stats', { params: { salesType } })
  return response.data
}
