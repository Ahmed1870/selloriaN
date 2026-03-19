import React from 'react';
import SelloriaBot from './components/SelloriaBot';

function App() {
  return (
    <div className="App bg-[#0a0a0a] min-h-screen text-white">
      {/* محتوى الموقع الرئيسي */}
      <div className="flex flex-col items-center justify-center pt-32 px-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center">
          SELL<span className="text-[#39FF14] drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">ORIA</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl font-light">
          مرحباً بك في مستقبل التجارة الإلكترونية الذكية. نحن نبني تجربة تسوق فريدة مدعومة بالذكاء الاصطناعي.
        </p>
        
        <div className="mt-10 flex gap-4">
          <button className="bg-[#39FF14] text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform">
            تصفح المنتجات
          </button>
          <button className="border border-white/20 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all">
            عن سيلوريا
          </button>
        </div>
      </div>

      {/* استدعاء المساعد الذكي */}
      <SelloriaBot />
      
      {/* تأثير إضاءة خلفي إضافي */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#39FF14] rounded-full blur-[180px] opacity-5"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#39FF14] rounded-full blur-[180px] opacity-5"></div>
      </div>
    </div>
  );
}

export default App;
