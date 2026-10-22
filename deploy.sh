#!/usr/bin/env bash
set -e

echo "=== 1. Agregando archivos a Git ==="
git add .

echo "=== 2. Creando commit ==="
git commit -m "Chore: optimizar configuracion de build en Vercel y dependencias limpias" || echo "Nada nuevo para commitear"

echo "=== 3. Pusheando a GitHub (main) ==="
git push origin main

echo "=== 4. Restaurando URL limpia por seguridad ==="
git remote set-url origin https://github.com/Mattykrn/Tecnolight.git

echo "=== ¡Listo! Todo subido a GitHub con éxito ==="
