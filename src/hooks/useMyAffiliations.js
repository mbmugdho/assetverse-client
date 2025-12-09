import { useQuery } from '@tanstack/react-query'
import { fetchMyAffiliations } from '../services/affiliationService'

export const useMyAffiliations = () => {
  return useQuery({
    queryKey: ['my-affiliations'],
    queryFn: fetchMyAffiliations,
  })
}