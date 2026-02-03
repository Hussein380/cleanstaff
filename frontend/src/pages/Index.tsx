import { PageTransition } from "@/components/ui/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { HowItWorksPreview } from "@/components/sections/HowItWorksPreview";
import { IndustriesPreview } from "@/components/sections/IndustriesPreview";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <PageTransition>
      <Hero />
      <TrustIndicators />
      <ServicesPreview />
      <HowItWorksPreview />
      <IndustriesPreview />
      <CTASection />
    </PageTransition>
  );
};

export default Index;
