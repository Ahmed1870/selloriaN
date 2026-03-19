import { createClient } from '@supabase/supabase-app';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const createOrder = async (merchantId, amount, commissionRate = 0.1) => {
  // 1. حساب عمولة أحمد (صاحب الموقع)
  const commission = amount * commissionRate;
  const merchantNet = amount - commission;

  // 2. تسجيل الأوردر في جدول Orders
  const { data, error } = await supabase
    .from('orders')
    .insert([
      { 
        merchant_id: merchantId, 
        total_amount: amount, 
        system_commission: commission,
        status: 'pending' 
      }
    ]);

  // 3. تحديث محفظة التاجر (Wallet Balance) بالقيمة الصافية
  if (!error) {
    await supabase.rpc('increment_merchant_balance', { 
      m_id: merchantId, 
      amount_to_add: merchantNet 
    });
  }

  return { data, error };
};
