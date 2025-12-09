import apiClient from './apiClient'

// Employee: fetch own assigned assets
export const fetchEmployeeAssets = async () => {
  const res = await apiClient.get('/assigned-assets/me')
  return res.data
}

// Employee: return an assigned asset (Returnable)
export const returnAssignedAsset = async id => {
  const res = await apiClient.patch(`/assigned-assets/${id}/return`)
  return res.data
}