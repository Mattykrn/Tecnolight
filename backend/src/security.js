const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://localhost:3000"],
      connectSrc: ["'self'", "http://localhost:5000", "http://localhost:3000"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  strictTransportSecurity: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  hidePoweredBy: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
};

const corsConfig = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, skipSuccessfulRequests: true });
const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 3 });

const validators = {
  login: [
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('password').isLength({ min: 6, max: 128 }).withMessage('Contraseña inválida')
  ],
  product: [
    body('name').isLength({ min: 2, max: 200 }).trim(),
    body('slug').isLength({ min: 2, max: 200 }).matches(/^[a-z0-9-]+$/),
    body('description').isLength({ min: 10, max: 5000 }).trim(),
    body('category').isIn(['Reglamentarias', 'Preventivas', 'Informativas', 'Cartelería Comercial', 'Industrial'])
  ],
  project: [
    body('title').isLength({ min: 2, max: 200 }).trim(),
    body('slug').isLength({ min: 2, max: 200 }).matches(/^[a-z0-9-]+$/),
    body('description').isLength({ min: 10, max: 5000 }).trim()
  ],
  contact: [
    body('name').isLength({ min: 2, max: 100 }).trim().matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().isMobilePhone('es-AR'),
    body('message').isLength({ min: 10, max: 2000 }).trim()
  ]
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  res.status(400).json({ error: 'Error de validación', details: errors.array().map(e => e.msg) });
};

const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return sanitizeString(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  const out = {};
  for (const k in obj) { if (obj.hasOwnProperty(k)) out[k] = sanitizeObject(obj[k]); }
  return out;
};

const detectSQLInjection = (str) => {
  if (typeof str !== 'string') return false;
  return /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b/i.test(str) ||
         /(?:--|\/\*|\*\/)/.test(str) ||
         /\b(?:OR|AND)\b\s+\d+\s*=\s*\d+/i.test(str) ||
         /\bUNION\b\s+\bSELECT\b/i.test(str);
};

const detectXSS = (str) => {
  if (typeof str !== 'string') return false;
  return /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(str) ||
         /javascript:/gi.test(str) ||
         /on\w+\s*=\s*["'][^"']*["']/gi.test(str) ||
         /<iframe\b/gi.test(str);
};

const injectionDetection = (req, res, next) => {
  const check = (obj, path = '') => {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      const val = obj[key];
      const cur = path ? `${path}.${key}` : key;
      if (typeof val === 'string') {
        if (detectSQLInjection(val) || detectXSS(val)) {
          console.warn(`⚠️ Inyección bloqueada en ${cur}:`, val);
          return false;
        }
      } else if (val && typeof val === 'object') {
        if (!check(val, cur)) return false;
      }
    }
    return true;
  };
  if (!check(req.body) || !check(req.query) || !check(req.params)) {
    return res.status(403).json({ error: 'Solicitud bloqueada por seguridad' });
  }
  next();
};

module.exports = {
  helmetConfig, corsConfig, apiLimiter, authLimiter, contactLimiter,
  validators, validate, sanitizeString, sanitizeObject, injectionDetection,
  validateMiddleware: {
    product: [...validators.product, validate],
    project: [...validators.project, validate],
    contact: [...validators.contact, validate]
  }
};