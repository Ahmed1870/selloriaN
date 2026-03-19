"use client";
export default function TrackOrder() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/5 p-10 rounded-[50px] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 bg-[#39FF14] text-black text-[8px] font-black uppercase rotate-12">Live GPS</div>
        <h1 className="text-2xl font-black mb-10">تتبع مندوب سيلوريا 🛵</h1>
        
        <div className="space-y-12">
          <div className="relative">
            <div className="h-1 w-full bg-white/5 absolute top-1/2 -translate-y-1/2"></div>
            <div className="h-1 w-2/3 bg-[#39FF14] absolute top-1/2 -translate-y-1/2 shadow-[0_0_15px_#39FF14]"></div>
            <div className="flex justify-between relative z-10">
              <span className="bg-[#39FF14] p-3 rounded-full">🏠</span>
              <span className="bg-[#39FF14] p-3 rounded-full animate-pulse">🛵</span>
              <span className="bg-white/10 p-3 rounded-full">🏪</span>
            </div>
          </div>
          <p className="text-gray-500 font-bold italic text-sm">المندوب استلم الأوردر وهو الآن في طريقه إليك..</p>
          <button className="w-full border border-white/10 py-4 rounded-2xl text-xs font-black hover:bg-white hover:text-black transition-all">اتصل بالمندوب الآن</button>
        </div>
      </div>
    </main>
  );
}
