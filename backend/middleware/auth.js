/**
 * ============================================
 * MIDDLEWARE DE AUTENTICACIÓN Y AUTORIZACIÓN
 * ============================================
 * 
 * Sistema de seguridad basado en JWT (JSON Web Tokens) para proteger rutas del panel admin.
 * 
 * Componentes:
 * 1. authenticate: Verifica que el usuario esté autenticado (token JWT válido)
 * 2. authorizeAdmin: Verifica que el usuario tenga rol de administrador
 * 3. Funciones auxiliares para generar tokens y hashear contraseñas
 * 
 * Flujo de autenticación:
 * 1. Cliente envía login con email/password → Recibe token JWT
 * 2. Cliente incluye token en header "Authorization: Bearer <token>"
 * 3. Middleware authenticate extrae y valida el token
 * 4. Si es válido, inyecta req.user con datos del usuario
 * 5. authorizeAdmin verifica que req.user.role === 'admin'
 * 
 * Seguridad:
 * - Contraseñas hasheadas con bcrypt (factor 10)
 * - Tokens JWT con expiración (default: 7 días)
 * - Nunca se expone el password hash en respuestas
 * 
 * @module AuthMiddleware
 */

const jwt = require('jsonwebtoken'); // Librería para JSON Web Tokens
const bcrypt = require('bcrypt'); // Librería para hashing de contraseñas

// ============================================
// MIDDLEWARE DE AUTENTICACIÓN
// ============================================

/**
 * Middleware: authenticate
 * 
 * Verifica que el usuario esté autenticado mediante token JWT.
 * Se ejecuta antes de los controladores en rutas protegidas.
 * 
 * Flujo:
 * 1. Extraer token del header "Authorization: Bearer <token>"
 * 2. Verificar que el token exista
 * 3. Validar firma y expiración del token con JWT_SECRET
 * 4. Inyectar req.user con datos decodificados del token
 * 5. Llamar a next() para continuar con el controlador
 * 
 * Si falla:
 * - Retorna 401 si no hay token
 * - Retorna 401 si el token es inválido o expiró
 * 
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Función next() de Express
 * 
 * @returns {void} Inyecta req.user o retorna error 401
 */
const authenticate = async (req, res, next) => {
  try {
    // Extraer token del header Authorization
    // Formato esperado: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Validar que el token exista
    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verificar firma y expiración del token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Inyectar datos del usuario en el request para usarlos en el controlador
    req.user = decoded;
    
    // Continuar con el siguiente middleware/controlador
    next();
  } catch (error) {
    // Token inválido, expirado o error de verificación
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

// ============================================
// MIDDLEWARE DE AUTORIZACIÓN
// ============================================

/**
 * Middleware: authorizeAdmin
 * 
 * Verifica que el usuario autenticado tenga rol de administrador.
 * Se usa después de authenticate en rutas que requieren privilegios admin.
 * 
 * Uso:
 * - Protege endpoints de CRUD de productos
 * - Protege endpoints de CRUD de proyectos
 * - Protege visualización de contactos
 * 
 * @param {Object} req - Request de Express (con req.user inyectado por authenticate)
 * @param {Object} res - Response de Express
 * @param {Function} next - Función next() de Express
 * 
 * @returns {void} Llama a next() o retorna error 403
 */
const authorizeAdmin = (req, res, next) => {
  // Verificar que el rol del usuario sea 'admin'
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
  }
  
  // Usuario autorizado, continuar
  next();
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Generar token JWT para un usuario
 * 
 * Crea un token firmado con el secreto configurado en JWT_SECRET.
 * El token contiene datos públicos del usuario y expira en el tiempo configurado.
 * 
 * @param {Object} user - Datos del usuario desde la base de datos
 * @param {string} user.id - ID único del usuario
 * @param {string} user.email - Email del usuario
 * @param {string} user.role - Rol del usuario (admin, user, etc.)
 * 
 * @returns {string} Token JWT firmado
 * 
 * @example
 * const token = generateToken(user);
 * // Retorna: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
const generateToken = (user) => {
  // Firmar token con datos del usuario y configuración de expiración
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET, // Secreto desde .env (cambiar en producción)
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } // Default: 7 días
  );
};

/**
 * Hashear contraseña con bcrypt
 * 
 * Convierte una contraseña en texto plano a un hash irreversible.
 * Factor de costo 10 (balance entre seguridad y performance).
 * 
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} Hash bcrypt de la contraseña
 * 
 * @example
 * const hash = await hashPassword('miPassword123');
 * // Retorna: "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
 */
const hashPassword = async (password) => {
  // Hash con factor de costo 10 (10 rondas de hashing)
  return await bcrypt.hash(password, 10);
};

/**
 * Comparar contraseña con hash
 * 
 * Verifica si una contraseña en texto plano coincide con un hash almacenado.
 * Se usa en el login para validar credenciales.
 * 
 * @param {string} password - Contraseña en texto plano (ingresada por usuario)
 * @param {string} hashedPassword - Hash almacenado en base de datos
 * @returns {Promise<boolean>} true si coinciden, false si no
 * 
 * @example
 * const isValid = await comparePassword('miPassword123', hash);
 * // Retorna: true o false
 */
const comparePassword = async (password, hashedPassword) => {
  // bcrypt.compare extrae el salt del hash y compara
  return await bcrypt.compare(password, hashedPassword);
};

// ============================================
// EXPORTACIÓN
// ============================================
module.exports = {
  authenticate,      // Middleware: verifica token JWT
  authorizeAdmin,    // Middleware: verifica rol admin
  generateToken,     // Función: generar token JWT
  hashPassword,      // Función: hashear contraseña
  comparePassword    // Función: comparar contraseña con hash
};
