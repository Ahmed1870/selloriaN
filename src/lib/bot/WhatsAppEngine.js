export const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('قسط') || msg.includes('تقسيط')) {
    return "نظام سيلوريا قسّط متاح يا بطل! ادفع النص والباقي على أسبوعين بدون فوائد ولا غرامات. حلال 100% ✅";
  }
  if (msg.includes('شحن') || msg.includes('توصيل')) {
    return "طيارين سيلوريا في الطريق! الشحن بياخد من ساعتين لـ 48 ساعة بحد أقصى لأي مكان في مصر 🛵🇪🇬";
  }
  if (msg.includes('شكرا') || msg.includes('يا باشا')) {
    return "العفو يا غالي، سيلوريا في خدمتك دايماً! نورت إمبراطوريتنا 👑✨";
  }
  
  return "أهلاً بك في سيلوريا! أنا المساعد الذكي، تحب تعرف أكتر عن (التقسيط، الشحن، أو العروض)؟ 🤖";
};
