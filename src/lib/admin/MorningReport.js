export const generateCEOMail = (stats) => {
  return `
    <div style="direction: rtl; font-family: sans-serif; background: #0a0a0a; color: white; padding: 40px; border-radius: 30px;">
      <h1 style="color: #39FF14; text-align: center;">صباح الفل يا سيادة المدير ☕</h1>
      <p style="text-align: center; color: #888;">ملخص أداء إمبراطورية سيلوريا - ${new Date().toLocaleDateString('ar-EG')}</p>
      
      <div style="display: flex; justify-content: space-around; margin: 40px 0;">
        <div style="text-align: center; background: #111; padding: 20px; border-radius: 20px; border: 1px solid #333;">
          <p style="font-size: 12px; color: #555;">أرباح اليوم</p>
          <h2 style="color: #39FF14;">${stats.revenue} ج.م</h2>
        </div>
        <div style="text-align: center; background: #111; padding: 20px; border-radius: 20px; border: 1px solid #333;">
          <p style="font-size: 12px; color: #555;">تجار جدد</p>
          <h2 style="color: #00D1FF;">+${stats.newMerchants}</h2>
        </div>
      </div>

      <div style="background: #111; padding: 20px; border-radius: 20px; margin-bottom: 30px;">
        <h3 style="color: #FFD700; margin-bottom: 10px;">حالة الأسطول 🛵</h3>
        <p style="font-size: 14px; color: #ccc;">إجمالي المناديب النشطين الآن: <b>${stats.activeCouriers} طيار</b></p>
        <p style="font-size: 14px; color: #ccc;">أسرع توصيلة تمت في: <b>18 دقيقة!</b></p>
      </div>

      <div style="text-align: center; border-top: 1px solid #222; pt-20px; margin-top: 40px;">
        <p style="font-size: 10px; color: #444;">هذا التقرير مخصص لمدير سيلوريا فقط. للحفاظ على سرية البيانات.</p>
        <a href="https://selloria.app/unsubscribe" style="color: #666; font-size: 10px; text-decoration: underline;">إلغاء الاشتراك من التقارير اليومية (Unsubscribe)</a>
      </div>
    </div>
  `;
};
