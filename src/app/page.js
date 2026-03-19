"use client";
import Hero from "../components/landing/Hero";
import UserReviews from "../components/reviews/UserReviews";
import SmartFAQ from "../components/support/SmartFAQ";
import PricingPlans from "../components/billing/PricingPlans";
import AffiliateHub from "../components/affiliate/AffiliateHub";
import SealOfTrust from "../components/merchant/SealOfTrust";
import CourierDashboard from "../components/courier/CourierDashboard";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto space-y-32 pb-32">
        <PricingPlans />
        <AffiliateHub />
        <SealOfTrust />
        <CourierDashboard />
      <UserReviews />
      <SmartFAQ />
      </div>
    </main>
  );
}
