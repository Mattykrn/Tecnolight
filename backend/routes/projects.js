const express = require('express');
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Rutas públicas
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);

// Rutas protegidas (admin)
router.post('/', authenticate, authorizeAdmin, createProject);
router.put('/:id', authenticate, authorizeAdmin, updateProject);
router.delete('/:id', authenticate, authorizeAdmin, deleteProject);

module.exports = router;