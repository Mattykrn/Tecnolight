/**
 * ============================================
 * CONTROLADOR DE PRODUCTOS
 * ============================================
 * 
 * Maneja toda la lógica de negocio relacionada con el catálogo de productos.
 * Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para señales viales.
 * 
 * Funcionalidades:
 * - Listado público de productos con filtros por categoría y estado
 * - Búsqueda por slug para ficha técnica individual
 * - Obtención de categorías únicas para filtros del frontend
 * - CRUD completo protegido para administradores
 * 
 * @module ProductController
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ============================================
// ENDPOINTS PÚBLICOS
// ============================================

/**
 * Obtener todos los productos (público)
 * 
 * Query params:
 * - category (opcional): Filtra productos por categoría
 * - active (opcional): 'true' por defecto, 'false' para incluir inactivos
 * 
 * Retorna:
 * - products: Array de productos
 * - total: Cantidad total de productos encontrados
 * 
 * @route GET /api/products
 * @access Public
 */
const getAllProducts = async (req, res) => {
  try {
    const { category, active = 'true' } = req.query;
    const where = {};
    if (category) {
      where.category = category;
    }
    if (active !== 'false') {
      where.active = active === 'true';
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ products, total: products.length });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
};

/**
 * Obtener producto por slug (público)
 * 
 * @route GET /api/products/:slug
 * @access Public
 * @param {string} req.params.slug - Slug único del producto
 */
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json({ product });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto.' });
  }
};

/**
 * Obtener todas las categorías disponibles (público)
 * 
 * @route GET /api/products/categories
 * @access Public
 */
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.product.findMany({
      where: { active: true },
      select: { category: true },
      distinct: ['category']
    });
    const categoryList = categories.map(c => c.category);
    res.json({ categories: categoryList });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías.' });
  }
};

// ============================================
// ENDPOINTS PROTEGIDOS (ADMIN)
// ============================================

/**
 * Crear nuevo producto en el catálogo
 * 
 * @route POST /api/products
 * @access Private (Admin)
 */
const createProduct = async (req, res) => {
  try {
    const { name, slug, description, category, image, price, specs } = req.body;
    if (!name || !slug || !description || !category) {
      return res.status(400).json({ error: 'Nombre, slug, descripción y categoría son requeridos.' });
    }
    const product = await prisma.product.create({
      data: { name, slug, description, category, image, price, specs }
    });
    res.status(201).json({ message: 'Producto creado exitosamente.', product });
  } catch (error) {
    console.error('Error al crear producto:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un producto con ese slug.' });
    }
    res.status(500).json({ error: 'Error al crear producto.' });
  }
};

/**
 * Actualizar producto existente
 * 
 * @route PUT /api/products/:id
 * @access Private (Admin)
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, category, image, price, specs, active, stock } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { name, slug, description, category, image, price, specs, active, stock }
    });
    res.json({ message: 'Producto actualizado exitosamente.', product });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un producto con ese slug.' });
    }
    res.status(500).json({ error: 'Error al actualizar producto.' });
  }
};

/**
 * Ajustar stock de un producto (incremento/decremento atómico)
 * 
 * @route PATCH /api/products/:id/stock/adjust
 * @access Public (para carrito de compras)
 * Body: { delta: -1 }  (positivo = aumentar stock, negativo = disminuir)
 */
const adjustStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { delta } = req.body;
    if (delta === undefined || delta === null || !Number.isInteger(delta) || delta === 0) {
      return res.status(400).json({ error: 'Delta debe ser un entero distinto de cero.' });
    }
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    if (product.stock + delta < 0) {
      return res.status(400).json({ error: 'Stock insuficiente.' });
    }
    const updated = await prisma.product.update({
      where: { id },
      data: { stock: { increment: delta } }
    });
    res.json({ message: 'Stock actualizado.', stock: updated.stock });
  } catch (error) {
    console.error('Error al ajustar stock:', error);
    res.status(500).json({ error: 'Error al ajustar stock.' });
  }
};

/**
 * Eliminar producto del catálogo
 * 
 * @route DELETE /api/products/:id
 * @access Private (Admin)
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al eliminar producto.' });
  }
};

// ============================================
// EXPORTACIÓN DE MÉTODOS
// ============================================
module.exports = {
  getAllProducts,
  getProductBySlug,
  getCategories,
  createProduct,
  updateProduct,
  adjustStock,
  deleteProduct
};