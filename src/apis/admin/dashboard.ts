import admin from '.'

export const getDashboardData = async () => {
  const response = await admin.get('/dashboard')
  return response.data
}
