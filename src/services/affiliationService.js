import apiClient from './apiClient'

// Employee: get own affiliations
export const fetchMyAffiliations = async () => {
  const res = await apiClient.get('/affiliations/me')
  return res.data
}

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

// Employee: get colleagues for a company by hrEmail
export const fetchCompanyTeam = async hrEmail => {
  const res = await apiClient.get('/affiliations/team', {
    params: { hrEmail },
  })
  return res.data
}