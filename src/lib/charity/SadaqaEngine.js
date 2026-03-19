export const calculateSadaqa = (totalPrice, isChecked) => {
  const amount = isChecked ? 1 : 0; // تبرع بـ 1 جنيه اختياري
  return { 
    totalWithSadaqa: totalPrice + amount,
    sadaqaAmount: amount,
    destination: "مؤسسة مجدي يعقوب أو 57357" 
  };
};

export const getCharityStats = (totalDonated) => {
  return `بفضل الله ثم دعمكم، سيلوريا ساهمت بـ ${totalDonated} ج.م في أعمال الخير الشهر ده! ✨`;
};
