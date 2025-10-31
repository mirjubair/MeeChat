// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  // if user is logged in, redirect them to chat page
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/chat', req.url));
  }

  // if user is not logged in, restrict access to /chat
  if (!user && pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
