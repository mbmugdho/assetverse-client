import { useQuery } from '@tanstack/react-query'
import { fetchPublicAssets } from '../services/assetService'

export const usePublicAssets = ({
  page = 1,
  limit = 12,
  search = '',
  type = 'All',
  sortBy = 'dateAdded',
  sortOrder = 'desc',
} = {}) => {
  return useQuery({
    queryKey: ['public-assets', page, limit, search, type, sortBy, sortOrder],
    queryFn: () =>
      fetchPublicAssets({ page, limit, search, type, sortBy, sortOrder }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
