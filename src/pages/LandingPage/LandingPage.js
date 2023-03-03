import React from 'react';

import Navbar from '../../components/ui/Navbar/Navbar';
import HeroSection from '../../components/landing_page/HeroSection';
import FeatureSection from '../../components/landing_page/FeatureSection';
import CTASection from '../../components/landing_page/CTASection';
import Footer from '../../components/ui/Footer/Footer';

const LandingPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CTASection />
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
