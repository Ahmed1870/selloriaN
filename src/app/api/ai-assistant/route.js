import { NextResponse } from 'next/server';

export async function POST(req) {
  const { productName } = await req.json();

  // هنا هننادي على Gemini API (أنا هعملك محاكاة ذكية دلوقتي لحد ما تحط مفتاحك)
  const aiGeneratedDescription = "هذا المنتج المميز '"+productName+"' مصمم خصيصاً ليناسب الذوق الرفيع، يتميز بجودة الخامات وعمر افتراضي طويل. مناسب جداً للاستخدام اليومي وينافس الماركات العالمية في الجودة والسعر.";
  const suggestedPrice = "السعر العالمي التقريبي: 15-25 دولار | السعر المحلي المقترح: 750-950 ج.م";

  return NextResponse.json({ 
    description: aiGeneratedDescription,
    marketInsight: suggestedPrice 
  });
}
