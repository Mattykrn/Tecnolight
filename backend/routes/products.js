const express = require('express');
const {
  getAllProducts,
  getProductBySlug,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Rutas públicas
router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:slug', getProductBySlug);

// Rutas protegidas (admin)
router.post('/', authenticate, authorizeAdmin, createProduct);
router.put('/:id', authenticate, authorizeAdmin, updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

module.exports = router;