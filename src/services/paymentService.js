import apiClient from './apiClient'

// HR: create Stripe checkout session
export const createCheckoutSession = async packageName => {
  const res = await apiClient.post('/payments/create-checkout-session', {
    packageName,
  })
  return res.data // { url }
}

// HR: get payment history
export const fetchHRPayments = async () => {
  const res = await apiClient.get('/payments')
  return res.data
}

// HR: confirm payment after Stripe success
export const confirmPayment = async sessionId => {
  const res = await apiClient.get('/payments/confirm', {
    params: { session_id: sessionId },
  })
  return res.data
}