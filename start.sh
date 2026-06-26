#!/bin/bash

echo "🚀 Iniciando Tecnolight..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Liberar puerto 5000 si está ocupado
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Puerto 5000 ocupado, liberando...${NC}"
    pkill -f "node src/server.js" 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Puerto 5000 liberado${NC}"
fi

# Verificar si PostgreSQL está corriendo
if ! pg_isready -q; then
    echo -e "${YELLOW}⚠️  PostgreSQL no está corriendo${NC}"
    echo "Iniciando PostgreSQL..."
    sudo systemctl start postgresql
    sleep 2
fi

# Verificar que PostgreSQL inició correctamente
if pg_isready -q; then
    echo -e "${GREEN}✅ PostgreSQL activo${NC}"
    
    # Ejecutar seed de base de datos
    echo ""
    echo "📊 Cargando datos iniciales..."
    cd backend && node database/seeds/seed.js
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Datos cargados exitosamente${NC}"
    else
        echo -e "${RED}❌ Error al cargar datos${NC}"
        echo "Verificá que la base de datos exista"
    fi
else
    echo -e "${RED}❌ No se pudo iniciar PostgreSQL${NC}"
    echo "Ejecutá manualmente: sudo service postgresql start"
    exit 1
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✨ Servicios listos:${NC}"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  Admin:    http://localhost:3000/admin/login"
echo "=========================================="
echo ""
echo "Para iniciar el servidor backend:"
echo "  cd backend && npm start"
echo ""
echo "Para iniciar el frontend (en otra terminal):"
echo "  cd frontend && npm run dev"