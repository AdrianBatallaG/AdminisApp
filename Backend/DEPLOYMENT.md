# Deploy guide: Backend en Render + Frontend en Vercel

## 1) Backend Laravel en Render

Este backend ya incluye `render.yaml` para crear:
- 1 web service PHP (`adminis-lab-api`)
- 1 base de datos Postgres (`adminis-lab-db`)

### Variables obligatorias del servicio web

Configura estos valores en Render (Environment):

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY=<php artisan key:generate --show>`
- `APP_URL=https://<tu-backend>.onrender.com`
- `DB_CONNECTION=pgsql`
- `DATABASE_URL=<autogenerada por Render>`
- `FRONTEND_URL=https://<tu-frontend>.vercel.app`
- `CORS_ALLOWED_ORIGINS=https://<tu-frontend>.vercel.app`
- `CORS_ALLOWED_ORIGIN_PATTERNS=` (opcional)
- `CORS_SUPPORTS_CREDENTIALS=false`
- `SANCTUM_STATEFUL_DOMAINS=<tu-frontend>.vercel.app`

### Variables de correo (Gmail SMTP)

Para que funcione la verificación por correo con Gmail, configura:

- `MAIL_MAILER=smtp`
- `MAIL_HOST=smtp.gmail.com`
- `MAIL_PORT=587`
- `MAIL_SCHEME=tls`
- `MAIL_USERNAME=<tu_correo_gmail@gmail.com>`
- `MAIL_PASSWORD=<app_password_de_google_de_16_caracteres>`
- `MAIL_FROM_ADDRESS=<tu_correo_gmail@gmail.com>`
- `MAIL_FROM_NAME=<nombre_que_vera_el_usuario>`

> Importante:
> - Debes usar **App Password** de Google (no la contraseña normal de Gmail).
> - El `MAIL_FROM_ADDRESS` normalmente debe coincidir con el Gmail autenticado.
> - Las credenciales SMTP no van en el código; solo en variables de entorno.

### Qué anular/cambiar en Render si venías usando Brevo

- Quita o reemplaza valores antiguos de Brevo:
  - `MAIL_HOST=smtp-relay.brevo.com`
  - `MAIL_USERNAME=<usuario_brevo>`
  - `MAIL_PASSWORD=<clave_brevo>`
  - `MAIL_FROM_ADDRESS=<dominio_brevo>`
- Deja únicamente los valores de Gmail SMTP listados arriba.
- Después de guardar cambios, haz **Manual Deploy** para aplicar variables nuevas.

Si usas previews de Vercel, puedes permitirlos con patrón regex:

- `CORS_ALLOWED_ORIGIN_PATTERNS=^https://.*\.vercel\.app$`

Notas:
- No agregues slash final en `APP_URL` ni en `CORS_ALLOWED_ORIGINS`.
- Si cambias variables, haz redeploy para que tome la nueva configuración.

## 2) Frontend Vite en Vercel

En Vercel, define estas variables:

- `VITE_API_URL=https://<tu-backend>.onrender.com/api`
- `VITE_USE_MOCK_AUTH=false`

## 3) Endpoints de autenticación

- `POST /api/register`
- `POST /api/login`
- `POST /api/email/resend-verification`
- `POST /api/logout` (Bearer token)
- `GET /api/me` (Bearer token)

## 4) Flujo de verificación rápida

1. `POST /api/register` responde `201` con `requires_email_verification=true`.
2. Usuario recibe correo y abre el enlace firmado `/email/verify/{id}/{hash}`.
3. Backend marca el correo como verificado y redirige al frontend `/login?verified=1`.
4. `POST /api/login` responde `403` si el usuario no verificó correo; responde `200` con token cuando sí está verificado.

## 5) Si no llegan correos con Gmail

Revisa esto en orden:

1. `MAIL_USERNAME` y `MAIL_PASSWORD` (App Password) correctos.
2. Cuenta Gmail con 2FA activa y App Password vigente.
3. `MAIL_FROM_ADDRESS` igual al Gmail autenticado.
4. Spam/Promociones del destinatario.
5. Logs de Render para errores SMTP.

## 6) Si ves `OPTIONS /api/login` o `OPTIONS /api/register` con 500

Esto casi siempre es configuración CORS inválida en variables de entorno.

Checklist rápido:
1. `CORS_ALLOWED_ORIGINS` sin slash final (ej: `https://miapp.vercel.app`).
2. Si usas previews de Vercel, usa `CORS_ALLOWED_ORIGIN_PATTERNS=^https://.*\.vercel\.app$`.
3. Evita regex con delimitadores extra (`/regex/`) o caracteres sin escapar.
4. Después de cambiar variables en Render, haz redeploy para refrescar configuración cacheada.
