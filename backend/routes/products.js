/**
 * ============================================
 * RUTAS DE PRODUCTOS
 * ============================================
 * 
 * Define los endpoints HTTP para el catálogo de productos.
 * Separa rutas públicas (accesibles por cualquiera) de rutas protegidas (solo admin).
 * 
 * Estructura:
 * - Rutas públicas: No requieren autenticación
 * - Rutas protegidas: Requieren token JWT válido + rol admin
 * 
 * @module ProductRoutes
 */

const express = require('express');
const {
  getAllProducts,      // Controlador para listado
  getProductBySlug,    // Controlador para detalle
  getCategories,       // Controlador para categorías
  createProduct,       // Controlador para crear
  updateProduct,       // Controlador para actualizar
  deleteProduct        // Controlador para eliminar
} = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const security = require('../src/security');

const router = express.Router();

// ============================================
// RUTAS PÚBLICAS (sin autenticación)
// ============================================

/**
 * GET /api/products
 * Lista todos los productos activos del catálogo
 * 
 * Query params opcionales:
 * - ?category=Reglamentarias (filtra por categoría)
 * - ?active=false (incluye productos inactivos, usado por admin)
 * 
 * Ejemplo: GET /api/products?category=Preventivas
 */
router.get('/', security.apiLimiter, getAllProducts);

/**
 * GET /api/products/categories
 * Obtiene lista de categorías únicas disponibles
 * 
 * Retorna: ["Reglamentarias", "Preventivas", "Informativas", "Cartelería Comercial"]
 * 
 * Usado por: Frontend para poblar filtros del catálogo
 */
router.get('/categories', getCategories);

/**
 * GET /api/products/:slug
 * Obtiene un producto específico por su slug
 * 
 * @param {string} req.params.slug - Slug del producto (ej: "senal-pare")
 * 
 * Usado por: Página de detalle /catalog/[slug]
 */
router.get('/:slug', getProductBySlug);

// ============================================
// RUTAS PROTEGIDAS (requieren autenticación admin)
// ============================================

/**
 * POST /api/products
 * Crea un nuevo producto en el catálogo
 * 
 * Middleware:
 * - authenticate: Verifica que el token JWT sea válido
 * - authorizeAdmin: Verifica que el usuario tenga rol 'admin'
 * 
 * Body: { name, slug, description, category, image?, price?, specs?, active? }
 */
router.post('/', authenticate, authorizeAdmin, security.validateMiddleware.product, security.injectionDetection, createProduct);

/**
 * PUT /api/products/:id
 * Actualiza un producto existente
 * 
 * @param {string} req.params.id - ID único del producto
 * 
 * Body: { name?, slug?, description?, category?, image?, price?, specs?, active? }
 */
router.put('/:id', authenticate, authorizeAdmin, security.validateMiddleware.product, security.injectionDetection, updateProduct);

/**
 * DELETE /api/products/:id
 * Elimina un producto permanentemente de la base de datos
 * 
 * @param {string} req.params.id - ID único del producto a eliminar
 * 
 * ⚠️ Esta acción no se puede deshacer.
 */
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

// ============================================
// EXPORTACIÓN
// ============================================
module.exports = router;