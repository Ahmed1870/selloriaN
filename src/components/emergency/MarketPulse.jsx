"use client";
import { motion } from 'framer-motion';

export default function MarketPulse() {
  return (
    <div className="fixed bottom-10 left-10 z-50">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="glass p-4 rounded-2xl border-t-2 border-[#39FF14] shadow-[0_0_30px_rgba(57,255,20,0.3)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#39FF14] rounded-full animate-pulse" />
          <span className="text-xs font-black tracking-widest text-[#39FF14]">نبض السوق: 12 طلب استغاثة خصم في فيصل الآن</span>
        </div>
      </motion.div>
    </div>
  );
}
