# Tecnolight - Sitio Web Institucional

Sitio web premium para Tecnolight SRL, empresa líder en señalización vial con más de 30 años de trayectoria.

## 🚀 Inicio Rápido

### Requisitos previos:
- Node.js 18+ instalado
- PostgreSQL corriendo en localhost:5432
- Base de datos `tecnolight_db` creada

### Pasos para iniciar:

#### 1. Iniciar PostgreSQL (Arch Linux / Omarchy)
```bash
sudo systemctl start postgresql
```
  
#### Usuarios de Arch Linux también pueden usar el script automático:
```bash
cd /home/mati/Projects/Tecnolight
./start.sh
```

#### 2. Configurar base de datos
```bash
cd backend

# Ejecutar migraciones
npx prisma migrate deploy

# Cargar datos iniciales (admin, productos, proyectos)
node database/seeds/seed.js
```

#### 3. Iniciar Backend (Terminal 1)
```bash
cd backend
npm start
```
Backend corriendo en: http://localhost:5000

#### 4. Iniciar Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend corriendo en: http://localhost:3000

## 📱 Acceso al Sitio

- **Home**: http://localhost:3000/
- **Nosotros**: http://localhost:3000/about
- **Catálogo**: http://localhost:3000/catalog
- **Proyectos**: http://localhost:3000/projects
- **Contacto**: http://localhost:3000/contact

## 🔐 Panel de Administración

- **URL**: http://localhost:3000/admin/login
- **Email**: admin@tecnolight.com.ar
- **Contraseña**: admin123

## 📦 Estructura del Proyecto

```
tecnolight/
├── frontend/                 # Next.js app
│   ├── components/          # Componentes reutilizables
│   ├── pages/               # Rutas principales
│   │   ├── admin/          # Panel de administración
│   │   ├── catalog/        # Catálogo de productos
│   │   └── about.jsx       # Página institucional
│   ├── styles/             # Módulos CSS
│   └── public/             # Archivos estáticos
├── backend/                 # API REST Node.js
│   ├── src/
│   │   └── server.js       # Servidor principal
│   ├── controllers/        # Lógica de negocio
│   ├── routes/             # Endpoints API
│   ├── middleware/         # Auth, validaciones
│   └── prisma/
│       └── schema.prisma   # Modelo de base de datos
└── database/
    ├── migrations/         # Migraciones SQL
    └── seeds/
        └── seed.js         # Datos iniciales
```

## 🎨 Características

### Frontend
- ✅ Next.js 14 con SSR
- ✅ Diseño 100% responsive
- ✅ Animaciones con Framer Motion
- ✅ SEO técnico avanzado
- ✅ PWA-ready (manifest + service worker)
- ✅ Accesibilidad (ARIA labels)

### Backend
- ✅ API REST Express.js
- ✅ Autenticación JWT
- ✅ Base de datos PostgreSQL
- ✅ Envío de emails (Nodemailer)
- ✅ Rate limiting y seguridad

### Contenido
- ✅ Página Home con hero animado
- ✅ Página Nosotros institucional
- ✅ Catálogo de productos (6 productos)
- ✅ Galería de proyectos (4 proyectos)
- ✅ Formulario de contacto
- ✅ Panel admin con CRUD completo

## 🛠️ Stack Tecnológico

### Frontend
- Next.js 14
- React 18
- CSS Modules
- Framer Motion
- Lucide Icons

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT + bcrypt
- Nodemailer
- Helmet + CORS

## 📝 Credenciales por Defecto

```
Email: admin@tecnolight.com.ar
Password: admin123
```

## 🚨 Solución de Problemas

### Error 500 en login
- Verificar que PostgreSQL esté corriendo: `pg_isready`
- Verificar que el backend esté corriendo: http://localhost:5000/api/health
- Ejecutar el seed: `cd backend && node database/seeds/seed.js`

### No puedo ver la página /about
- Verificar que el frontend esté corriendo en puerto 3000
- Recargar la página (Ctrl+F5)
- Verificar consola del navegador (F12)

### Puerto ocupado
```bash
# Cambiar puerto en .env.local
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## 📧 Contacto

- **Email**: contacto@tecnolight.com.ar
- **Teléfono**: +54 (342) 456-7890
- **Dirección**: Bv. Pellegrini 3100, Santa Fe, Argentina

## 📄 Licencia

MIT © Tecnolight SRL# Tecnoligth
