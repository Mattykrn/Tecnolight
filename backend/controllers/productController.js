const { PrismaClient } = require('@prisma/client');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const prisma = new PrismaClient();

// Obtener todos los productos (público)
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

// Obtener producto por slug (público)
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto.' });
  }
};

// Obtener todas las categorías (público)
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

// Crear producto (requiere autenticación admin)
const createProduct = async (req, res) => {
  try {
    const { name, slug, description, category, image, price, specs } = req.body;

    if (!name || !slug || !description || !category) {
      return res.status(400).json({ 
        error: 'Nombre, slug, descripción y categoría son requeridos.' 
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        category,
        image,
        price,
        specs
      }
    });

    res.status(201).json({
      message: 'Producto creado exitosamente.',
      product
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un producto con ese slug.' });
    }
    res.status(500).json({ error: 'Error al crear producto.' });
  }
};

// Actualizar producto (requiere autenticación admin)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, category, image, price, specs, active } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        category,
        image,
        price,
        specs,
        active
      }
    });

    res.json({
      message: 'Producto actualizado exitosamente.',
      product
    });
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

// Eliminar producto (requiere autenticación admin)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al eliminar producto.' });
  }
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
};