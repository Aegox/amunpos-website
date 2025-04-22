import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/onboarding']
// Rutas para usuarios no autenticados
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // Si el usuario intenta acceder a una ruta protegida sin token
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token') // Limpiar cualquier token inválido
    return response
  }

  // Si el usuario está autenticado e intenta acceder a login/register
  if (token && authRoutes.some(route => pathname.startsWith(route))) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    return response
  }

  return NextResponse.next()
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}
