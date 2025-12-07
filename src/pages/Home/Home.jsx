import AboutSection from './AboutSection'
import ContactCTASection from './ContactCTASection'
import FAQSection from './FAQSection'
import FeaturesSection from './FeaturesSection'
import HeroSection from './HeroSection'
import HowItWorksSection from './HowItWorksSection'
import PackagesSection from './PackagesSection'
import TestimonialsSection from './TestimonialsSection'

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <AboutSection></AboutSection>
      <PackagesSection></PackagesSection>
      <FeaturesSection></FeaturesSection>
      <TestimonialsSection></TestimonialsSection>
      <HowItWorksSection></HowItWorksSection>
      <FAQSection></FAQSection>
      <ContactCTASection></ContactCTASection>
    </div>
  )
}

export default Home
