import apiClient from './apiClient'

// HR: fetch employees with asset counts
export const fetchHREmployees = async () => {
  const res = await apiClient.get('/affiliations/hr')
  return res.data
}

// HR: remove employee from team
export const removeEmployeeFromTeam = async id => {
  const res = await apiClient.patch(`/affiliations/${id}/remove`)
  return res.data
}