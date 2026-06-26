/**
 * ============================================
 * RUTAS DE PROYECTOS
 * ============================================
 * 
 * Define los endpoints HTTP para el portfolio de proyectos.
 * Separa rutas públicas de rutas protegidas (admin).
 * 
 * @module ProjectRoutes
 */

const express = require('express');
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const security = require('../src/security');

const router = express.Router();

// ============================================
// RUTAS PÚBLICAS
// ============================================

/**
 * GET /api/projects
 * Lista todos los proyectos activos del portfolio
 * 
 * Usado por: Página /projects
 */
router.get('/', security.apiLimiter, getAllProjects);

/**
 * GET /api/projects/:slug
 * Obtiene un proyecto específico por su slug
 * 
 * @param {string} req.params.slug - Slug del proyecto
 * 
 * Usado por: Página de detalle de proyecto
 */
router.get('/:slug', getProjectBySlug);

// ============================================
// RUTAS PROTEGIDAS (admin)
// ============================================

/**
 * POST /api/projects
 * Crea un nuevo proyecto en el portfolio
 * 
 * Body: { title, slug, description, images?, client?, location?, completedAt?, active? }
 */
router.post('/', authenticate, authorizeAdmin, security.validateMiddleware.project, security.injectionDetection, createProject);

/**
 * PUT /api/projects/:id
 * Actualiza un proyecto existente
 * 
 * @param {string} req.params.id - ID único del proyecto
 */
router.put('/:id', authenticate, authorizeAdmin, security.validateMiddleware.project, security.injectionDetection, updateProject);

/**
 * DELETE /api/projects/:id
 * Elimina un proyecto permanentemente
 * 
 * @param {string} req.params.id - ID único del proyecto
 * 
 * ⚠️ Esta acción no se puede deshacer.
 */
router.delete('/:id', authenticate, authorizeAdmin, deleteProject);

// ============================================
// EXPORTACIÓN
// ============================================
module.exports = router;