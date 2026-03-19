export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans select-none" dir="rtl">
      <div className="text-[#39FF14] font-black text-2xl tracking-tighter mb-12">SELLORIA</div>
      
      <h1 className="text-white text-5xl md:text-7xl font-black text-center mb-6 leading-tight">
        تجارة ذكية. <br/> <span className="text-gray-600">بكل بساطة.</span>
      </h1>
      
      <p className="text-gray-500 text-center max-w-sm mb-12 text-sm leading-relaxed">
        المنصة المصرية الأولى للربط بين التجار والمناديب والعملاء بذكاء اصطناعي.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button className="bg-[#39FF14] text-black h-14 rounded-2xl font-black text-sm hover:scale-105 transition-all">تصفح المتجر</button>
        <button className="border border-white/10 text-white h-14 rounded-2xl font-black text-sm hover:bg-white/5 transition-all">بيع معنا</button>
      </div>
      
      <footer className="fixed bottom-8 text-gray-800 text-[10px] tracking-[0.2em] uppercase">
        Future of E-commerce in Egypt
      </footer>
    </main>
  );
}
