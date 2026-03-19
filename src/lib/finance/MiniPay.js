export const calculateHalalInstallments = (totalPrice) => {
  const downPayment = Math.ceil(totalPrice * 0.5); 
  const remaining = totalPrice - downPayment;
  return { 
    downPayment, 
    installments: [Math.ceil(remaining/2), Math.floor(remaining/2)],
    interestRate: 0, 
    lateFee: 0      
  };
};

export const getTrustScore = (onTimePayments) => {
  return onTimePayments >= 3 ? "عميل ذهبي - مسموح بالتقسيط" : "عميل جديد - الدفع كاش";
};
