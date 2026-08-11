import HeroSection from './components/HeroSection';
import IntroductionSection from './components/IntroductionSection';
import TwoWorldsGateway from './components/TwoWorldsGateway';
import BuildSection from './components/build/BuildSection';
import CreatorSection from './components/creator/CreatorSection';
import MergeSection from './components/merge/MergeSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/Footer';
/**
 * Landing Page — Clean State Simplified
 * Consists of:
 * Navigation -> Hero -> Introduction -> Two Worlds Gateway -> Build (Software Engineer) -> Create (Content Creator) -> Merge (The Synthesis) -> Contact (Collaborate Terminal)
 *
 * All sections after Contact are temporarily disabled to ensure natural,
 * uninhibited scrolling and a pristine 100% consecutive DOM structure.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <TwoWorldsGateway />
      <BuildSection />
      <CreatorSection />
      <MergeSection />
      <ContactSection />
      <Footer />
    </>
  );
}

