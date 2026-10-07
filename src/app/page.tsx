'use client';

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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#00A950] selection:text-white font-sans">
      {/* 1. Sticky Navigation Bar with KBank Web Icon */}
      <Navbar />

      {/* 2. Hero Section - Data Science Track for First Jobbers */}
      <Hero />

      {/* 3. Problem Statement (01 - 04 Grid with KBank Green Numbers) */}
      <ProblemGrid />

      {/* 4. How It Works: Split-Screen Scrollytelling Walkthrough with Phone Mockup */}
      <Scrollytelling />

      {/* 5. Deep-Dive: 2 Merged Superpowers (AI Brain & Auto-Save Engine) */}
      <FeatureDeepDive />

      {/* 6. Architecture & Trust Banner (Compliance & Security) */}
      <TrustSecurityBanner />

      {/* 7. K PLUS Innovation Concept Showcase (Restored beloved design without early access modal) */}
      <InnovationConcept />

      {/* 8. Innovation Footer with KBank Brand */}
      <Footer />
    </div>
  );
}
