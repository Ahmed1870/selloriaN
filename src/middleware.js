import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // حماية صفحة الـ Admin: لو مش مسجل دخول، ارجع للرئيسية فوراً
  if (req.nextUrl.pathname.startsWith('/admin-only') && !session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin-only/:path*', '/api/payouts/:path*'],
};
