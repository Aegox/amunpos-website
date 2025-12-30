import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/onboarding'] 
// Rutas para usuarios no autenticados
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  // Ahora usamos la cookie 'auth_token' que se establece en el landing
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  // Si el usuario intenta acceder a una ruta protegida sin token
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si el usuario ya tiene token y quiere ir a login/register
  if (token && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  // Si todo bien, dejar pasar
  return NextResponse.next()
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}

