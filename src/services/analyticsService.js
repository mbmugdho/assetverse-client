import apiClient from './apiClient'

export const fetchAssetTypeDistribution = async () => {
  const res = await apiClient.get('/analytics/asset-type-distribution')
  return res.data
}

export const fetchTopRequestedAssets = async () => {
  const res = await apiClient.get('/analytics/top-requested-assets')
  return res.data
}

export const fetchHRSummary = async () => {
  const res = await apiClient.get('/analytics/hr-summary')
  return res.data
}