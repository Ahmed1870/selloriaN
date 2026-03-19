"use client";
import React from 'react';
import Hero from "../components/landing/Hero";
import PricingPlans from "../components/billing/PricingPlans";
import AffiliateHub from "../components/affiliate/AffiliateHub";
import SealOfTrust from "../components/merchant/SealOfTrust";
import CourierDashboard from "../components/courier/CourierDashboard";
import UserReviews from "../components/reviews/UserReviews";
import SmartFAQ from "../components/support/SmartFAQ";
import MerchantWallet from "../components/merchant/MerchantWallet";
import PayoutManager from "../components/admin/PayoutManager";
import MonthlyReports from "../components/admin/MonthlyReports";
import LaunchFireworks from "../components/effects/LaunchFireworks";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-right relative" dir="rtl">
      {/* 1. تأثير الاحتفال عند الدخول */}
      <LaunchFireworks />

      {/* 2. زر الواتساب العائم (مكانه الصحيح داخل الـ return) */}
      <a 
        href="https://wa.me/201019672878?text=أهلاً سيلوريا، محتاج مساعدة!" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[110] bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-all animate-bounce"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48s3.48 5.228 3.48 8.404c0 6.556-5.332 11.888-11.888 11.888-2.015 0-3.991-.512-5.748-1.483l-6.235 1.708z"/>
        </svg>
      </a>

      {/* 3. واجهة الموقع الرئيسية */}
      <Hero />
      <div className="max-w-7xl mx-auto space-y-32 pb-32">
        <PricingPlans />
        <AffiliateHub />
        <SealOfTrust />
        <CourierDashboard />
        <UserReviews />
        <SmartFAQ />
        
        {/* 4. لوحات التحكم (للمعاينة حالياً) */}
        <div className="border-t border-white/5 pt-20">
          <h2 className="text-center text-gray-500 mb-10 text-sm italic">لوحة تحكم الإدارة (تجريبي)</h2>
          <MerchantWallet balance={42500} />
          <PayoutManager />
          <MonthlyReports />
        </div>
      </div>
    </main>
  );
}
