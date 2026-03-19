"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function LiveMap() {
  const regions = [ { id: "cairo", name: "القاهرة", activity: 85, color: "#39FF14" }, { id: "alex", name: "الإسكندرية", activity: 75, color: "#00D1FF" },
    { id: 'faisal', name: 'فيصل', activity: 95, color: '#39FF14' },
    { id: 'haram', name: 'الهرم', activity: 70, color: '#00D1FF' },
    { id: 'talbia', name: 'الطالبية', activity: 40, color: '#FFD700' },
    { id: 'marioutia', name: 'المريوطية', activity: 20, color: '#FF4444' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-right">
      <div className="glass p-12 rounded-[50px] border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          
          {/* جانب الإحصائيات */}
          <div className="flex-1 w-full">
            <h2 className="text-4xl font-black mb-6">رادار <span className="text-gradient">السوق الحي</span></h2>
            <p className="text-gray-400 mb-10 text-lg">راقب نبض التجارة في منطقتك لحظة بلحظة ووجه بضاعتك للمكان الصح.</p>
            
            <div className="space-y-6">
              {regions.map(r => (
                <div key={r.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{r.name}</span>
                    <span style={{ color: r.color }}>{r.activity}% نشاط</span>
                  </div>
                  <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.activity}%` }}
                      style={{ background: r.color }}
                      className="h-full shadow-[0_0_10px_rgba(57,255,20,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* جانب الخريطة التفاعلية (Simple Abstract Map) */}
          <div className="flex-1 w-full flex justify-center items-center relative">
            <div className="relative w-80 h-80">
              {regions.map((r, i) => (
                <motion.div
                  key={r.id}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                  style={{ 
                    position: 'absolute',
                    width: `${r.activity * 2}px`,
                    height: `${r.activity * 2}px`,
                    background: r.color,
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    left: `${Math.random() * 50}%`,
                    top: `${Math.random() * 50}%`
                  }}
                />
              ))}
              <div className="relative z-10 text-8xl grayscale opacity-20">🗺️</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
