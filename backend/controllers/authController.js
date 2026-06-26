/**
 * ============================================
 * CONTROLADOR DE AUTENTICACIÓN
 * ============================================
 * 
 * Gestiona la autenticación de administradores para el panel de administración.
 * Implementa JWT (JSON Web Tokens) para mantener sesiones seguras sin cookies.
 * 
 * Funcionalidades:
 * - Login con email y contraseña (bcrypt para hashing)
 * - Generación de token JWT con expiración
 * - Obtención de perfil del usuario autenticado
 * - Cambio de contraseña con validación de contraseña actual
 * 
 * Seguridad:
 * - Contraseñas hasheadas con bcrypt (nunca en texto plano)
 * - Tokens JWT con expiración configurable
 * - Middleware de autenticación en rutas protegidas
 * 
 * @module AuthController
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('otplib');
const QRCode = require('qrcode');
const { PrismaClient } = require('@prisma/client');
const { generateToken, hashPassword, comparePassword } = require('../middleware/auth');
const { logLoginAttempt } = require('../middleware/activityLogger');

const prisma = new PrismaClient();

/**
 * POST /api/auth/login
 * Inicio de sesión con soporte 2FA.
 * Si el usuario tiene 2FA habilitado, retorna un tempToken.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    if (!email || !password) {
      await logLoginAttempt(email || 'unknown', false, ip, userAgent);
      return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      await logLoginAttempt(email, false, ip, userAgent);
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      await logLoginAttempt(email, false, ip, userAgent);
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    await logLoginAttempt(email, true, ip, userAgent);

    // Si el usuario tiene 2FA, pedir código de verificación
    if (user.twoFactorSecret) {
      const tempToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role, twoFactorPending: true },
        process.env.JWT_2FA_SECRET || process.env.JWT_SECRET,
        { expiresIn: '5m' }
      );
      return res.json({
        requiresTwoFactor: true,
        tempToken,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};

/**
 * POST /api/auth/verify-2fa
 * Verifica el código TOTP después del login inicial.
 */
const verifyTwoFactor = async (req, res) => {
  try {
    const { tempToken, code } = req.body;

    if (!tempToken || !code) {
      return res.status(400).json({ error: 'Token temporal y código 2FA requeridos.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.JWT_2FA_SECRET || process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ error: 'Token temporal inválido o expirado. Iniciá sesión nuevamente.' });
    }

    if (!decoded.twoFactorPending) {
      return res.status(401).json({ error: 'Token inválido.' });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.twoFactorSecret) {
      return res.status(401).json({ error: '2FA no está configurado para este usuario.' });
    }

    const isValid = authenticator.verify({ token: code, secret: user.twoFactorSecret });
    if (!isValid) {
      return res.status(401).json({ error: 'Código 2FA inválido.' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    console.error('Error en verify-2fa:', error);
    res.status(500).json({ error: 'Error al verificar 2FA.' });
  }
};

/**
 * GET /api/auth/2fa-status
 * Verifica si el usuario tiene 2FA habilitado.
 */
const getTwoFactorStatus = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json({ enabled: !!user?.twoFactorSecret });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estado de 2FA.' });
  }
};

/**
 * POST /api/auth/setup-2fa
 * Genera un secreto TOTP y devuelve URI + QR para configurar.
 */
const setupTwoFactor = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (user.twoFactorSecret) {
      return res.status(400).json({ error: '2FA ya está configurado. Deshabilitalo primero para regenerar.' });
    }

    const secret = authenticator.generateSecret();
    const serviceName = 'Tecnolight Admin';
    const otpauth = authenticator.keyuri(user.email, serviceName, secret);
    const qrCode = await QRCode.toDataURL(otpauth);

    res.json({ secret, qrCode, otpauth });
  } catch (error) {
    console.error('Error al configurar 2FA:', error);
    res.status(500).json({ error: 'Error al configurar 2FA.' });
  }
};

/**
 * POST /api/auth/enable-2fa
 * Activa 2FA verificando el código con el secreto generado.
 */
const enableTwoFactor = async (req, res) => {
  try {
    const { secret, code } = req.body;

    if (!secret || !code) {
      return res.status(400).json({ error: 'Secreto y código 2FA requeridos.' });
    }

    const isValid = authenticator.verify({ token: code, secret });
    if (!isValid) {
      return res.status(400).json({ error: 'Código inválido. Verificá que el código de la app coincida.' });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { twoFactorSecret: secret }
    });

    res.json({ message: '2FA activado exitosamente.' });
  } catch (error) {
    console.error('Error al activar 2FA:', error);
    res.status(500).json({ error: 'Error al activar 2FA.' });
  }
};

/**
 * POST /api/auth/disable-2fa
 * Desactiva 2FA verificando la contraseña actual.
 */
const disableTwoFactor = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Contraseña requerida para deshabilitar 2FA.' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { twoFactorSecret: null }
    });

    res.json({ message: '2FA desactivado exitosamente.' });
  } catch (error) {
    console.error('Error al desactivar 2FA:', error);
    res.status(500).json({ error: 'Error al desactivar 2FA.' });
  }
};

/**
 * Obtener perfil del usuario autenticado
 * 
 * Obtiene los datos del usuario a partir del token JWT.
 * El token es extraído automáticamente por el middleware authenticate.
 * 
 * @route GET /api/auth/profile
 * @access Private (requiere token JWT válido)
 * 
 * @returns {Object} Datos del usuario (id, email, name, role, createdAt)
 */
const getProfile = async (req, res) => {
  try {
    // req.user.id es inyectado por el middleware authenticate
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
        // No retornamos password por seguridad
      }
    });

    // Validar que el usuario aún exista
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil.' });
  }
};

/**
 * Cambiar contraseña del usuario autenticado
 * 
 * Flujo:
 * 1. Validar que se envíen contraseña actual y nueva
 * 2. Verificar que la contraseña actual sea correcta
 * 3. Hashear la nueva contraseña con bcrypt
 * 4. Actualizar en base de datos
 * 
 * @route POST /api/auth/change-password
 * @access Private (requiere token JWT válido)
 * 
 * @param {string} req.body.currentPassword - Contraseña actual del usuario
 * @param {string} req.body.newPassword - Nueva contraseña (mínimo 6 caracteres recomendado)
 */
const changePassword = async (req, res) => {
  try {
    // Extraer contraseñas del body
    const { currentPassword, newPassword } = req.body;

    // Validar que ambos campos estén presentes
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas.' });
    }

    // Obtener usuario actual (sin password, solo para verificar existencia)
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    // Verificar que la contraseña actual sea correcta
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta.' });
    }

    // Hashear la nueva contraseña con bcrypt (factor de costo 10)
    const hashedNewPassword = await hashPassword(newPassword);

    // Actualizar contraseña en base de datos
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword }
    });

    res.json({ message: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ error: 'Error al cambiar contraseña.' });
  }
};

// ============================================
// EXPORTACIÓN DE MÉTODOS
// ============================================
module.exports = {
  login,
  getProfile,
  changePassword,
  verifyTwoFactor,
  getTwoFactorStatus,
  setupTwoFactor,
  enableTwoFactor,
  disableTwoFactor
};
