import { useQuery } from '@tanstack/react-query'
import { fetchHREmployees } from '../services/affiliationService'

export const useHREmployees = () => {
  return useQuery({
    queryKey: ['hr-employees'],
    queryFn: fetchHREmployees,
  })
}