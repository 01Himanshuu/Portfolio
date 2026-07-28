import HeroSection from './components/HeroSection';
import IntroductionSection from './components/IntroductionSection';
import TwoWorldsGateway from './components/TwoWorldsGateway';
// import InteractiveScrollShowcase from './components/InteractiveScrollShowcase';

/**
 * Landing Page — Clean State Simplified
 * Consists of:
 * Navigation -> Hero -> Introduction -> Two Worlds Gateway
 *
 * All sections after Two Worlds Gateway are temporarily disabled to ensure natural,
 * uninhibited scrolling and a pristine 100% consecutive DOM structure.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <TwoWorldsGateway />
      {/* <InteractiveScrollShowcase /> -- Temporarily disabled for clean state */}
    </>
  );
}

