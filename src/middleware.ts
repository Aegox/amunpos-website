import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/onboarding'] 
// Rutas para usuarios no autenticados
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // <-- Asegurarse de extraer el valor
  const { pathname } = request.nextUrl

  // Si el usuario intenta acceder a una ruta protegida sin token
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token') // Borrar cualquier cookie vieja
    return response
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

