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

### Variables de correo (Brevo SMTP)

Para que funcione la verificación por correo, agrega también:

- `MAIL_MAILER=smtp`
- `MAIL_HOST=smtp-relay.brevo.com`
- `MAIL_PORT=587`
- `MAIL_USERNAME=<usuario_smtp_brevo>`
- `MAIL_PASSWORD=<clave_smtp_o_api_key_brevo>`
- `MAIL_ENCRYPTION=tls` (opcional recomendado)
- `MAIL_FROM_ADDRESS=<correo_verificado_en_brevo>`
- `MAIL_FROM_NAME=<nombre_que_vera_el_usuario>`

> Importante:
> - Las credenciales SMTP no van en el código. Solo en variables de entorno (`.env` local, Render, etc.).
> - `MAIL_FROM_ADDRESS` debe existir y estar validado/autorizado en tu cuenta de Brevo.

Si usas previews de Vercel, puedes permitirlos con patron regex:

- `CORS_ALLOWED_ORIGIN_PATTERNS=^https://.*\.vercel\.app$`

Notas:
- No agregues slash final en `APP_URL` ni en `CORS_ALLOWED_ORIGINS`.
- Si cambias variables, haz redeploy para que tome la nueva configuracion.

## 2) Frontend Vite en Vercel

En Vercel, define estas variables:

- `VITE_API_URL=https://<tu-backend>.onrender.com/api`
- `VITE_USE_MOCK_AUTH=false`

## 3) Endpoints de autenticacion

- `POST /api/register`
- `POST /api/login`
- `POST /api/email/resend-verification`
- `POST /api/logout` (Bearer token)
- `GET /api/me` (Bearer token)

## 4) Flujo de verificacion rapida

1. `POST /api/register` responde `201` con `requires_email_verification=true`.
2. Usuario recibe correo y abre el enlace firmado `/email/verify/{id}/{hash}`.
3. Backend marca el correo como verificado y redirige al frontend `/login?verified=1`.
4. `POST /api/login` responde `403` si el usuario no verificó correo; responde `200` con token cuando sí está verificado.

## 5) Si no llegan correos con Brevo

Revisa esto en orden:

1. Credenciales SMTP (`MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`).
2. `MAIL_FROM_ADDRESS` válido y autorizado en Brevo.
3. Actividad en Brevo (logs/eventos) para ver si entrega, rebote o bloqueo.
4. Carpeta Spam/Promociones en el correo destino.
5. Logs del backend para errores al enviar/reenviar verificación.

## 6) Si ves `OPTIONS /api/login` o `OPTIONS /api/register` con 500

Esto casi siempre es configuración CORS inválida en variables de entorno.

Checklist rápido:
1. `CORS_ALLOWED_ORIGINS` sin slash final (ej: `https://miapp.vercel.app`).
2. Si usas previews de Vercel, usa `CORS_ALLOWED_ORIGIN_PATTERNS=^https://.*\.vercel\.app$`.
3. Evita regex con delimitadores extra (`/regex/`) o caracteres sin escapar.
4. Después de cambiar variables en Render, haz redeploy para refrescar configuración cacheada.

