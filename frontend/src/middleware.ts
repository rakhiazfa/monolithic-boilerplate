import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import api from './endpoints/api';

const guestRoutes: string[] = ['/auth/sign-up', '/auth/sign-in'];
const protectedRoutes: string[] = ['/dashboard'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token');

    if (guestRoutes.includes(request.nextUrl.pathname) && accessToken?.value)
        return NextResponse.redirect(new URL('/dashboard', request.url));

    if (protectedRoutes.includes(request.nextUrl.pathname) && !accessToken?.value)
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));

    return NextResponse.next();
}
