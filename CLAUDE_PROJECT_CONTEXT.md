# amunpos-website - Documentacion para Claude

> Este archivo sirve como contexto para que Claude entienda rapidamente el proyecto sin necesidad de explicaciones adicionales.

## Resumen Ejecutivo

**amunpos-website** es la landing page de AMUN POS. Una aplicacion Next.js moderna con sistema de autenticacion completo, formularios de contacto y presentacion del producto.

## Stack Tecnologico

| Aspecto | Tecnologia |
|---------|------------|
| Framework | Next.js 15.2.1 (App Router) |
| Runtime | React 19.0.0 |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| Formularios | React Hook Form 7.55 + Zod 3.24 |
| Animaciones | Framer Motion 12.6 |
| UI Components | Radix UI + shadcn/ui |
| Email | Nodemailer |
| Iconos | React Icons + Lucide React |

## Estructura Principal

```
amunpos-website/
├── src/
│   ├── app/
│   │   ├── api/              # API routes (email)
│   │   ├── components/       # 26 componentes de pagina
│   │   │   ├── AuthModal.tsx
│   │   │   ├── NavBar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── RegisterFlow.tsx
│   │   │   └── VerifyCode.tsx
│   │   ├── hooks/            # Hooks personalizados
│   │   │   ├── useUserLogin.js
│   │   │   ├── useUserRegister.js
│   │   │   ├── useVerifyCode.js
│   │   │   └── useGenerateCode.js
│   │   ├── utils/            # Utilidades
│   │   │   ├── api.js       # URL del backend
│   │   │   └── cookie.js    # Gestion de cookies
│   │   ├── onboarding/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/ui/        # shadcn/ui
│   ├── lib/utils.ts
│   └── middleware.ts         # Proteccion de rutas
└── public/                   # Assets estaticos
```

## Secciones de la Landing Page

1. **Hero** - Propuesta de valor principal
2. **Features** - 4 caracteristicas principales
3. **SoftwareFeatures** - Detalles del sistema
4. **UseCases** - Aplicaciones en negocios
5. **Pricing** - 3 planes (Basico $24, Estandar $50, Profesional $85)
6. **Testimonials** - Carrusel de 6 testimonios
7. **Partners** - Logos de marcas
8. **CallAction** - CTA de suscripcion
9. **Questions** - FAQ (5 preguntas)
10. **Contact** - Formulario de contacto
11. **Footer** - Info legal y redes

## Sistema de Autenticacion

**Flujo de Registro:**
1. Usuario hace clic en "Registrarse"
2. `<AuthModal/>` renderiza `<RegisterFlow/>`
3. `<Register/>` valida email y contrasena
4. `useGenerateCode()` envia codigo al email
5. `<VerifyCode/>` verifica el codigo
6. `useUserRegister()` registra el usuario
7. Token se guarda en cookie
8. Redirige a `http://localhost:5173/` (app POS)

**Validacion de Password:**
- 8+ caracteres
- Mayusculas y minusculas
- Numeros
- Simbolos especiales

**Cookies:**
- Secure flag
- SameSite=Strict
- Expiracion configurable

## Hooks Personalizados

```javascript
useUserLogin()     → { loginUser, loading, error, user }
useUserRegister()  → { registerUser, loading, error }
useVerifyCode()    → { verifyCode, loading, error }
useGenerateCode()  → { generateCode, loading, error }
useUserProfile()   → { getProfile, loading, error, profile }
useVerifyToken()   → { verifyToken, loading, isValid }
```

## Comunicacion con Backend

**API Base:** `process.env.NEXT_PUBLIC_API_URL || http://localhost:8080`

**Endpoints usados:**
```
POST /user/login      - Autenticacion
POST /user/register   - Registro
POST /auth/verifyCode - Verificar codigo
POST /user/profile    - Perfil de usuario
```

## Variables de Entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contrasena-app-gmail
```

## Como Ejecutar

```bash
npm install
npm run dev    # Puerto 3000 con Turbopack
```

## Middleware

**Rutas protegidas:**
- `/dashboard`
- `/onboarding`

**Comportamiento:**
- Valida token en cookie
- Token invalido → redirige a `/login`

## Integracion con Ecosistema AMUN

- **Este sitio:** www.amunpos.com (landing + auth)
- **App POS:** app.amunpos.com (localhost:5173 en dev)
- **API Backend:** api.amunpos.com (localhost:8080 en dev)

Despues del login/registro exitoso, redirige automaticamente a la app POS.

## Animaciones

Usa Framer Motion con:
- `initial` - Estado inicial
- `whileInView` - Animacion al hacer scroll
- `viewport` - Configuracion del viewport
- `transition` - Duracion y easing

## Notas Importantes

1. **Path alias:** `@/*` → `./src/*`
2. **Turbopack:** Usa `--turbopack` para desarrollo rapido
3. **Responsive:** Tailwind con breakpoints (md:, lg:, xl:, 2xl:)
4. **Accesibilidad:** Componentes Radix UI con ARIA

---

*Ultima actualizacion: Enero 2026*
