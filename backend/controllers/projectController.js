const { PrismaClient } = require('@prisma/client');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const prisma = new PrismaClient();

// Obtener todos los proyectos (público)
const getAllProjects = async (req, res) => {
  try {
    const { active = 'true' } = req.query;
    
    const where = {};
    if (active !== 'false') {
      where.active = active === 'true';
    }

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

// Obtener proyecto por slug (público)
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await prisma.project.findUnique({
      where: { slug }
    });

    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado.' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({ error: 'Error al obtener proyecto.' });
  }
};

// Crear proyecto (requiere autenticación admin)
const createProject = async (req, res) => {
  try {
    const { title, slug, description, client, location, images, testimonial } = req.body;

    if (!title || !slug || !description || !client || !location) {
      return res.status(400).json({ 
        error: 'Título, slug, descripción, cliente y ubicación son requeridos.' 
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        client,
        location,
        images: images || [],
        testimonial
      }
    });

    res.status(201).json({
      message: 'Proyecto creado exitosamente.',
      project
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un proyecto con ese slug.' });
    }
    res.status(500).json({ error: 'Error al crear proyecto.' });
  }
};

// Actualizar proyecto (requiere autenticación admin)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, client, location, images, testimonial, active } = req.body;

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
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proyecto no encontrado.' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un proyecto con ese slug.' });
    }
    res.status(500).json({ error: 'Error al actualizar proyecto.' });
  }
};

// Eliminar proyecto (requiere autenticación admin)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: 'Proyecto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Proyecto no encontrado.' });
    }
    res.status(500).json({ error: 'Error al eliminar proyecto.' });
  }
};

module.exports = {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};