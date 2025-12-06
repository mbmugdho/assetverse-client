import AboutSection from './AboutSection'
import HeroSection from './HeroSection'

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <AboutSection></AboutSection>
    </div>
  )
}

export default Home
