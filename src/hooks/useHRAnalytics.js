import { useQuery } from '@tanstack/react-query'
import {
  fetchAssetTypeDistribution,
  fetchTopRequestedAssets,
  fetchHRSummary,
} from '../services/analyticsService'

export const useAssetTypeDistribution = () =>
  useQuery({
    queryKey: ['hr-asset-type-distribution'],
    queryFn: fetchAssetTypeDistribution,
  })

export const useTopRequestedAssets = () =>
  useQuery({
    queryKey: ['hr-top-requested-assets'],
    queryFn: fetchTopRequestedAssets,
  })

export const useHRSummary = () =>
  useQuery({
    queryKey: ['hr-summary'],
    queryFn: fetchHRSummary,
  })