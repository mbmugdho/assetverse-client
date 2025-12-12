import apiClient from './apiClient'

// Fetch HR assets with pagination and optional filters
export const fetchHRAssets = async ({ page = 1, limit = 10, search = '', type = 'All' }) => {
  const params = { page, limit }
  if (search) params.search = search
  if (type && type !== 'All') params.type = type

  const res = await apiClient.get('/assets', { params })
  return res.data 
}

// Delete an asset by id
export const deleteAsset = async id => {
  const res = await apiClient.delete(`/assets/${id}`)
  return res.data
}

// Employee/HR: fetch all available assets (quantity > 0)
export const fetchAvailableAssets = async ({ search = '', type = 'All' } = {}) => {
  const params = {}
  if (search) params.search = search
  if (type && type !== 'All') params.type = type

  const res = await apiClient.get('/assets/available', { params })
  return res.data 
}