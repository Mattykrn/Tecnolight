/**
 * ============================================
 * RUTAS DE AUTENTICACIÓN
 * ============================================
 * 
 * Define los endpoints HTTP para autenticación de administradores.
 * Implementa el flujo de login basado en JWT (sin cookies).
 * 
 * Características:
 * - Login con validación de email y contraseña
 * - Protección de rutas con middleware JWT
 * - Cambio de contraseña con validación de longitud
 * 
 * @module AuthRoutes
 */

const express = require('express');
const { body, validationResult } = require('express-validator'); // Middleware de validación
const {
  login,
  getProfile,
  changePassword,
  verifyTwoFactor,
  getTwoFactorStatus,
  setupTwoFactor,
  enableTwoFactor,
  disableTwoFactor
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth'); // Middleware de autenticación JWT

const router = express.Router();

// ============================================
// RUTA PÚBLICA
// ============================================

/**
 * POST /api/auth/login
 * Autentica un administrador y retorna un token JWT
 * 
 * Validaciones:
 * - email: Debe ser formato email válido
 * - password: No puede estar vacío
 * 
 * Respuesta exitosa:
 * - token: JWT para usar en rutas protegidas
 * - user: Datos públicos del usuario (sin password)
 * 
 * Flujo:
 * 1. Validar formato de email y presencia de password
 * 2. Buscar usuario en base de datos
 * 3. Comparar password con hash bcrypt
 * 4. Generar JWT con datos del usuario
 * 5. Retornar token y datos de usuario
 * 
 * Usado por: Página de login /admin/login
 */
router.post('/login', [
  // Validación: email con formato válido
  body('email').isEmail().withMessage('Email inválido'),
  // Validación: contraseña no vacía
  body('password').notEmpty().withMessage('Contraseña requerida')
], login);

// ============================================
// RUTAS PROTEGIDAS (requieren token JWT)
// ============================================

/**
 * GET /api/auth/profile
 * Obtiene los datos del perfil del usuario autenticado
 * 
 * Middleware:
 * - authenticate: Extrae y valida el token JWT del header Authorization
 * 
 * Retorna: { id, email, name, role, createdAt }
 * 
 * Usado por: Dashboard para mostrar datos del admin logueado
 */
router.get('/profile', authenticate, getProfile);

/**
 * POST /api/auth/change-password
 * Cambia la contraseña del usuario autenticado
 * 
 * Validaciones:
 * - currentPassword: No vacía (debe coincidir con la actual)
 * - newPassword: Mínimo 6 caracteres
 * 
 * Middleware:
 * - authenticate: Verifica token JWT
 * 
 * Body: { currentPassword, newPassword }
 * 
 * Flujo:
 * 1. Verifica que la contraseña actual sea correcta
 * 2. Hashea la nueva contraseña con bcrypt
 * 3. Actualiza en base de datos
 * 
 * Usado por: Dashboard (funcionalidad de seguridad)
 */
router.put('/change-password', authenticate, [
  // Validación: contraseña actual requerida
  body('currentPassword').notEmpty().withMessage('Contraseña actual requerida'),
  // Validación: nueva contraseña mínimo 6 caracteres
  body('newPassword').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
], changePassword);

/**
 * POST /api/auth/verify-2fa
 * Verifica el código TOTP para completar el login con 2FA
 */
router.post('/verify-2fa', [
  body('tempToken').notEmpty().withMessage('Token temporal requerido'),
  body('code').notEmpty().isLength({ min: 6, max: 6 }).withMessage('Código 2FA de 6 dígitos requerido')
], verifyTwoFactor);

/**
 * GET /api/auth/2fa-status
 * Verifica si 2FA está habilitado para el usuario autenticado
 */
router.get('/2fa-status', authenticate, getTwoFactorStatus);

/**
 * GET /api/auth/setup-2fa
 * Genera secreto TOTP y QR code (solo si no está habilitado)
 */
router.get('/setup-2fa', authenticate, setupTwoFactor);

/**
 * POST /api/auth/enable-2fa
 * Activa 2FA verificando el código con el secreto generado
 */
router.post('/enable-2fa', authenticate, [
  body('secret').notEmpty().withMessage('Secreto requerido'),
  body('code').notEmpty().isLength({ min: 6, max: 6 }).withMessage('Código 2FA inválido')
], enableTwoFactor);

/**
 * POST /api/auth/disable-2fa
 * Desactiva 2FA verificando la contraseña actual
 */
router.post('/disable-2fa', authenticate, [
  body('password').notEmpty().withMessage('Contraseña requerida')
], disableTwoFactor);

module.exports = router;
