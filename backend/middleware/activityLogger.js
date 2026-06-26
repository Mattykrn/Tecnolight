/**
 * ============================================
 * MIDDLEWARE DE LOGS DE ACTIVIDAD
 * ============================================
 * 
 * Registra todas las acciones realizadas en el panel de administración.
 * Guarda: quién, qué hizo, cuándo y desde qué IP.
 * 
 * Características:
 * - Registro automático de accesos al panel
 * - Log de cambios en productos/proyectos
 * - Registro de intentos de login (exitosos y fallidos)
 * - Almacenamiento en base de datos y archivo
 * - Retención de 90 días
 */

const fs = require('fs').promises;
const path = require('path');

// Directorio para logs de archivo
const LOGS_DIR = path.join(__dirname, '../../logs');

// Asegurar que el directorio de logs existe
async function ensureLogsDir() {
  try {
    await fs.access(LOGS_DIR);
  } catch {
    await fs.mkdir(LOGS_DIR, { recursive: true });
  }
}

/**
 * Escribe log en archivo y base de datos (opcional)
 * @param {string} action - Acción realizada (login, create_product, etc.)
 * @param {string} userId - ID del usuario (si está autenticado)
 * @param {string} email - Email del usuario
 * @param {string} ip - Dirección IP del cliente
 * @param {Object} details - Detalles adicionales (opcional)
 */
async function logActivity(action, userId = null, email = 'anonymous', ip = 'unknown', details = {}) {
  try {
    await ensureLogsDir();

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action,
      userId,
      email,
      ip,
      details,
      userAgent: details.userAgent || 'unknown'
    };

    // Escribir en archivo de log (formato JSONL)
    const logFile = path.join(LOGS_DIR, `activity-${new Date().toISOString().split('T')[0]}.log`);
    await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');

    // Si hay userId, guardar en base de datos
    if (userId && global.prisma) {
      await global.prisma.activityLog.create({
        data: {
          action,
          userId,
          ip,
          userAgent: details.userAgent,
          details: JSON.stringify(details)
        }
      });
    }

    console.log(`[LOG] ${timestamp} | ${action} | ${email} | ${ip}`);
  } catch (error) {
    console.error('Error al escribir log:', error);
    // No lanzar error para no interrumpir el flujo principal
  }
}

/**
 * Middleware para registrar actividad automáticamente
 * Debe usarse DESPUÉS del middleware de autenticación
 */
const activityLogMiddleware = async (req, res, next) => {
  // Registrar acceso a rutas protegidas
  if (req.user && req.route) {
    const action = `${req.method.toLowerCase()}_${req.route.path.replace(/api\//, '').replace(/\//g, '_').replace(/:\w+/g, 'id')}`;
    await logActivity(
      action,
      req.user.id,
      req.user.email,
      req.ip || req.connection.remoteAddress,
      { userAgent: req.get('user-agent') }
    );
  }

  next();
};

/**
 * Obtener logs de actividad (solo para admin)
 * @param {number} limit - Cantidad de registros a retornar (default: 100)
 * @param {number} offset - Offset para paginación (default: 0)
 */
async function getActivityLogs(limit = 100, offset = 0) {
  try {
    const logs = await global.prisma.activityLog.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    });

    const total = await global.prisma.activityLog.count();

    return { logs, total };
  } catch (error) {
    console.error('Error al obtener logs:', error);
    return { logs: [], total: 0 };
  }
}

/**
 * Limpiar logs antiguos (más de 90 días)
 */
async function cleanOldLogs() {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // Eliminar de base de datos
    const deleted = await global.prisma.activityLog.deleteMany({
      where: {
        createdAt: {
          lt: ninetyDaysAgo
        }
      }
    });

    console.log(`🧹 Limpiados ${deleted.count} logs antiguos`);

    // Opcional: comprimir logs de archivo antiguos
    // Por implementar con archivo .tar.gz

    return deleted.count;
  } catch (error) {
    console.error('Error al limpiar logs:', error);
    return 0;
  }
}

/**
 * Registrar intento de login (exitoso o fallido)
 * @param {string} email - Email ingresado
 * @param {boolean} success - Si el login fue exitoso
 * @param {string} ip - Dirección IP
 * @param {string} userAgent - User agent del navegador
 */
async function logLoginAttempt(email, success, ip, userAgent) {
  const action = success ? 'login_success' : 'login_failed';
  
  await logActivity(action, null, email, ip, {
    success,
    userAgent
  });

  // Si hay muchos intentos fallidos, alertar
  if (!success) {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const failedAttempts = await global.prisma.activityLog.count({
      where: {
        action: 'login_failed',
        email,
        createdAt: {
          gt: oneHourAgo
        }
      }
    });

    if (failedAttempts >= 5) {
      console.warn(`⚠️  ALERTA: ${failedAttempts} intentos de login fallidos para ${email} en la última hora`);
      
      // Futuro: enviar email de alerta al administrador
    }
  }
}

module.exports = {
  logActivity,
  activityLogMiddleware,
  getActivityLogs,
  cleanOldLogs,
  logLoginAttempt
};