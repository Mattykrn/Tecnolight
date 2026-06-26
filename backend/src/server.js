/**
 * ============================================
 * TECNOLIGHT - API REST Backend
 * ============================================
 * 
 * Servidor principal de la API REST para el sitio web institucional de Tecnolight.
 * 
 * Arquitectura:
 * - Express.js como framework web
 * - Prisma ORM para acceso a base de datos PostgreSQL
 * - JWT para autenticación de panel administrativo
 * - Nodemailer para envío de emails automáticos
 * 
 * Flujo general:
 * 1. El servidor escucha peticiones HTTP en el puerto configurado (default: 5000)
 * 2. Las rutas /api/* son manejadas por controladores específicos
 * 3. El middleware de seguridad (Helmet, CORS, Rate Limit) protege la API
 * 4. Prisma se conecta a PostgreSQL para operaciones CRUD
 * 5. El formulario de contacto dispara emails automáticos al cliente y al equipo
 * 
 * @module Server
 */

require('dotenv').config();

// ============================================
// IMPORTACIONES
// ============================================
const express = require('express');           // Framework web para Node.js
const cors = require('cors');                 // Middleware para Cross-Origin Resource Sharing
const helmet = require('helmet');             // Middleware de seguridad HTTP
const rateLimit = require('express-rate-limit'); // Limitador de peticiones para prevenir abuso
const { PrismaClient } = require('@prisma/client'); // Cliente ORM para PostgreSQL
const security = require('./security');       // Módulo de seguridad centralizado
const { logLoginAttempt } = require('../middleware/activityLogger'); // Sistema de logs
const { startBackupSystem } = require('./backup'); // Sistema de backups automáticos

// ============================================
// RUTAS (Controladores)
// ============================================
/**
 * Rutas de autenticación:
 * - POST /api/auth/login - Inicio de sesión de administrador
 * - GET /api/auth/profile - Obtener perfil del usuario autenticado
 * - POST /api/auth/change-password - Cambiar contraseña
 */
const authRoutes = require('../routes/auth');

/**
 * Rutas de productos (catálogo):
 * - GET /api/products - Listar todos los productos (público)
 * - GET /api/products/:slug - Obtener producto por slug (público)
 * - GET /api/products/categories - Obtener categorías disponibles (público)
 * - POST /api/products - Crear producto (requiere auth admin)
 * - PUT /api/products/:id - Actualizar producto (requiere auth admin)
 * - DELETE /api/products/:id - Eliminar producto (requiere auth admin)
 */
const productRoutes = require('../routes/products');

/**
 * Rutas de proyectos (portfolio):
 * - GET /api/projects - Listar todos los proyectos (público)
 * - GET /api/projects/:slug - Obtener proyecto por slug (público)
 * - POST /api/projects - Crear proyecto (requiere auth admin)
 * - PUT /api/projects/:id - Actualizar proyecto (requiere auth admin)
 * - DELETE /api/projects/:id - Eliminar proyecto (requiere auth admin)
 */
const projectRoutes = require('../routes/projects');

/**
 * Rutas de contacto:
 * - POST /api/contact - Enviar formulario de contacto (público)
 * - GET /api/contact - Listar contactos (requiere auth admin)
 * - PUT /api/contact/:id/read - Marcar contacto como leído (requiere auth admin)
 * - DELETE /api/contact/:id - Eliminar contacto (requiere auth admin)
 */
const contactRoutes = require('../routes/contact');
const instagramRoutes = require('../routes/instagram');
const uploadRoutes = require('../routes/upload');

// ============================================
// INICIALIZACIÓN DE LA APP
// ============================================
const app = express();
const prisma = new PrismaClient(); // Cliente para operaciones con base de datos
const PORT = process.env.PORT || 5000; // Puerto del servidor (default: 5000)

// Exponer Prisma globalmente para el sistema de logs
global.prisma = prisma;

// ============================================
// MIDDLEWARES DE SEGURIDAD
// ============================================

/**
 * Helmet: Establece cabeceras HTTP de seguridad
 * Protege contra XSS, sniffing, clickjacking, etc.
 */
app.use(helmet(security.helmetConfig));

/**
 * CORS: Configuración restrictiva de Cross-Origin Resource Sharing
 */
app.use(cors(security.corsConfig));

/**
 * Rate Limiter General: Limita peticiones para prevenir abuso
 */
app.use('/api/', security.apiLimiter);

/**
 * Detección de inyecciones SQL y XSS en tiempo real
 */
app.use(security.injectionDetection);

/**
 * Parser de requests con límites de tamaño
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.urlencoded({ extended: true }));

// ============================================
// REGISTRO DE RUTAS
// ============================================
app.use('/api/auth', authRoutes);          // Autenticación y gestión de usuarios
app.use('/api/products', productRoutes);   // CRUD de productos del catálogo
app.use('/api/projects', projectRoutes);   // CRUD de proyectos del portfolio
app.use('/api/contact', contactRoutes);    // Formulario de contacto y gestión de consultas
app.use('/api/instagram', instagramRoutes); // Galería de Instagram
app.use('/api/upload', uploadRoutes);      // Subida de imágenes

// Servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static('uploads'));

// ============================================
// RUTAS ESPECIALES
// ============================================

/**
 * Health Check: Endpoint para verificar el estado del servidor
 * Usado por herramientas de monitoreo y load balancers
 * Retorna 200 OK si el servidor está funcionando
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Tecnolight API funcionando correctamente' });
});

// ============================================
// MANEJO DE ERRORES
// ============================================

/**
 * Error Handler Global: Captura todos los errores no manejados
 * - Muestra el stack trace solo en desarrollo
 * - Retorna respuesta JSON genérica en producción
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/**
 * 404 Handler: Captura todas las rutas no definidas
 * Retorna error 404 con mensaje JSON
 */
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ============================================
// INICIO DEL SERVIDOR
// ============================================
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  
  // Iniciar sistema de backups automáticos
  startBackupSystem();
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

/**
 * Manejo de señales del sistema para cierre ordenado
 * - Cierra la conexión a la base de datos (Prisma)
 * - Cierra el servidor HTTP
 * - Permite que las peticiones en curso finalicen
 */
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});
