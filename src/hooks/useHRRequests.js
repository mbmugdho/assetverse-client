import { useQuery } from '@tanstack/react-query'
import { fetchHRRequests } from '../services/requestService'

export const useHRRequests = status => {
  return useQuery({
    queryKey: ['hr-requests', status],
    queryFn: () => fetchHRRequests(status),
  })
}