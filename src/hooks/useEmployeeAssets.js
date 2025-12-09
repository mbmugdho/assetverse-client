import { useQuery } from '@tanstack/react-query'
import { fetchEmployeeAssets } from '../services/assignedAssetService'

export const useEmployeeAssets = () => {
  return useQuery({
    queryKey: ['employee-assets'],
    queryFn: fetchEmployeeAssets,
  })
}