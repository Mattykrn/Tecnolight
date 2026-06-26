<<<<<<< HEAD
# Tecnolight
=======
# Tecnolight (versión del remoto)
>>>>>>> origin/main


- **Node.js** + **Express** - Servidor web
- **PostgreSQL** - Base de datos
- **Prisma ORM** - ORM para base de datos
- **JWT** - Autenticación
- **bcrypt** - Encriptación de contraseñas
- **Nodemailer** - Envío de emails
- **Helmet** - Seguridad HTTP
- **Express Rate Limit** - Limitación de requests

## 📋 Requisitos

- Node.js >= 16.x
- PostgreSQL >= 12.x
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd tecnolight/backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: Secreto para JWT (cambiar en producción)
- `EMAIL_USER` y `EMAIL_PASS`: Credenciales de email (Gmail, etc.)
- `ADMIN_EMAIL` y `ADMIN_PASSWORD`: Credenciales del admin inicial

4. **Configurar base de datos**
```bash
# Crear base de datos en PostgreSQL
createdb tecnolight_db

# Ejecutar migraciones
npm run migrate

# Poblar con datos iniciales
npm run seed
```

5. **Iniciar servidor**
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere auth)
- `PUT /api/auth/change-password` - Cambiar contraseña (requiere auth)

### Productos (Público)
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/categories` - Obtener categorías
- `GET /api/products/:slug` - Obtener producto por slug

### Productos (Admin - requiere auth)
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Proyectos (Público)
- `GET /api/projects` - Obtener todos los proyectos
- `GET /api/projects/:slug` - Obtener proyecto por slug

### Proyectos (Admin - requiere auth)
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

### Contacto
- `POST /api/contact` - Crear contacto (público)
- `GET /api/contact` - Obtener contactos (admin)
- `PUT /api/contact/:id/read` - Marcar como leído (admin)
- `DELETE /api/contact/:id` - Eliminar contacto (admin)

### Health Check
- `GET /api/health` - Verificar estado del servidor

## 🔐 Autenticación

Para acceder a rutas protegidas, incluir el token JWT en el header:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login en `/api/auth/login`.

## 📧 Configuración de Email

Para habilitar el envío de emails, configurar en `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-password-de-app
EMAIL_FROM=Tecnolight <noreply@tecnolight.com.ar>
```

**Nota**: Para Gmail, necesitas generar una "Contraseña de aplicación" en tu cuenta de Google.

## 🧪 Testing

```bash
npm test
```

## 📦 Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo (con nodemon)
- `npm run migrate` - Ejecutar migraciones de Prisma
- `npm run seed` - Poblar base de datos con datos iniciales
- `npm test` - Ejecutar tests

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt (10 rounds)
- JWT con expiración configurable
- Rate limiting en todas las rutas
- Validación de datos con express-validator
- Helmet para headers de seguridad
- CORS configurado
- Sanitización de inputs

## 📝 Notas

- El usuario admin inicial se crea al ejecutar `npm run seed`
- Credenciales por defecto: `admin@tecnolight.com.ar` / `admin123`
- **IMPORTANTE**: Cambiar estas credenciales en producción

## 🚀 Deploy

### Vercel
1. Conectar repositorio a Vercel
2. Configurar variables de entorno en Vercel
3. Configurar base de datos PostgreSQL (Supabase, Railway, etc.)
4. Deploy automático

### Variables de Entorno en Producción
```env
DATABASE_URL=postgresql://...
JWT_SECRET=secreto_super_seguro_en_produccion
NODE_ENV=production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_PASS=...
EMAIL_FROM=Tecnolight <noreply@tecnolight.com.ar>
FRONTEND_URL=https://tecnolight.com.ar
```

## 📄 Licencia

MIT - Tecnolight