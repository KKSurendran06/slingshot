import HeroSection from "@/components/landing/HeroSection";
import FeatureCards from "@/components/landing/FeatureCards";
import DashboardPreview from "@/components/landing/DashboardPreview";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <FeatureCards />
      <DashboardPreview />
      <CTASection />
      <Footer />
    </main>
  );
}
