export const sendOrderUpdate = (customerName, orderStatus, phoneNumber) => {
  const messages = {
    'shipped': `يا ${customerName}، أوردرك من سيلوريا خرج دلوقتي مع المندوب! جهز الفكة واستعد 🚀`,
    'delivered': `مبروك يا ${customerName}! الأوردر وصل بالسلامة.. متنساش تقيم التاجر وتقولنا رأيك في سيلوريا ⭐`,
    'bargain_accepted': `مبروك! التاجر وافق على فصالك، السعر الجديد نزل في محفظتك دلوقتي ✅`
  };

  // هنا بنربط بـ API الواتساب (مثل Twilio أو UltraMsg)
  console.log(`إرسال رسالة إلى ${phoneNumber}: ${messages[orderStatus]}`);
  // fetch('API_URL', { method: 'POST', body: JSON.stringify({ to: phoneNumber, msg: messages[orderStatus] }) });
};
