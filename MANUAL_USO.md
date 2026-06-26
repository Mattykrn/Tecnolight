# Manual de Uso - Tecnolight

## 📋 Índice

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación Completa](#instalación-completa)
4. [Inicio del Sitio](#inicio-del-sitio)
5. [Uso del Frontend](#uso-del-frontend)
6. [Panel de Administración](#panel-de-administración)
7. [Solución de Problemas](#solución-de-problemas)
8. [Mantenimiento](#mantenimiento)
9. [Estructura del Proyecto](#estructura-del-proyecto)

---

## 🏢 Introducción

**Tecnolight SRL** es un sitio web institucional desarrollado con tecnologías modernas para la gestión de señalización vial y cartelería. El sistema incluye:

- ✅ Sitio web público responsivo
- ✅ Catálogo de productos
- ✅ Galería de proyectos
- ✅ Formulario de contacto
- ✅ Panel de administración completo (CRUD)

### Tecnologías Utilizadas

**Frontend:**
- Next.js 14 (React)
- CSS Modules
- Framer Motion (animaciones)
- Lucide Icons

**Backend:**
- Node.js + Express
- PostgreSQL 18
- Prisma ORM
- JWT (autenticación)
- Nodemailer (emails)

---

## 💻 Requisitos del Sistema

### Software Necesario

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** o **yarn**
- **Git** (opcional)

### Verificar Instalación

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar PostgreSQL
psql --version

# Verificar servicio PostgreSQL
sudo systemctl status postgresql
```

---

## 🚀 Instalación Completa

### Para Arch Linux / Omarchy

#### Paso 1: Instalar PostgreSQL (si no está instalado)

```bash
sudo pacman -S postgresql postgresql-libs
```

#### Paso 2: Inicializar y arrancar PostgreSQL

```bash
# Inicializar base de datos (solo la primera vez)
sudo -iu postgres initdb -D /var/lib/postgres/data

# Iniciar el servicio
sudo systemctl start postgresql

# Habilitar inicio automático (opcional)
sudo systemctl enable postgresql
```

#### Paso 3: Clonar o ubicarse en el proyecto

```bash
cd /home/mati/Projects/Tecnolight
```

#### Paso 4: Otorgar permisos de ejecución a los scripts

```bash
chmod +x install.sh start.sh
```

#### Paso 5: Ejecutar instalador automático

```bash
./install.sh
```

El script instalará:
- ✅ Dependencias del backend
- ✅ Dependencias del frontend
- ✅ Generará el cliente de Prisma
- ✅ Creará la base de datos
- ✅ Ejecutará migraciones
- ✅ Cargará datos iniciales

---

## ▶️ Inicio del Sitio

### Inicio Manual (Recomendado)

#### Terminal 1 - Backend:

```bash
cd backend
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en puerto 5000
✅ Conectado a PostgreSQL
✅ Base de datos sincronizada
```

#### Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

Deberías ver:
```
✓ Ready on http://localhost:3000
✓ Event: ready in 5s
```

### Acceso al Sitio

Abrí tu navegador en:
- **Home**: http://localhost:3000
- **Nosotros**: http://localhost:3000/about
- **Catálogo**: http://localhost:3000/catalog
- **Proyectos**: http://localhost:3000/projects
- **Contacto**: http://localhost:3000/contact
- **Panel Admin**: http://localhost:3000/admin/login

---

## 🌐 Uso del Frontend

### Páginas Públicas

#### 1. Home (`/`)
- **Hero animado**: Presentación principal con llamada a la acción
- **Servicios**: Grid de servicios ofrecidos
- **Productos destacados**: Vista previa del catálogo
- **Clientes**: Logos de clientes confiables
- **CTA**: Llamada a contactar

#### 2. Nosotros (`/about`)
- **Historia**: Trayectoria de la empresa
- **Misión y Visión**: Valores institucionales
- **Diferencias**: Por qué elegirnos
- **Clientes**: Grid de logos
- **Certificaciones**: Acreditaciones

#### 3. Catálogo (`/catalog`)
- **Filtrado**: Por categoría
- **Listado**: Grid responsive de productos
- **Detalle** (`/catalog/[slug]`): 
  - Imágenes
  - Descripción completa
  - Especificaciones técnicas
  - Precio o "Consultar"

#### 4. Proyectos (`/projects`)
- Galería de proyectos realizados
- Cards con imagen
- Descripción del trabajo
- Cliente y ubicación

#### 5. Contacto (`/contact`)
- Formulario completo:
  - Nombre
  - Email
  - Teléfono (opcional)
  - Empresa/Municipio (opcional)
  - Mensaje
- Información de contacto:
  - Teléfono
  - Email
  - Dirección
  - Mapa (próximamente)

---

## 🔐 Panel de Administración

### Acceso

**URL**: http://localhost:3000/admin/login

**Credenciales por defecto:**
- **Email**: `admin@tecnolight.com.ar`
- **Password**: `admin123`

⚠️ **Importante**: Cambiar estas credenciales después del primer inicio.

### Funcionalidades del Panel

#### Dashboard (`/admin/dashboard`)

**Secciones disponibles:**

1. **Productos**
   - ✅ Crear nuevo producto
   - ✅ Editar producto existente
   - ✅ Eliminar producto
   - ✅ Activar/Desactivar
   - ✅ Marcar como destacado
   
   Campos:
   - Nombre
   - Slug (URL amigable)
   - Descripción
   - Categoría
   - Precio (opcional)
   - Imágenes (array de URLs)
   - Especificaciones técnicas
   - Destacado (sí/no)

2. **Proyectos**
   - ✅ Crear nuevo proyecto
   - ✅ Editar proyecto
   - ✅ Eliminar proyecto
   - ✅ Activar/Desactivar
   
   Campos:
   - Título
   - Slug
   - Descripción
   - Imágenes (array de URLs)
   - Cliente
   - Ubicación
   - Fecha de finalización

3. **Contactos**
   - Ver listado de consultas recibidas
   - Marcar como leído
   - Eliminar mensajes
   
   Información mostrada:
   - Nombre del cliente
   - Email
   - Teléfono
   - Empresa
   - Mensaje
   - Fecha
   - Estado (leído/no leído)

4. **Imágenes** (próximamente)
   - Gestión de galería

### Flujo de Trabajo Típico

1. **Agregar un producto nuevo:**
   ```
   Ir a "Productos" → "Nuevo Producto"
   → Completar formulario → "Guardar"
   ```

2. **Editar un producto:**
   ```
   Ir a "Productos" → Click en producto
   → Modificar campos → "Actualizar"
   ```

3. **Ver consultas de contacto:**
   ```
   Ir a "Contactos"
   → Ver listado de mensajes
   → Marcar como leído
   ```

---

## 🐛 Solución de Problemas

### Error 500 en Login

**Causa**: PostgreSQL no está corriendo o no está conectado.

**Solución**:
```bash
# Verificar estado de PostgreSQL
pg_isready

# Iniciar PostgreSQL
sudo systemctl start postgresql

# Verificar logs si persiste el error
sudo journalctl -u postgresql -f
```

### No puedo acceder a /about

**Solución**:
1. Verificar que el frontend esté corriendo en puerto 3000
2. Recargar con Ctrl+F5 (limpiar caché)
3. Verificar consola del navegador (F12)

### Puerto 5000 ocupado

**Error**: `EADDRINUSE: address already in use :::5000`

**Solución**:
```bash
# Opción 1: Matar proceso anterior
pkill -f "node src/server.js"

# Opción 2: Cambiar puerto en backend/.env
PORT=5001
```

### Prisma no genera cliente

**Error**: `Cannot find module '.prisma/client/default'`

**Solución**:
```bash
cd backend
npx prisma generate
```

### Base de datos no existe

**Error**: `Can't reach database server at localhost:5432`

**Solución**:
```bash
# Crear base de datos
sudo -iu postgres psql -c "CREATE DATABASE tecnolight_db;"

# Ejecutar migraciones
cd backend
npx prisma migrate dev --name init
```

### Seed falla al cargar datos

**Causa**: Tablas no creadas o datos duplicados

**Solución**:
```bash
cd backend
npx prisma migrate reset   # CUIDADO: Borra todos los datos
node database/seeds/seed.js
```

---

## 🔧 Mantenimiento

### Backup de Base de Datos

```bash
# Backup completo
sudo -iu postgres pg_dump tecnolight_db > backup.sql

# Restaurar backup
sudo -iu postgres psql tecnolight_db < backup.sql
```

### Actualizar Dependencias

```bash
# Backend
cd backend
npm update

# Frontend
cd frontend
npm update
```

### Ver Logs

```bash
# Backend (si usa nodemon)
# Los logs se muestran en la terminal donde se ejecutó npm start

# PostgreSQL
sudo journalctl -u postgresql -f
```

### Limpiar Caché de Next.js

```bash
cd frontend
rm -rf .next
npm run dev
```

---

## 📁 Estructura del Proyecto

```
tecnolight/
├── frontend/                      # Aplicación Next.js
│   ├── components/               # Componentes reutilizables
│   │   ├── Layout.jsx           # Layout principal
│   │   └── InteractiveRoadHero.jsx  # Hero con animación 3D
│   ├── pages/                    # Rutas (file-based routing)
│   │   ├── _app.js              # Configuración global
│   │   ├── _document.js         # HTML template
│   │   ├── index.jsx            # Home
│   │   ├── about.jsx            # Página Nosotros
│   │   ├── contact.jsx          # Formulario de contacto
│   │   ├── catalog/             # Catálogo de productos
│   │   │   ├── index.jsx        # Listado
│   │   │   └── [slug].jsx       # Detalle
│   │   ├── projects/            # Galería de proyectos
│   │   │   └── index.jsx
│   │   └── admin/               # Panel administrativo
│   │       ├── login.jsx        # Login
│   │       └── dashboard.jsx    # Panel CRUD
│   ├── styles/                   # Módulos CSS
│   │   ├── globals.css          # Estilos globales
│   │   ├── Home.module.css      # Estilos home
│   │   ├── About.module.css     # Estilos about
│   │   └── ...                  # Otros estilos
│   ├── public/                   # Archivos estáticos
│   │   ├── favicon.svg
│   │   └── site.webmanifest
│   ├── utils/                    # Utilidades
│   ├── package.json
│   └── next.config.js
│
├── backend/                       # API REST
│   ├── src/
│   │   └── server.js             # Servidor Express
│   ├── controllers/              # Lógica de negocio
│   │   ├── authController.js    # Login/registro
│   │   ├── contactController.js # Manejo de contactos
│   │   ├── productController.js # CRUD productos
│   │   └── projectController.js # CRUD proyectos
│   ├── routes/                   # Endpoints API
│   │   ├── auth.js
│   │   ├── contact.js
│   │   ├── products.js
│   │   └── projects.js
│   ├── middleware/               # Middlewares
│   │   └── auth.js              # Verificación JWT
│   ├── prisma/
│   │   ├── schema.prisma        # Modelo de datos
│   │   └── migrations/          # Historial de cambios
│   ├── database/
│   │   └── seeds/
│   │       └── seed.js          # Datos iniciales
│   ├── config/
│   ├── .env                     # Variables de entorno
│   └── package.json
│
├── database/                      # Scripts SQL legacy
│   ├── migrations/
│   └── seeds/
│
├── docs/                          # Documentación
│   ├── admin-guide.md
│   └── README.md
│
├── tests/                         # Tests
│   ├── backend/
│   │   └── api.test.js
│   └── frontend/
│
├── install.sh                    # Script de instalación
├── start.sh                      # Script de inicio rápido
├── README.md                     # Info general del proyecto
└── MANUAL_USO.md                # Este archivo
```

---

## 🔑 Credenciales por Defecto

```
Panel Admin:
  URL: http://localhost:3000/admin/login
  Email: admin@tecnolight.com.ar
  Password: admin123
```

⚠️ **CAMBIAR ESTAS CREDENCIALES EN PRODUCCIÓN**

Para cambiar la contraseña del administrador, editá el archivo `backend/.env`:

```env
ADMIN_EMAIL=nuevo_email@tecnolight.com.ar
ADMIN_PASSWORD=nueva_password_segura
ADMIN_NAME=Nuevo Nombre
```

Luego ejecutá el seed nuevamente:
```bash
cd backend
node database/seeds/seed.js
```

---

## 📞 Contacto Técnico

Para soporte técnico o consultas sobre el desarrollo:

**Email**: contacto@tecnolight.com.ar  
**Teléfono**: +54 (342) 456-7890  
**Dirección**: Bv. Pellegrini 3100, Santa Fe, Argentina

---

## 📝 Notas Adicionales

### Variables de Entorno

El archivo `backend/.env` contiene configuraciones sensibles. **No lo subas a Git**.

Principales variables:

```env
# Base de datos
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tecnolight_db"

# JWT (autenticación)
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=7d

# Servidor
PORT=5000
NODE_ENV=development

# Email (opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password

# Admin
ADMIN_EMAIL=admin@tecnolight.com.ar
ADMIN_PASSWORD=admin123
```

### Comandos Útiles

```bash
# Ver logs en tiempo real (backend)
cd backend && npm start

# Compilar Prisma después de cambios en schema
cd backend && npx prisma generate

# Resetear base de datos (CUIDADO: borra todo)
cd backend && npx prisma migrate reset

# Abrir Prisma Studio (interfaz gráfica para DB)
cd backend && npx prisma studio
```

---

## 🎯 Próximas Características

- [ ] Integración con Instagram API (galería de fotos)
- [ ] Sección de videos institucionales
- [ ] Sistema de cotizaciones online
- [ ] Blog/Noticias
- [ ] Testimonios de clientes
- [ ] Modo oscuro
- [ ] Multiidioma (ES/EN)

---

**Última actualización**: Junio 2025  
**Versión**: 1.0.0  
**Desarrollado para**: Tecnolight SRL