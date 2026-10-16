#!/usr/bin/env bash
set -e

echo "=== 1. Vinculando repositorio Git ==="
if [ ! -d ".git" ]; then
  if [ -d "/home/matii/proyectos-ia/Tecnolight-main (2)/.git" ]; then
    echo "Copiando .git desde proyectos-ia..."
    cp -r "/home/matii/proyectos-ia/Tecnolight-main (2)/.git" .
  else
    echo "Inicializando nuevo repositorio Git..."
    git init
    git remote add origin git@github.com:Mattykrn/Tecnolight.git
    git branch -M main
  fi
fi

echo "=== 2. Limpiando .git accidental en home (si existe) ==="
if [ -d "$HOME/.git" ]; then
  rm -rf "$HOME/.git"
  echo "Eliminado $HOME/.git accidental."
fi

echo "=== 3. Estado de Git ==="
git status

echo "=== 4. Agregando cambios y commiteando ==="
git add .
git commit -m "Fix: actualizar terminologia de tintas TrafficJet a UV-LED" || echo "Nada nuevo para commitear o commit ya realizado"

echo "=== 5. Pusheando a origin main ==="
git push origin main

echo "=== ¡Listo! Vercel desplegará automáticamente ==="
