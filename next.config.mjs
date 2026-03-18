/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعدادات لتعطيل الـ SWC عشان يشتغل في الترمكس (بيستخدم Babel بدل منه)
  swcMinify: false,

  // الإعدادات التجريبية لتقليل استهلاك الموارد ومنع الـ Worker Error
  experimental: {
    // تعطيل الـ Worker Threads بيجبر Next.js يشتغل في عملية واحدة (أبطأ بس أضمن)
    workerThreads: false,
    // تحديد عدد المعالجات بـ 1 عشان الموبايل ميسخنش ويفصل الـ Build
    cpus: 1,
  },

  // لو عندك إعدادات تانية زي الصور (Images) ضيفها هنا
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // عشان صور منتجات "رواج" من سوبابيز تظهر
      },
    ],
  },
};

export default nextConfig;
