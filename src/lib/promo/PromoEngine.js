export const validatePromo = (code) => {
  const codes = {
    'SELLORIA2026': { type: 'percent', value: 15, msg: 'مبروك! خصم 15% لأول زبائن سيلوريا 🚀' },
    'RAMADAN': { type: 'fixed', value: 50, msg: 'هدية رمضان! خصم 50 جنيه على أوردرك 🌙' },
    'AHMED_CEO': { type: 'percent', value: 100, msg: 'كود المدير التنفيذي! الأوردر ده علينا يا بطل 👑' }
  };

  return codes[code.toUpperCase()] || { error: 'كود غير صحيح أو منتهي الصلاحية ❌' };
};
