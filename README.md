# Tecnolight - Sitio Web Institucional

Sitio web premium para Tecnolight SRL, empresa líder en señalización vial con más de 30 años de trayectoria.

## 🚀 Inicio Rápido

### Requisitos previos:
- Node.js 18+ instalado
- PostgreSQL corriendo en localhost:5432
- Base de datos `tecnolight_db` creada

### Pasos para iniciar:

#### 1. Iniciar PostgreSQL
```bash
docker run -d --name tecnolight-pg \
  -e POSTGRES_DB=tecnolight_db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -p 5432:5432 postgres:16
```

#### 2. Configurar base de datos
```bash
cd backend
npx prisma db push
node database/seeds/seed.js
```

#### 3. Iniciar Backend (Terminal 1)
```bash
cd backend && npm start
```
Backend: http://localhost:5000

#### 4. Iniciar Frontend (Terminal 2)
```bash
cd frontend && npm run dev
```
Frontend: http://localhost:3000

## 📱 Acceso

| Página | URL |
|--------|-----|
| Home | http://localhost:3000/ |
| Nosotros | http://localhost:3000/about |
| Catálogo | http://localhost:3000/catalog |
| Proyectos | http://localhost:3000/projects |
| Contacto | http://localhost:3000/contact |
| Admin | http://localhost:3000/admin/login |

## 🔐 Panel Admin
- **Email**: admin@tecnolight.com.ar
- **Password**: admin123

## 📦 Stack
- **Frontend**: Next.js 14, React 18, CSS Modules, Framer Motion
- **Backend**: Node + Express, PostgreSQL + Prisma, JWT, Nodemailer
- **Seguridad**: Helmet, CORS, Rate limiting, 2FA

## 📄 Licencia
MIT © Tecnolight SRL
