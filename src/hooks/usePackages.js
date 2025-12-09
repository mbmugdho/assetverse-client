import { useQuery } from '@tanstack/react-query'
import { fetchPackages } from '../services/packageService'

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
  })
}
