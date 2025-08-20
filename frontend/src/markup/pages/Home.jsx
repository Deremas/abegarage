import React from "react";
import BannerSection from "../components/BannerSection/BannerSection";
import BottomBanner from "../components/BottomBanner/BottomBanner";
import ExperienceSection from "../components/ExperienceSection/ExperienceSection";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import QualityFeatureSection from "../components/QualityFeatureSection/QualityFeatureSection";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import CTASection from "../components/CTASection/CTASection";

function Home() {
  return (
    <>
      <BannerSection />
      <ExperienceSection />
      <ServicesSection />
      <QualityFeatureSection />
      <WhyChooseUs/>
      <BottomBanner />
      <CTASection/>
    </>
  );
}

export default Home;