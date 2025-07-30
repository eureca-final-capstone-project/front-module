import admin from '.'

export const restrictionAccept = async (restrictionTargetId: number) => {
  const response = await admin.patch(`/restrict/${restrictionTargetId}/accept`)
  return response.data
}

export const restrictionReject = async (restrictionTargetId: number) => {
  const response = await admin.patch(`/restrict/${restrictionTargetId}/reject`)
  return response.data
}
