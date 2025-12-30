# Flujo Completo de Registro - AMUN POS

## Resumen del Flujo

```
Usuario → Registro → Verificación Email → Onboarding → Redirect a POS App
```

## Paso a Paso

### 1. Registro Inicial (RegisterFlow.tsx)

**Ubicación**: `www.amunpos.com` (o `localhost:3000` en desarrollo)

**Proceso**:
1. Usuario completa formulario de registro (email + password)
2. Sistema envía código de verificación al email
3. Usuario pasa a pantalla de verificación

**Endpoint API**: `POST /auth/generateCode`

### 2. Verificación de Código (VerifyCode.tsx)

**Proceso**:
1. Usuario ingresa código de 6 dígitos recibido por email
2. Sistema valida el código con la API
3. Si es válido, se crea el usuario en la base de datos
4. Se generan cookies de autenticación:
   - `auth_token`: Token JWT (domain: `.amunpos.com`)
   - `user_data`: Información del usuario (domain: `.amunpos.com`)
5. Redirect automático a `/onboarding`

**Endpoints API**:
- `POST /auth/verifyCode` - Verifica el código
- `POST /user/register` - Crea el usuario

**Redirect**:
- **Desarrollo**: `http://localhost:5173/onboarding`
- **Producción**: `https://app.amunpos.com/onboarding`

### 3. Onboarding (Onboarding.tsx)

**Ubicación**: Permanece en `www.amunpos.com/onboarding` (o `localhost:3000/onboarding`)

**Proceso**:
1. Página verifica que exista cookie `auth_token`
2. Si no hay token, redirige a login
3. Usuario completa información del negocio:
   - Nombre del negocio
   - Tipo de negocio
   - Número de empleados
4. Sistema actualiza el perfil del usuario
5. Redirect automático a la aplicación POS

**Endpoint API**: `PUT /user/edit`

**Headers**: `Authorization: Bearer {auth_token}`

**Redirect Final**:
- **Desarrollo**: `http://localhost:5173` (v0-pos)
- **Producción**: `https://app.amunpos.com` (v0-pos)

### 4. Aplicación POS (v0-pos)

**Ubicación**: `app.amunpos.com` (o `localhost:5173` en desarrollo)

**Proceso**:
1. Middleware de Next.js lee cookie `auth_token`
2. Si existe token, permite acceso
3. AuthStore rehydrata desde cookies
4. Usuario autenticado puede usar el POS

## Cookies Utilizadas

### auth_token
- **Contenido**: JWT token de autenticación
- **Domain**: `.amunpos.com` (producción) o sin domain (desarrollo)
- **Duración**: 7 días
- **Secure**: Solo en producción (HTTPS)
- **SameSite**: Lax

### user_data
- **Contenido**: JSON con información del usuario
- **Domain**: `.amunpos.com` (producción) o sin domain (desarrollo)
- **Duración**: 7 días
- **Secure**: Solo en producción (HTTPS)
- **SameSite**: Lax

## Endpoints API Utilizados

### Registro y Verificación
```
POST /auth/generateCode
Body: { email: string }
Response: { success: boolean, message: string }

POST /auth/verifyCode
Body: { email: string, code: string }
Response: { isValid: boolean }

POST /user/register
Body: { email: string, password: string }
Response: { token: string, user: object }
```

### Onboarding
```
PUT /user/edit
Headers: { Authorization: Bearer {token} }
Body: { 
  companyName: string,
  companyType: string,
  employeeRange: string
}
Response: { success: boolean, data: object }
```

## Configuración de Desarrollo

### amunpos-website (puerto 3000)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### v0-pos (puerto 5173)
```env
NEXT_PUBLIC_AMUN_POS_API_URL=http://localhost:8080
```

### API Backend (puerto 8080)
Debe estar corriendo y accesible

## Flujo de Redirecciones

```
localhost:3000/register
  ↓ (código verificado)
localhost:3000/onboarding
  ↓ (onboarding completado)
localhost:5173/ (POS App)
```

## Manejo de Errores

### Error en Verificación de Código
- Se muestra alert con mensaje de error
- Usuario puede reintentar
- No se crea el usuario hasta verificación exitosa

### Error en Onboarding
- Se muestra mensaje de error en pantalla
- Usuario puede reintentar
- Token sigue siendo válido

### Token Inválido en Onboarding
- Redirect automático a `/login`
- Usuario debe iniciar sesión nuevamente

## Testing del Flujo Completo

1. **Iniciar API Backend**:
   ```bash
   cd AMUN-POS-API
   npm start
   ```

2. **Iniciar amunpos-website**:
   ```bash
   cd amunpos-website
   npm run dev
   ```
   Disponible en: `http://localhost:3000`

3. **Iniciar v0-pos**:
   ```bash
   cd v0-pos
   npm run dev
   ```
   Disponible en: `http://localhost:5173`

4. **Probar Flujo**:
   - Ir a `localhost:3000`
   - Click en "Registrarse"
   - Completar formulario
   - Verificar código del email
   - Completar onboarding
   - Verificar redirect a `localhost:5173`
   - Confirmar que usuario está autenticado en POS

## Notas Importantes

- Las cookies se comparten entre dominios en producción gracias a `domain=.amunpos.com`
- En desarrollo, las cookies son independientes por dominio
- El token se almacena tanto en cookies como en localStorage para compatibilidad
- El middleware de v0-pos valida el token en cada request
- Si el token expira, el usuario es redirigido a login automáticamente

## Troubleshooting

### Usuario no se redirige después de verificar código
- Verificar que la API retorne `token` en la respuesta
- Revisar console del navegador para errores
- Confirmar que las cookies se están estableciendo

### Onboarding no carga
- Verificar que cookie `auth_token` exista
- Revisar que la API esté corriendo
- Confirmar que el endpoint `/user/edit` funcione

### Usuario no autenticado en v0-pos
- Verificar que las cookies se compartan correctamente
- Revisar que el middleware esté leyendo `auth_token`
- Confirmar que el token sea válido

---

**Última actualización**: Diciembre 2024  
**Estado**: Funcional en desarrollo y producción
