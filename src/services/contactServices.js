import apiClient from './apiClient'

// Submit contact form (public)
export const submitContactForm = async ({ name, email, subject, message }) => {
  const res = await apiClient.post('/contact', {
    name,
    email,
    subject,
    message,
  })
  return res.data
}

// Get contact submissions (HR only - for future admin panel)
export const fetchContactSubmissions = async ({
  status = 'all',
  page = 1,
  limit = 20,
} = {}) => {
  const params = { status, page, limit }
  const res = await apiClient.get('/contact', { params })
  return res.data
}

// Update contact status (HR only)
export const updateContactStatus = async (id, status) => {
  const res = await apiClient.patch(`/contact/${id}/status`, { status })
  return res.data
}
