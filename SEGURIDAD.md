# Documentación de Seguridad - Tecnolight

## 📋 Resumen de Medidas Implementadas

Este documento detalla todas las medidas de seguridad implementadas en el sistema Tecnolight para garantizar la protección de la información y la infraestructura.

---

## 🔒 1. Autenticación y Autorización

### Contraseñas Seguras
- **Hashing**: bcrypt con factor de costo 10
- **Nunca en texto plano**: Las contraseñas se almacenan como hashes
- **Validación**: Mínimo 6 caracteres, máximo 128

### Tokens JWT
- **Algoritmo**: HS256
- **Expiración**: 7 días (configurable en `.env`)
- **Payload**: Solo datos no sensibles (id, email, name, role)
- **Transmisión**: Solo en headers Authorization (no en body)

### Rate Limiting en Login
- **Límite**: 5 intentos por hora por IP
- **Protección**: Contra ataques de fuerza bruta
- **Exclusiones**: No cuenta intentos exitosos

### Registro de Actividad
Todos los intentos de login se registran con:
- ✅ Email usado
- ✅ IP de origen
- ✅ User Agent del navegador
- ✅ Fecha y hora
- ✅ Resultado (éxito/fallo)
- ✅ Usuario autenticado (si aplica)

**Alerta automática**: Si hay 5+ intentos fallidos en 1 hora, se registra warning en logs.

---

## 🛡️ 2. Protección contra Ataques Comunes

### SQL Injection
**Medidas implementadas**:
1. **Prisma ORM**: Queries parametrizadas automáticamente
2. **Validación estricta**: Tipos y formatos con express-validator
3. **Detección de patrones**: Regex que bloquea comandos SQL sospechosos
4. **Logs de intentos**: Registro de ataques bloqueados

**Patrones detectados**:
- SELECT, INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, EXEC
- Comentarios SQL: `--`, `/* */`
- UNION SELECT
- Condiciones siempre verdaderas: `OR 1=1`

### XSS (Cross-Site Scripting)
**Medidas implementadas**:
1. **Helmet CSP**: Content Security Policy restrictiva
2. **Sanitización de inputs**: Escape de caracteres HTML
3. **Validación de tipos**: Solo strings en campos de texto
4. **Detección de patrones**: Bloqueo de `<script>`, `javascript:`, eventos onclick, iframes

**Sanitización aplicada**:
```javascript
& → &
< → <
> → >
" → "
' → &#x27;
/ → &#x2F;
```

### Fuerza Bruta (Rate Limiting)
**Tres niveles de protección**:

1. **API General**:
   - 100 peticiones cada 15 minutos por IP
   - Previene DDoS y scraping

2. **Login (authLimiter)**:
   - 5 intentos por hora por IP
   - Bloqueo temporal tras fallos repetidos

3. **Contacto (contactLimiter)**:
   - 3 formularios por hora por IP
   - Previene spam

### CSRF (Cross-Site Request Forgery)
- **CORS restrictivo**: Solo orígenes permitidos
- **Credentials**: Solo cookies/tokens entre dominios autorizados
- **Validación de origen**: Comparación estricta de URLs

---

## 🔐 3. Headers de Seguridad HTTP (Helmet)

### Configuración Implementada

```javascript
{
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],           // Solo recursos del mismo origen
      scriptSrc: ["'self'"],            // Scripts solo del propio dominio
      styleSrc: ["'self'"],             // CSS solo del propio dominio
      imgSrc: ["'self'", "data:"],      // Imágenes locales y data URLs
      connectSrc: ["'self'"],           // Conexiones solo al propio backend
      objectSrc: ["'none'"],            // Bloquea plugins Java/Flash
      frameSrc: ["'none'"]              // Bloquea iframes (clickjacking)
    }
  },
  
  strictTransportSecurity: {
    maxAge: 31536000,                   // 1 año en segundos
    includeSubDomains: true,            // Incluye subdominios
    preload: true                       // Elegible para HSTS preload
  },
  
  noSniff: true,                        // Previene MIME sniffing
  frameguard: { action: 'deny' },       // Bloquea iframes (clickjacking)
  xssFilter: true,                      // Activa filtro XSS del navegador
  hidePoweredBy: true,                  // Oculta X-Powered-By header
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}
```

---

## 🌐 4. CORS (Cross-Origin Resource Sharing)

### Configuración Segura

```javascript
{
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}
```

**Características**:
- ✅ Origen configurable por variable de entorno
- ✅ Permite envío de cookies y tokens
- ✅ Solo métodos HTTP necesarios
- ✅ Headers específicos autorizados

---

## ✅ 5. Validación de Entrada

### Validaciones Implementadas

**Login**:
- Email: formato válido, normalizado, máximo 255 caracteres
- Contraseña: 6-128 caracteres, no vacío

**Productos**:
- Nombre: 2-200 caracteres
- Slug: Solo letras minúsculas, números y guiones
- Descripción: 10-5000 caracteres
- Categoría: Valores predefinidos (enum)

**Proyectos**:
- Título: 2-200 caracteres
- Slug: Solo letras minúsculas, números y guiones
- Descripción: 10-5000 caracteres

**Contacto**:
- Nombre: Solo letras y espacios (regex hispano)
- Email: formato válido
- Teléfono: Formato argentino (opcional)
- Mensaje: 10-2000 caracteres

---

## 📊 6. Logs de Actividad

### Sistema de Registro

**Datos almacenados**:
- ✅ Acción realizada (login, create_product, etc.)
- ✅ Usuario que realizó la acción
- ✅ IP de origen
- ✅ User Agent del navegador
- ✅ Fecha y hora exacta
- ✅ Detalles adicionales (contexto)

**Almacenamiento**:
- **Base de datos**: Tabla `ActivityLog` con índices
- **Archivos**: Logs en formato JSONL por día
- **Retención**: 90 días en base de datos

**Detección de anomalías**:
- Alertas por 5+ intentos fallidos de login en 1 hora
- Registro de todas las operaciones CRUD

### Tabla ActivityLog

```prisma
model ActivityLog {
  id        String   @id @default(cuid())
  action    String   // "login_success", "create_product", etc.
  userId    String?  // ID del usuario (null si anónimo)
  ip        String   // Dirección IP
  userAgent String?  // Navegador/dispositivo
  details   String?  // JSON con detalles adicionales
  createdAt DateTime @default(now())  // Fecha automática

  user User? @relation(fields: [userId], references: [id])
}
```

---

## 💾 7. Sistema de Backup Automático

### Características

**Automático**:
- ⏰ Ejecución diaria a las 3:00 AM
- 📦 Compresión gzip
- 📅 Retención de 30 días

**Manual**:
- Backup bajo demanda desde panel admin
- Registro en base de datos

**Integridad**:
- Validación de archivo .sql.gz
- Registro de tamaño
- Timestamp en nombre de archivo

**Estructura**:
```
backups/
├── backup-2025-06-26T03-00-00.sql.gz
├── backup-2025-06-25T03-00-00.sql.gz
└── ...
```

**Comando de backup**:
```bash
pg_dump -U usuario -h host -p puerto dbname | gzip > backup-filename.sql.gz
```

### Tabla Backup

```prisma
model Backup {
  id        String   @id @default(cuid())
  filename  String   // Nombre del archivo
  size      Int      // Tamaño en bytes
  type      String   @default("automatic") // automatic | manual
  createdAt DateTime @default(now())
}
```

---

## 🔑 8. Gestión de Credenciales

### Variable de Entorno (Backend)

**Archivo**: `backend/.env` (NO subir a Git)

```env
# Base de datos
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tecnolight_db"

# JWT (CAMBIAR EN PRODUCCIÓN)
JWT_SECRET=tecnolight_super_secreto_2024_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# Servidor
PORT=5000
NODE_ENV=development

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_FROM=Tecnolight <noreply@tecnolight.com.ar>

# Admin (CAMBIAR ESTAS CREDENCIALES)
ADMIN_EMAIL=admin@tecnolight.com.ar
ADMIN_PASSWORD=admin123
ADMIN_NAME=Administrador
```

### Políticas de Contraseña

**Recomendaciones**:
- Mínimo 12 caracteres en producción
- Mezcla de mayúsculas, minúsculas, números y símbolos
- Cambio cada 90 días
- No reutilizar contraseñas anteriores

**Implementación actual**:
- Mínimo 6 caracteres (aumentar a 12 en producción)
- Hash bcrypt irreversible
- Almacenamiento en base de datos (no en archivos)

---

## 🔄 9. Actualización de Dependencias

### Estrategia de Actualización

**Dependencias críticas** (actualizar mensualmente):
- `express`: Framework web
- `helmet`: Seguridad HTTP
- `bcrypt`: Hashing de contraseñas
- `jsonwebtoken`: Autenticación
- `@prisma/client`: ORM
- `express-rate-limit`: Anti-DDoS

**Proceso de actualización**:
```bash
# 1. Verificar vulnerabilidades conocidas
cd backend
npm audit

# 2. Actualizar paquetes
npm update

# 3. Verificar que todo funcione
npm start

# 4. Si hay breaking changes
npm audit fix --force
```

### Monitoreo

- npm audit para CVE conocidos
- GitHub Dependabot (configurar en repo)
- Snyk o similar para análisis profundo

---

## 👥 10. Permisos y Roles

### Sistema de Roles Actual

**Roles definidos**:
1. **admin**: Acceso total al panel de administración

**Futuro (recomendado)**:
```javascript
{
  admin: {
    permissions: ['create', 'read', 'update', 'delete', 'manage_users']
  },
  editor: {
    permissions: ['create', 'read', 'update']
  },
  viewer: {
    permissions: ['read']
  }
}
```

### Políticas de Acceso

**Rutas públicas** (no requieren autenticación):
- `GET /api/products` - Listar productos
- `GET /api/products/:slug` - Detalle producto
- `GET /api/projects` - Listar proyectos
- `POST /api/contact` - Enviar formulario

**Rutas protegidas** (requieren JWT):
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto
- `GET /api/contact` - Ver mensajes
- `PUT /api/contact/:id/read` - Marcar como leído

---

## 🚨 11. Respuestas a Incidentes

### En Caso de Intrusión

**Pasos inmediatos**:
1. **Revocar tokens**: Cambiar `JWT_SECRET` en `.env`
2. **Cambiar contraseñas**: Actualizar credenciales de admin
3. **Revisar logs**: Analizar tabla `ActivityLog`
4. **Backup**: Restaurar versión anterior si es necesario
5. **Notificar**: Informar a usuarios afectados (si aplica)

**Monitoreo**:
```sql
-- Ver intentos de login fallidos recientes
SELECT * FROM ActivityLog 
WHERE action = 'login_failed' 
AND createdAt > NOW() - INTERVAL '1 day';

-- Ver accesos desde IPs sospechosas
SELECT ip, COUNT(*) as attempts
FROM ActivityLog
WHERE createdAt > NOW() - INTERVAL '1 hour'
GROUP BY ip
HAVING COUNT(*) > 10;
```

---

## 📋 12. Checklist de Producción

### Antes de Deployar

- [ ] Cambiar `JWT_SECRET` por uno fuerte y aleatorio
- [ ] Cambiar `ADMIN_PASSWORD` por una segura
- [ ] Configurar HTTPS (certificado SSL/TLS)
- [ ] Habilitar `NODE_ENV=production`
- [ ] Configurar CORS solo para dominio real
- [ ] Revisar firewall (puertos 80, 443, 5000 solo si necesario)
- [ ] Configurar backups automáticos en servidor real
- [ ] Habilitar logs de PostgreSQL
- [ ] Configurar monitor de servicio (systemd)
- [ ] Revisar políticas de retención de logs

### HTTPS/SSL

**Para producción**:
1. Obtener certificado (Let's Encrypt gratuito)
2. Configurar Nginx como reverse proxy
3. Redirigir HTTP → HTTPS
4. Habilitar HSTS

**Configuración Nginx ejemplo**:
```nginx
server {
    listen 80;
    server_name tecnolight.com.ar;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name tecnolight.com.ar;

    ssl_certificate /etc/letsencrypt/live/tecnolight.com.ar/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tecnolight.com.ar/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📞 13. Contacto y Soporte

**Reportar vulnerabilidades**:
- Email: seguridad@tecnolight.com.ar
- Teléfono: +54 (342) 456-7890

**Responsable de seguridad**: Administrador del sistema

---

## 📚 14. Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Prisma Security](https://www.prisma.io/docs/orm/security)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

---

**Última actualización**: Junio 2025  
**Versión**: 1.0.0  
**Próxima auditoría**: Septiembre 2025