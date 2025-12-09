import apiClient from './apiClient'

// Employee: create a new asset request
export const createRequest = async ({ assetId, note }) => {
  const res = await apiClient.post('/requests', { assetId, note })
  return res.data
}

// HR: fetch requests with optional status filter
export const fetchHRRequests = async (status = 'All') => {
  const params = {}
  if (status && status !== 'All') {
    params.status = status
  }
  const res = await apiClient.get('/requests/hr', { params })
  return res.data 
}

// HR: approve a request
export const approveRequest = async id => {
  const res = await apiClient.patch(`/requests/${id}/approve`)
  return res.data
}

// HR: reject a request
export const rejectRequest = async id => {
  const res = await apiClient.patch(`/requests/${id}/reject`)
  return res.data
}