/**
 * ============================================
 * CONTROLADOR DE PROYECTOS
 * ============================================
 * 
 * Maneja la lógica de negocio para la galería de proyectos realizados.
 * Permite mostrar el portfolio de trabajos completados con testimonios de clientes.
 * 
 * Funcionalidades:
 * - Listado público de proyectos activos para el frontend
 * - Búsqueda por slug para URLs amigables
 * - CRUD completo protegido para que el admin cargue nuevos trabajos
 * - Incluye testimonios, imágenes y datos del cliente
 * 
 * @module ProjectController
 */

const { PrismaClient } = require('@prisma/client');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const prisma = new PrismaClient();

// ============================================
// ENDPOINTS PÚBLICOS
// ============================================

/**
 * Obtener todos los proyectos (público)
 * 
 * Query params:
 * - active (opcional): 'true' por defecto, 'false' para incluir proyectos inactivos
 * 
 * Retorna:
 * - projects: Array de proyectos con testimonios e imágenes
 * - total: Cantidad total de proyectos
 * 
 * @route GET /api/projects
 * @access Public
 */
const getAllProjects = async (req, res) => {
  try {
    const { active = 'true' } = req.query;
    
    // Filtro para mostrar solo proyectos activos por defecto
    const where = {};
    if (active !== 'false') {
      where.active = active === 'true';
    }

    // Consulta ordenada por fecha (más reciente primero)
    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ projects, total: projects.length });
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener proyectos.' });
  }
};

/**
 * Obtener proyecto por slug (público)
 * 
 * El slug es un identificador único URL-amigable (ej: "senalizacion-municipal-santa-fe")
 * Se usa para URLs del tipo: /proyectos/senalizacion-municipal-santa-fe
 * 
 * @route GET /api/projects/:slug
 * @access Public
 * @param {string} req.params.slug - Slug único del proyecto
 */
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Buscar proyecto por slug único
    const project = await prisma.project.findUnique({
      where: { slug }
    });

    // Validar existencia
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado.' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({ error: 'Error al obtener proyecto.' });
  }
};

// ============================================
// ENDPOINTS PROTEGIDOS (ADMIN)
// ============================================

/**
 * Crear nuevo proyecto en el portfolio
 * 
 * Body requerido:
 * - title: Título del proyecto
 * - slug: Identificador URL único (ej: "senalizacion-municipal-santa-fe")
 * - description: Descripción detallada del trabajo realizado
 * - client: Nombre del cliente (empresa/municipio)
 * - location: Ubicación del proyecto
 * 
 * Body opcional:
 * - images: Array de rutas de imágenes del proyecto
 * - testimonial: Testimonio del cliente sobre el trabajo
 * 
 * @route POST /api/projects
 * @access Private (Admin)
 * @middleware authenticate, authorizeAdmin
 */
const createProject = async (req, res) => {
  try {
    // Extraer datos del body
    const { title, slug, description, client, location, images, testimonial } = req.body;

    // Validar campos requeridos
    if (!title || !slug || !description || !client || !location) {
      return res.status(400).json({ 
        error: 'Título, slug, descripción, cliente y ubicación son requeridos.' 
      });
    }

    // Crear proyecto en base de datos
    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        client,
        location,
        images: images || [], // Array vacío si no se envían imágenes
        testimonial
      }
    });

    res.status(201).json({
      message: 'Proyecto creado exitosamente.',
      project
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    // Slug duplicado
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un proyecto con ese slug.' });
    }
    res.status(500).json({ error: 'Error al crear proyecto.' });
  }
};

/**
 * Actualizar proyecto existente
 * 
 * @route PUT /api/projects/:id
 * @access Private (Admin)
 * @middleware authenticate, authorizeAdmin
 * @param {string} req.params.id - ID único del proyecto
 * @param {object} req.body - Datos actualizados del proyecto
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, client, location, images, testimonial, active } = req.body;

    // Actualizar proyecto en base de datos
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        client,
        location,
        images,
        testimonial,
        active
      }
    });

    res.json({
      message: 'Proyecto actualizado exitosamente.',
      project
    });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    // Proyecto no encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proyecto no encontrado.' });
    }
    // Slug duplicado
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un proyecto con ese slug.' });
    }
    res.status(500).json({ error: 'Error al actualizar proyecto.' });
  }
};

/**
 * Eliminar proyecto del portfolio
 * 
 * @route DELETE /api/projects/:id
 * @access Private (Admin)
 * @middleware authenticate, authorizeAdmin
 * @param {string} req.params.id - ID único del proyecto a eliminar
 */
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminación permanente de la base de datos
    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: 'Proyecto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    // Proyecto no existe
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proyecto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al eliminar proyecto.' });
  }
};

// ============================================
// EXPORTACIÓN DE MÉTODOS
// ============================================
module.exports = {
  getAllProjects,      // GET /api/projects - Listado público
  getProjectBySlug,    // GET /api/projects/:slug - Detalle público
  createProject,       // POST /api/projects - Crear (admin)
  updateProject,       // PUT /api/projects/:id - Actualizar (admin)
  deleteProject        // DELETE /api/projects/:id - Eliminar (admin)
};
