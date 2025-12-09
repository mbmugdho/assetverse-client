import { useQuery } from '@tanstack/react-query'
import { fetchHRPayments } from '../services/paymentService'

export const useHRPayments = () => {
  return useQuery({
    queryKey: ['hr-payments'],
    queryFn: fetchHRPayments,
  })
}
