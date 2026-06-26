/**
 * ============================================
 * RUTAS DE CONTACTO
 * ============================================
 * 
 * Define los endpoints HTTP para el formulario de contacto.
 * Separa la ruta pública de envío de las rutas protegidas de gestión.
 * 
 * @module ContactRoutes
 */

const express = require('express');
const {
  createContact: submitContact, // Controlador para envío de formulario
  getAllContacts,               // Controlador para listado admin
  markAsRead,                   // Controlador para marcar como leído
  deleteContact                 // Controlador para eliminar
} = require('../controllers/contactController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const security = require('../src/security');

const router = express.Router();

// ============================================
// RUTA PÚBLICA (envío de formulario)
// ============================================

/**
 * POST /api/contact
 * Envía un mensaje desde el formulario de contacto
 * 
 * Validaciones:
 * - Nombre, email y mensaje requeridos
 * - Email con formato válido
 * - Mensaje entre 10 y 2000 caracteres
 * 
 * Rate limit: Máximo 3 envíos por hora por IP (anti-spam)
 * 
 * Body: { name, email, phone?, company?, message }
 * 
 * Usado por: Página /contact
 */
router.post('/', security.contactLimiter, security.validateMiddleware.contact, security.injectionDetection, submitContact);

// ============================================
// RUTAS PROTEGIDAS (requieren autenticación admin)
// ============================================

/**
 * GET /api/contact
 * Lista todos los mensajes de contacto (solo admin)
 * 
 * Middleware:
 * - authenticate: Verifica token JWT
 * - authorizeAdmin: Verifica rol admin
 * 
 * Usado por: Panel de administración
 */
router.get('/', authenticate, authorizeAdmin, getAllContacts);

/**
 * PUT /api/contact/:id/read
 * Marca un mensaje como leído
 * 
 * @param {string} req.params.id - ID único del contacto
 * 
 * Usado por: Panel admin al revisar mensajes
 */
router.put('/:id/read', authenticate, authorizeAdmin, markAsRead);

/**
 * DELETE /api/contact/:id
 * Elimina un mensaje de contacto permanentemente
 * 
 * @param {string} req.params.id - ID único del contacto
 * 
 * ⚠️ Esta acción no se puede deshacer.
 */
router.delete('/:id', authenticate, authorizeAdmin, deleteContact);

// ============================================
// EXPORTACIÓN
// ============================================
module.exports = router;