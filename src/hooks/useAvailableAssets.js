import { useQuery } from '@tanstack/react-query'
import { fetchAvailableAssets } from '../services/assetService'

export const useAvailableAssets = ({ search, type }) => {
  return useQuery({
    queryKey: ['available-assets', search, type],
    queryFn: () => fetchAvailableAssets({ search, type }),
  })
}