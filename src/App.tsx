import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import HorizontalCardsSection from './components/HorizontalCardsSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <div className="grain-overlay" />
      <PageLoader />
      <Navbar />
      <HeroSection />
      <IntroSection />
      <HorizontalCardsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </>
  );
}
