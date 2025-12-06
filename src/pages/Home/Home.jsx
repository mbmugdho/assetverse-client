import AboutSection from './AboutSection'
import HeroSection from './HeroSection'
import PackagesSection from './PackagesSection'

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <AboutSection></AboutSection>
      <PackagesSection></PackagesSection>
    </div>
  )
}

export default Home
