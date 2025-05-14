import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get('error');
  const loginUrl = new URL('/login', request.url);
  
  if (error) {
    loginUrl.searchParams.set('error', error);
  } else {
    loginUrl.searchParams.set('error', 'Authentication failed');
  }
  
  return NextResponse.redirect(loginUrl);
}