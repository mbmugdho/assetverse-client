import { motion } from 'framer-motion'
import AboutSection from './AboutSection'
import ContactCTASection from './ContactCTASection'
import FAQSection from './FAQSection'
import FeaturesSection from './FeaturesSection'
import HeroSection from './HeroSection'
import HowItWorksSection from './HowItWorksSection'
import PackagesSection from './PackagesSection'
import TestimonialsSection from './TestimonialsSection'

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.05,
      ease: 'easeOut',
    },
  }),
}

const Home = () => {
  return (
    <div className="bg-section-soft min-h-[calc(100vh-4rem)]">
      {/* Hero: fade in on initial load (HeroSection has its own background) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <HeroSection />
      </motion.section>

      {/* Rest of the page on soft background */}
      
        {/* Other sections: reveal on scroll */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
        >
          <AboutSection />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={2}
        >
          <PackagesSection />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={3}
        >
          <FeaturesSection />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={4}
        >
          <TestimonialsSection />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={5}
        >
          <HowItWorksSection />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={6}
        >
          <FAQSection />
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={7}
        >
          <ContactCTASection />
        </motion.section>
      </div>
   
  )
}

export default Home