import apiClient from './apiClient'

export const fetchPackages = async () => {
  const res = await apiClient.get('/packages')
  return res.data
}