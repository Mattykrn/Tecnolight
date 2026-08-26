#!/bin/bash
echo "Iniciando Tecnolight Frontend..."
cd "$(dirname "$0")"

# Frontend (producción)
cd frontend
PORT=3000 NODE_ENV=production nohup npx next start > /tmp/tecnolight-frontend.log 2>&1 &
FPID=$!
echo "Frontend PID: $FPID"

echo ""
echo "Esperando servicio..."
sleep 3
echo "Frontend: http://localhost:3000"

# Mostrar logs si hay error
sleep 2
if ! kill -0 $FPID 2>/dev/null; then
  echo "ERROR: El frontend no inició. Revisá: tail -30 /tmp/tecnolight-frontend.log"
fi