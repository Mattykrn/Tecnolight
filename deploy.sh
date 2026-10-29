#!/usr/bin/env bash
set -e

echo "=== 1. Agregando archivos a Git ==="
git add .

echo "=== 2. Creando commit con la versión actualizada ==="
git commit -m "Feat: reemplazo estricto de traza por ruta, consolidacion Mimaki UCJV300-160 y unificacion de videos de laminados" || echo "Nada nuevo para commitear"

echo "=== 3. Pusheando a GitHub (main) ==="
git push origin main

echo "=== 4. Despliegue en Vercel ==="
if command -v vercel &> /dev/null; then
    echo "Disparando deploy en producción con Vercel CLI..."
    vercel --prod --yes
else
    echo "Vercel CLI no encontrado localmente; Vercel CI/CD desplegará automáticamente desde el push a main."
fi

echo "=== ¡Listo! Proyecto sincronizado en GitHub y en proceso de deploy en Vercel ==="

