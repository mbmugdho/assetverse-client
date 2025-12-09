import { useQuery } from '@tanstack/react-query'
import { fetchCompanyTeam } from '../services/affiliationService'

export const useCompanyTeam = hrEmail => {
  return useQuery({
    queryKey: ['company-team', hrEmail],
    queryFn: () => fetchCompanyTeam(hrEmail),
    enabled: !!hrEmail,
  })
}