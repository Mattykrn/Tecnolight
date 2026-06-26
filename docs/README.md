# 🚦 Tecnolight – Sitio Web Institucional

<div align="center">
  <h3>Señalización Vial y Cartelería · Santa Fe, Argentina · +30 años de trayectoria</h3>

  ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=nodedotjs)
  ![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=nextdotjs)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql)
  ![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat&logo=prisma)
  ![License](https://img.shields.io/badge/Licencia-MIT-yellow)
</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Requisitos Previos](#requisitos-previos)
- [Instalación Rápida](#instalación-rápida)
- [Variables de Entorno](#variables-de-entorno)
- [Base de Datos](#base-de-datos)
- [Ejecución en Desarrollo](#ejecución-en-desarrollo)
- [Tests](#tests)
- [Deploy en Producción](#deploy-en-producción)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Roadmap](#roadmap)

---

## Descripción

Sitio web institucional premium para **Tecnolight**, empresa líder en señalización vial y cartelería con más de 30 años de trayectoria en Santa Fe, Argentina.

**Funcionalidades principales:**
- 🏠 Home con presentación corporativa, historia y valores de la empresa
- 📦 Catálogo interactivo de señales (Reglamentarias, Preventivas, Informativas, Comerciales)
- 🏗️ Galería de proyectos realizados con testimonios de clientes
- 📬 Formulario de contacto con confirmación automática por email
- 🗺️ Ubicación integrada en Google Maps
- 🔐 Panel de administración completo con autenticación JWT

---

## Arquitectura

```
┌─────────────────┐        ┌──────────────────┐       ┌──────────────┐
│  Next.js 14     │  HTTP  │  Node.js/Express │  SQL  │  PostgreSQL  │
│  (Frontend SSR) │◄──────►│  REST API        │◄─────►│  (Prisma)    │
│  Puerto :3000   │        │  Puerto :5000    │       │  Puerto:5432 │
└─────────────────┘        └──────────────────┘       └──────────────┘
```

- **Frontend:** Next.js con Pages Router, SSR/SSG para SEO, CSS Modules, Framer Motion
- **Backend:** Express + Prisma ORM + JWT + bcrypt + Nodemailer
- **Base de datos:** PostgreSQL 15 (Docker local / Supabase en producción)
- **Deploy:** Vercel (frontend) + Railway o Render (backend)

---

## Requisitos Previos

| Herramienta | Versión mínima | Verificación |
|-------------|---------------|--------------|
| Node.js     | 18.x          | `node --version` |
| npm         | 9.x           | `npm --version` |
| Docker      | 24.x          | `docker --version` |
| Git         | 2.x           | `git --version` |

---

## Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tecnolight.git
cd tecnolight
```

### 2. Levantar la base de datos (Docker)

```bash
docker run --name tecnolight-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tecnolight_db \
  -p 5432:5432 \
  -d postgres:15
```

> 💡 Para persistir datos entre reinicios, añade: `-v tecnolight_data:/var/lib/postgresql/data`

### 3. Configurar el backend

```bash
cd backend
cp .env.example .env
# Editar .env con tus valores (ver sección Variables de Entorno)
npm install
```

### 4. Ejecutar migraciones y seed

```bash
npm run migrate        # Aplica migraciones de Prisma
npm run seed           # Carga datos de ejemplo (admin + productos + proyectos)
```

### 5. Configurar el frontend

```bash
cd ../frontend
npm install
```

---

## Variables de Entorno

### Backend (`backend/.env`)

```env
# Base de datos
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tecnolight_db?schema=public"

# JWT
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# Servidor
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email (SMTP – Gmail como ejemplo)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
EMAIL_FROM="Tecnolight <noreply@tecnolight.com.ar>"

# Administrador inicial (usado por el seed)
ADMIN_EMAIL=admin@tecnolight.com.ar
ADMIN_PASSWORD=Tecnolight2024!
ADMIN_NAME=Administrador
```

> ⚠️ **Importante:** Nunca subas el archivo `.env` al repositorio. Ya está en `.gitignore`.

### Frontend (`frontend/.env.local`) *(crear manualmente)*

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Base de Datos

### Estructura de tablas (Prisma Schema)

```
User        → Administradores del panel (email, password_hash, role)
Product     → Catálogo de señales (name, slug, category, description, specs, price, active)
Project     → Proyectos realizados (title, slug, client, location, description, testimonial)
Contact     → Consultas del formulario (name, email, phone, company, message, read)
```

### Comandos útiles de Prisma

```bash
cd backend

# Ver estado de migraciones
npx prisma migrate status

# Crear nueva migración
npx prisma migrate dev --name nombre_de_cambio

# Abrir Prisma Studio (interfaz visual)
npx prisma studio

# Reset completo (¡borra todos los datos!)
npx prisma migrate reset
```

---

## Ejecución en Desarrollo

### Iniciar backend

```bash
cd backend
npm run dev
# API disponible en: http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### Iniciar frontend

```bash
cd frontend
npm run dev
# Sitio disponible en: http://localhost:3000
```

### Credenciales del panel de administración (seed)

| Campo | Valor |
|-------|-------|
| URL   | http://localhost:3000/admin/login |
| Email | admin@tecnolight.com.ar |
| Contraseña | admin123 |

---

## Tests

```bash
cd tests
npm install    # Primera vez

# Ejecutar todos los tests
cd ../backend
npm test

# O con cobertura
npx jest --coverage
```

Los tests de integración usan **Jest + Supertest** y verifican:
- ✅ Health check de la API
- ✅ Autenticación JWT (login, perfil, rutas protegidas)
- ✅ CRUD completo de productos (con y sin token)
- ✅ Listado de proyectos
- ✅ Envío y validación del formulario de contacto
- ✅ Manejo de rutas inexistentes (404)

---

## Deploy en Producción

### Frontend → Vercel

```bash
# Instalar CLI de Vercel
npm i -g vercel

cd frontend
vercel --prod

# Variables de entorno a configurar en el dashboard de Vercel:
# NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
# NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Backend → Railway / Render

1. Crear nuevo servicio en [Railway](https://railway.app) o [Render](https://render.com)
2. Conectar el repositorio de GitHub
3. Configurar las variables de entorno del backend (igual que `.env`)
4. El comando de inicio es: `npm start`

### Base de datos en producción → Supabase

```bash
# En el backend, cambiar DATABASE_URL al string de conexión de Supabase:
DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
```

---

## Estructura de Carpetas

```
tecnolight/
├── frontend/
│   ├── components/          # Componentes reutilizables
│   │   ├── Layout.jsx       # Header + Footer globales
│   │   └── InteractiveRoadHero.jsx
│   ├── pages/               # Rutas de Next.js (Pages Router)
│   │   ├── index.jsx        # Home
│   │   ├── contact.jsx      # Contacto
│   │   ├── catalog/
│   │   │   ├── index.jsx    # Lista de productos
│   │   │   └── [slug].jsx   # Detalle de producto (SSR)
│   │   ├── projects/
│   │   │   └── index.jsx    # Galería de proyectos
│   │   └── admin/
│   │       ├── login.jsx    # Login de administrador
│   │       └── dashboard.jsx # Panel CRUD
│   ├── styles/              # CSS Modules por página + globals.css
│   └── utils/               # Helpers (API fetcher, validaciones)
│
├── backend/
│   ├── src/server.js        # Entry point de Express
│   ├── routes/              # Definición de endpoints
│   ├── controllers/         # Lógica de negocio
│   ├── middleware/          # Auth JWT, validaciones
│   ├── config/              # Config de DB, mailer
│   └── prisma/              # Schema y migraciones
│
├── database/
│   ├── migrations/          # Scripts SQL históricos
│   └── seeds/seed.js        # Datos iniciales
│
├── tests/
│   └── backend/api.test.js  # Tests de integración
│
└── docs/
    ├── README.md            # Este archivo
    └── admin-guide.md       # Manual del panel de administración
```

---

## Roadmap

### v1.1 – E-commerce básico
- [ ] Carrito de cotización (seleccionar múltiples productos)
- [ ] Generación automática de PDF con presupuesto
- [ ] Integración con MercadoPago

### v1.2 – Experiencia de usuario
- [ ] Chat en tiempo real con WebSockets
- [ ] Sistema de reservas para visitas técnicas
- [ ] Multilenguaje (español / inglés / portugués)

### v1.3 – Analytics avanzado
- [ ] Dashboard de métricas interno (visitas, consultas, conversión)
- [ ] Integración con CRM (HubSpot / Zoho)
- [ ] Chatbot de WhatsApp con inteligencia artificial

### v2.0 – Plataforma completa
- [ ] App móvil (React Native)
- [ ] Catálogo en AR (realidad aumentada) para ver señales en situ
- [ ] Portal de clientes con seguimiento de pedidos

---

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades, abrir un issue en GitHub o contactar al equipo de desarrollo.

**Tecnolight** · Santa Fe, Argentina · [tecnolight.com.ar](https://tecnolight.com.ar)
