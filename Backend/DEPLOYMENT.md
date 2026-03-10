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

### Variables de correo (Resend)

Para que funcione la verificación por correo, agrega también:

- `MAIL_MAILER=resend`
- `RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx`
- `MAIL_FROM_ADDRESS=<correo_verificado_en_resend>`
- `MAIL_FROM_NAME=<nombre_que_vera_el_usuario>`

> Importante:
> - `RESEND_API_KEY` **no va en el código**. Solo en variables de entorno (`.env` local, Render, etc.).
> - En local puedes usar `onboarding@resend.dev` para pruebas iniciales; en producción usa un remitente de dominio verificado en Resend.

Si usas previews de Vercel, puedes permitirlos con patron regex:

- `CORS_ALLOWED_ORIGIN_PATTERNS=^https://.*\\.vercel\\.app$`

Notas:
- No agregues slash final en `APP_URL` ni en `CORS_ALLOWED_ORIGINS`.
- Si cambias variables, haz redeploy para que tome la nueva configuracion.

## 2) Frontend Vite en Vercel

En Vercel, define estas variables:

- `VITE_API_URL=https://<tu-backend>.onrender.com/api`
- `VITE_USE_MOCK_AUTH=false`

Este frontend ya incluye `vercel.json` para SPA, evitando 404 al refrescar rutas internas.

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

## 5) Local (Sail/Docker + Vite)

Backend:
- Levanta Sail y ejecuta migraciones.
- Configura en `Backend/.env`:
  - `MAIL_MAILER=resend`
  - `RESEND_API_KEY=<tu_api_key>`
  - `MAIL_FROM_ADDRESS=<sender_valido>`

Frontend:
- Usa `.env` con `VITE_API_URL=http://localhost:8000/api`.
- Si quieres login de prueba sin backend, usa `VITE_USE_MOCK_AUTH=true`.


## 6) Si "se envía" pero no llega a inbox

Revisa esto en orden:

1. **Dashboard de Resend > Emails**: confirma si el correo aparece como `delivered`, `bounced`, `blocked` o `complained`.
2. **`MAIL_FROM_ADDRESS`**: en producción debe ser un remitente de dominio verificado en Resend.
3. **Modo de pruebas de Resend**: con remitentes de prueba (como `onboarding@resend.dev`) la entrega puede estar limitada a correos verificados de tu cuenta.
4. **Spam / Promociones**: revisa estas bandejas antes de asumir fallo de envío.
5. **Logs del backend**: si Laravel no pudo enviar, quedará error en logs del servidor (ahora se registran fallos de envío y reenvío).
6. **Error `restricted_api_key` con `GET /emails/...`**: una API key “send-only” puede enviar correos pero no consultar endpoints de lectura. Ese error no impide el envío desde Laravel; elimina cualquier script externo que haga `GET /emails/*` con esa key o usa otra key con permisos de lectura para ese script.
7. **Producción**: evita `@resend.dev` como remitente y usa un dominio propio verificado en Resend.

