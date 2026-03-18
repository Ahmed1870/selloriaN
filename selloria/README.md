# 🛒 Selloria - E-Commerce Platform

متجر إلكتروني متكامل مبني بـ Next.js 14 + Supabase + Tailwind CSS

---

## 🚀 التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **Next.js 14** (App Router) | Frontend + Server Components |
| **Supabase** | Database, Auth, Storage |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icons |
| **TypeScript** | Type Safety |
| **Vercel** | Deployment |

---

## 📁 هيكل المشروع

```
selloria/
├── app/
│   ├── page.tsx                    # الرئيسية
│   ├── layout.tsx                  # Layout عام
│   ├── globals.css                 # Global styles
│   ├── auth/
│   │   ├── login/page.tsx          # تسجيل الدخول
│   │   └── register/page.tsx       # إنشاء حساب
│   ├── products/
│   │   ├── page.tsx                # قائمة المنتجات
│   │   └── [slug]/page.tsx         # صفحة منتج
│   ├── cart/page.tsx               # سلة التسوق
│   ├── checkout/page.tsx           # إتمام الطلب + Vodafone Cash
│   └── admin/
│       ├── layout.tsx              # Admin guard
│       ├── page.tsx                # Dashboard
│       ├── products/page.tsx       # إدارة المنتجات
│       ├── products/new/page.tsx   # إضافة منتج
│       ├── orders/page.tsx         # إدارة الطلبات
│       └── payments/page.tsx       # التحقق من الدفع
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductFilters.tsx
│   │   └── AddToCartButton.tsx
│   ├── cart/
│   │   └── CartProvider.tsx        # Cart Context
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── ProductForm.tsx
│   │   ├── OrderStatusUpdater.tsx
│   │   ├── PaymentVerifyButton.tsx
│   │   └── DeleteProductButton.tsx
│   └── ui/
│       └── Toaster.tsx
├── lib/
│   ├── supabase.ts                 # Supabase clients
│   └── cart.ts                    # Cart utilities
├── types/
│   └── index.ts                   # TypeScript types
└── supabase/
    └── schema.sql                  # Database schema
```

---

## ⚙️ خطوات التشغيل

### 1. إنشاء مشروع Supabase

1. اذهب إلى [supabase.com](https://supabase.com) وأنشئ مشروع جديد
2. من **SQL Editor**، شغّل كامل ملف `supabase/schema.sql`
3. من **Storage**، أنشئ bucket اسمه `payment-screenshots` (private)
4. من **Storage**، أنشئ bucket اسمه `product-images` (public)

### 2. إعداد المشروع محلياً

```bash
# Clone أو نزّل المشروع
cd selloria

# تثبيت الحزم
npm install

# انسخ ملف البيئة
cp .env.local.example .env.local
```

### 3. إعداد متغيرات البيئة

افتح `.env.local` وأضف:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

تجد هذه القيم في: Supabase Dashboard → Settings → API

### 4. تشغيل المشروع

```bash
npm run dev
# افتح http://localhost:3000
```

---

## 👑 إنشاء حساب أدمن

بعد إنشاء حسابك العادي عبر `/auth/register`، شغّل في **Supabase SQL Editor**:

```sql
UPDATE public.profiles
SET is_admin = TRUE
WHERE id = 'YOUR-USER-UUID';
```

ثم ادخل على `/admin` للوصول للوحة الإدارة.

---

## 💳 نظام الدفع (Vodafone Cash)

### كيف يعمل:
1. **العميل** يضيف منتجات للسلة ويكمل الطلب
2. في صفحة **Checkout**، يتبع العميل الخطوات:
   - يحوّل المبلغ على رقم `01019672878`
   - يدخل رقم محفظته
   - يرفع صورة إيصال التحويل
3. الطلب يتغير لحالة `payment_uploaded`
4. **الأدمن** يدخل على `/admin/payments` ويرى الإيصال
5. يضغط **"تأكيد الدفع"** → الحالة تصبح `payment_verified`
6. يتابع الأدمن الطلب: `processing` → `shipped` → `delivered`

---

## 🚀 النشر على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel

# أضف Environment Variables في Vercel Dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY  
# SUPABASE_SERVICE_ROLE_KEY
```

### إعداد CORS في Supabase:
في Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: `https://your-app.vercel.app/**`

---

## 🗃️ جداول قاعدة البيانات

| الجدول | الوصف |
|--------|-------|
| `profiles` | بيانات المستخدمين (موسّع على auth.users) |
| `categories` | فئات المنتجات |
| `products` | المنتجات |
| `orders` | الطلبات + بيانات Vodafone Cash |
| `order_items` | عناصر كل طلب |

---

## 🔐 الأمان (RLS)

- كل الجداول محمية بـ **Row Level Security**
- العملاء يشوفوا بياناتهم فقط
- الأدمن لديه وصول كامل
- المنتجات النشطة متاحة للجميع قراءةً

---

## 📞 الدعم

للمشاكل أو الاستفسارات، افتح Issue على GitHub.
