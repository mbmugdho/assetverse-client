import apiClient from './apiClient'

// ============================================
// HR ROUTES (Authenticated - HR Only)
// ============================================

// Fetch HR assets with pagination and optional filters
export const fetchHRAssets = async ({
  page = 1,
  limit = 10,
  search = '',
  type = 'All',
  sortBy = 'dateAdded',
  sortOrder = 'desc',
}) => {
  const params = { page, limit, sortBy, sortOrder }
  if (search) params.search = search
  if (type && type !== 'All') params.type = type

  const res = await apiClient.get('/assets', { params })
  return res.data
}

// Delete an asset by id
export const deleteAsset = async (id) => {
  const res = await apiClient.delete(`/assets/${id}`)
  return res.data
}

// Create a new asset
export const createAsset = async (assetData) => {
  const res = await apiClient.post('/assets', assetData)
  return res.data
}

// Update an asset
export const updateAsset = async (id, assetData) => {
  const res = await apiClient.patch(`/assets/${id}`, assetData)
  return res.data
}

// ============================================
// AUTHENTICATED ROUTES (Employee or HR)
// ============================================

// Fetch all available assets (quantity > 0) - for employees to request
export const fetchAvailableAssets = async ({
  search = '',
  type = 'All',
} = {}) => {
  const params = {}
  if (search) params.search = search
  if (type && type !== 'All') params.type = type

  const res = await apiClient.get('/assets/available', { params })
  return res.data
}

// Fetch single asset details (requires login)
export const fetchAssetById = async (id) => {
  const res = await apiClient.get(`/assets/details/${id}`)
  return res.data
}

// ============================================
// PUBLIC ROUTES (No Auth Required)
// ============================================

// Fetch public assets with pagination and filters
export const fetchPublicAssets = async ({
  page = 1,
  limit = 12,
  search = '',
  type = 'All',
  sortBy = 'dateAdded',
  sortOrder = 'desc',
} = {}) => {
  const params = { page, limit, sortBy, sortOrder }
  if (search) params.search = search
  if (type && type !== 'All') params.type = type

  const res = await apiClient.get('/assets/public', { params })
  return res.data
}
