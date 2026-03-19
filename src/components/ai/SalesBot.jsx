"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SalesBot({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'أهلاً بك في سيلوريا! أنا مساعدك الذكي. بتدور على حاجة معينة النهاردة؟ 🎁' }
  ]);

  const quickReplies = ['أرخص المنتجات 💰', 'أحدث الواصل 🆕', 'محتاج مساعدة 🤝'];

  const handleReply = (reply) => {
    setMessages([...messages, { role: 'user', text: reply }]);
    
    // محرك ذكاء اصطناعي بسيط للرد بناءً على بضاعة التاجر
    setTimeout(() => {
      let botResponse = "";
      if (reply.includes('أرخص')) {
        const cheapest = [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))[0];
        botResponse = "أرخص حاجة عندنا حالياً هي '" + cheapest.name + "' بسعر " + cheapest.price + " ج.م فقط! تحب أضيفها للسلة؟";
      } else if (reply.includes('أحدث')) {
        botResponse = "لسه واصل حالياً '" + products[0].name + "'.. قطعة مميزة جداً!";
      } else {
        botResponse = "أنا هنا عشان أسهل عليك. تقدر تختار من الأقسام فوق أو تسألني عن أي منتج.";
      }
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 2000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            style={{ width: '300px', background: '#111', border: '1px solid #39FF14', borderRadius: '20px', padding: '15px', marginBottom: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          >
            <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '15px' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ textAlign: m.role === 'bot' ? 'right' : 'left', marginBottom: '10px' }}>
                  <span style={{ background: m.role === 'bot' ? '#222' : '#39FF14', color: m.role === 'bot' ? '#fff' : '#000', padding: '8px 12px', borderRadius: '15px', fontSize: '13px', display: 'inline-block' }}>
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {quickReplies.map(r => (
                <button key={r} onClick={() => handleReply(r)} style={{ background: '#000', border: '1px solid #333', color: '#888', padding: '5px 10px', borderRadius: '10px', fontSize: '11px', cursor: 'pointer' }}>{r}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#39FF14', border: 'none', fontSize: '24px', cursor: 'pointer', boxShadow: '0 0 20px rgba(57, 255, 20, 0.4)' }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>
    </div>
  );
}
