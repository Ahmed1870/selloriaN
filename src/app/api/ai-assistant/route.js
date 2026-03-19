import { NextResponse } from 'next/server';

export async function POST(req) {
  const { productName, price } = await req.json();

  // محاكاة ذكية لرادار السوق (Market Scraping Simulation)
  const competitors = [
    { site: 'Amazon', price: (price * 1.1).toFixed(0) },
    { site: 'Noon', price: (price * 0.95).toFixed(0) },
    { site: 'Jumia', price: (price * 1.05).toFixed(0) }
  ];

  const adCopy = "🔥 عرض لفترة محدودة على " + productName + "!\n\n" +
                 "✅ جودة عالمية بسعر محلي\n" +
                 "🚀 التوصيل لحد باب البيت\n" +
                 "💰 السعر المفاجأة: " + price + " ج.م فقط\n\n" +
                 "اطلب دلوقتي قبل نفاذ الكمية! 👇";

  return NextResponse.json({ 
    competitors,
    adCopy,
    strategy: "سعرك الحالي منافس جداً لـ Noon. ننصحك بالتركيز على جودة التوصيل في إعلاناتك."
  });
}
