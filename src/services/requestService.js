import apiClient from './apiClient'

// Employee: create a new asset request
export const createRequest = async ({ assetId, note }) => {
  const res = await apiClient.post('/requests', { assetId, note })
  return res.data
}