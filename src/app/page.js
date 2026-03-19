"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function Home() {
  const router = useRouter();
  const ADMIN_ID = "fa050cee-d5c1-405f-8114-f7045e2f28cb"; // الـ ID بتاعك يا أحمد

  useEffect(() => {
    // منطق التحقق: لو المسجل هو أحمد، وديه لوحة التحكم
    // ملاحظة: في الحقيقة بنجيب ده من الـ Session، بس دلوقتي بنأسس المنطق
    console.log("Welcome back, Commander Ahmed");
  }, []);

  return (
    <main className="bg-black min-h-screen text-right" dir="rtl">
      {/* زرار مخفي للقائد فقط للدخول السريع */}
      <div className="fixed top-4 left-4 z-[200]">
         <button 
           onClick={() => router.push('/admin-only')}
           className="w-8 h-8 rounded-full bg-[#39FF14]/10 hover:bg-[#39FF14] transition-all"
           title="Admin Entry"
         ></button>
      </div>

      <Hero />
      <div className="max-w-7xl mx-auto space-y-32 pb-32">
        <PricingPlans />
        <AffiliateHub />
        <SealOfTrust />
        <CourierDashboard />
        <UserReviews />
        <SmartFAQ />
        {/* المحفظة والتقارير بتظهر هنا كمثال للعرض */}
        <MerchantWallet balance={42500} />
        <PayoutManager />
        <MonthlyReports />
      </div>
    </main>
  );
}
