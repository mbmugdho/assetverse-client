import { useQuery } from '@tanstack/react-query'
import { fetchAssetById } from '../services/assetService'

export const useAssetDetails = (assetId) => {
  return useQuery({
    queryKey: ['asset-details', assetId],
    queryFn: () => fetchAssetById(assetId),
    enabled: !!assetId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}