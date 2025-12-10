import { motion } from 'framer-motion'
import HRStatsCards from '../../../components/dashboard/HRStatsCards'
import AssetTypePieChart from '../../../components/dashboard/AssetTypePieChart'
import TopRequestedBarChart from '../../../components/dashboard/TopRequestedBarChart'

const HRAnalytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <HRStatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        <AssetTypePieChart />
        <TopRequestedBarChart />
      </div>
    </motion.div>
  )
}

export default HRAnalytics