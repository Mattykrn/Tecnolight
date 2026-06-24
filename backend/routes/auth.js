const express = require('express');
const { body, validationResult } = require('express-validator');
const { login, getProfile, changePassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Contraseña requerida')
], login);

// Obtener perfil (requiere autenticación)
router.get('/profile', authenticate, getProfile);

// Cambiar contraseña (requiere autenticación)
router.put('/change-password', authenticate, [
  body('currentPassword').notEmpty().withMessage('Contraseña actual requerida'),
  body('newPassword').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
], changePassword);

module.exports = router;