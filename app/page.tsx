import { HeroSection } from "@/components/blocks/hero-section-5"
import { ServicesSection } from "@/components/blocks/services-section"
import { PortfolioSection } from "@/components/blocks/portfolio-section"
import { AboutSection } from "@/components/blocks/about-section"
import { TestimonialsSection } from "@/components/blocks/testimonials-section"
import { Footer } from "@/components/blocks/footer"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
