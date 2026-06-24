const express = require('express');
const { body, validationResult } = require('express-validator');
const { createContact, getAllContacts, markAsRead, deleteContact } = require('../controllers/contactController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Ruta pública - Crear contacto
router.post('/', [
  body('name').notEmpty().withMessage('Nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('message').notEmpty().withMessage('Mensaje es requerido')
], createContact);

// Rutas protegidas (admin)
router.get('/', authenticate, authorizeAdmin, getAllContacts);
router.put('/:id/read', authenticate, authorizeAdmin, markAsRead);
router.delete('/:id', authenticate, authorizeAdmin, deleteContact);

module.exports = router;