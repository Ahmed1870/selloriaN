import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaWhatsapp, FaTimes } from 'react-icons/fa';

const SelloriaBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #39FF14" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#39FF14] text-black p-4 rounded-full shadow-2xl flex items-center justify-center text-2xl"
      >
        {isOpen ? <FaTimes /> : <FaRobot className="animate-bounce" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-20 right-0 w-[300px] h-[400px] bg-black/90 backdrop-blur-xl border border-[#39FF14]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-[#39FF14]/10 p-4 border-b border-[#39FF14]/20 flex items-center gap-3">
              <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-ping"></div>
              <h3 className="text-[#39FF14] font-bold text-xs">SELLORIA AI</h3>
            </div>
            <div className="flex-1 p-4 text-xs text-gray-300">
              أهلاً بك! أنا مساعدك الذكي.. اطلب أي منتج الآن 🚀
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelloriaBot;
