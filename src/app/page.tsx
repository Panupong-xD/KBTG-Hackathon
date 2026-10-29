import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemGrid from '../components/ProblemGrid';
import Scrollytelling from '../components/Scrollytelling';
import FeatureDeepDive from '../components/FeatureDeepDive';
import TrustSecurityBanner from '../components/TrustSecurityBanner';
import InnovationConcept from '../components/InnovationConcept';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-kt-cream text-kt-ink selection:bg-kt-leaf selection:text-white font-sans">
      {/* 1. Navigation with the KaTang mark */}
      <Navbar />

      {/* 2. Hero Section - Data Science Track for First Jobbers */}
      <Hero />

      {/* 3. Problems KaTang aims to address */}
      <ProblemGrid />

      {/* 4. How It Works: Split-Screen Scrollytelling Walkthrough with Phone Mockup */}
      <Scrollytelling />

      {/* 5. Cash-flow prediction and user-confirmed saving */}
      <FeatureDeepDive />

      {/* 6. Trust and user control principles */}
      <TrustSecurityBanner />

      {/* 7. Concept and intended outcomes */}
      <InnovationConcept />

      {/* 8. Innovation Footer with prototype branding */}
      <Footer />
    </div>
  );
}
