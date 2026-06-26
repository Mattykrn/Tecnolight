#!/bin/bash

echo "🔧 Instalador de Tecnolight - Arch Linux / Omarchy"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================
# PASO 1: Verificar e instalar PostgreSQL
# ============================================

echo -e "${YELLOW}📦 Paso 1: Verificando PostgreSQL...${NC}"

if ! command -v psql &> /dev/null; then
    echo "PostgreSQL no encontrado, instalando..."
    sudo pacman -S --noconfirm postgresql postgresql-libs
    
    # Inicializar base de datos
    echo "Inicializando base de datos..."
    sudo -iu postgres initdb -D /var/lib/postgres/data
    
    # Iniciar y habilitar servicio
    echo "Iniciando servicio..."
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    echo -e "${GREEN}✅ PostgreSQL instalado y configurado${NC}"
else
    echo -e "${GREEN}✅ PostgreSQL ya está instalado${NC}"
    
    # Iniciar servicio si no está corriendo
    if ! pg_isready -q; then
        echo "Iniciando servicio PostgreSQL..."
        sudo systemctl start postgresql
    fi
fi

sleep 2

# ============================================
# PASO 2: Crear base de datos (si no existe)
# ============================================

echo ""
echo -e "${YELLOW}📊 Paso 2: Configurando base de datos...${NC}"

DB_NAME="tecnolight_db"

if sudo -iu postgres psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo -e "${GREEN}✅ Base de datos '$DB_NAME' ya existe${NC}"
else
    echo "Creando base de datos..."
    sudo -iu postgres psql -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || sudo -iu postgres createdb $DB_NAME
    echo -e "${GREEN}✅ Base de datos creada${NC}"
fi

# ============================================
# PASO 3: Instalar dependencias del backend
# ============================================

echo ""
echo -e "${YELLOW}📦 Paso 3: Instalando dependencias del backend...${NC}"

if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✅ Dependencias del backend ya instaladas${NC}"
else
    cd backend
    npm install
    cd ..
    echo -e "${GREEN}✅ Dependencias del backend instaladas${NC}"
fi

# ============================================
# PASO 4: Ejecutar migraciones de Prisma
# ============================================

echo ""
echo -e "${YELLEW}🗄️  Paso 4: Ejecutando migraciones...${NC}"

cd backend
npx prisma migrate deploy
cd ..

echo -e "${GREEN}✅ Migraciones ejecutadas${NC}"

# ============================================
# PASO 5: Cargar datos iniciales (seed)
# ============================================

echo ""
echo -e "${YELLOW}🌱 Paso 5: Cargando datos iniciales...${NC}"

cd backend
node database/seeds/seed.js
cd ..

echo -e "${GREEN}✅ Datos iniciales cargados${NC}"

# ============================================
# PASO 6: Instalar dependencias del frontend
# ============================================

echo ""
echo -e "${YELLOW}📦 Paso 6: Instalando dependencias del frontend...${NC}"

if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✅ Dependencias del frontend ya instaladas${NC}"
else
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✅ Dependencias del frontend instaladas${NC}"
fi

# ============================================
# PASO 7: Verificar instalación
# ============================================

echo ""
echo -e "${YELLOW}🔍 Paso 7: Verificando instalación...${NC}"

if pg_isready -q; then
    echo -e "${GREEN}✅ PostgreSQL: ${NC}Corriendo"
else
    echo -e "${RED}❌ PostgreSQL: No responde${NC}"
fi

# ============================================
# Finalización
# ============================================

echo ""
echo "=========================================="
echo -e "${GREEN}✨ Instalación completada!${NC}"
echo "=========================================="
echo ""
echo "Para iniciar el proyecto:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Luego accedé a:"
echo "  • Home: http://localhost:3000"
echo "  • Nosotros: http://localhost:3000/about"
echo "  • Admin: http://localhost:3000/admin/login"
echo ""
echo "Credenciales:"
echo "  Email: admin@tecnolight.com.ar"
echo "  Password: admin123"
echo ""
echo -e "${GREEN}¡Listo para usar!${NC}"