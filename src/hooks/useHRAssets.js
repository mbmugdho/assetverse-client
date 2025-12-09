import { useQuery } from '@tanstack/react-query'
import { fetchHRAssets } from '../services/assetService'

export const useHRAssets = ({ page, limit = 10, search, type }) => {
  return useQuery({
    queryKey: ['hr-assets', page, limit, search, type],
    queryFn: () => fetchHRAssets({ page, limit, search, type }),
    keepPreviousData: true,
  })
}
