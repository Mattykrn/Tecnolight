const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const security = require('../src/security');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.params.type || 'products';
    cb(null, path.join(__dirname, '..', 'uploads', type));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  if (allowed.test(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error('Formato de imagen no soportado. Usá JPG, PNG, GIF, WebP o SVG.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/:type', authenticate, authorizeAdmin, security.apiLimiter, (req, res) => {
  const type = req.params.type;
  if (!['products', 'projects', 'instagram'].includes(type)) {
    return res.status(400).json({ error: 'Tipo de subida inválido.' });
  }

  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'La imagen no puede superar 5MB.' : 'Error al subir imagen.' });
      }
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se seleccionó ningún archivo.' });
    }

    const url = `/uploads/${type}/${req.file.filename}`;
    res.json({ success: true, url, filename: req.file.filename });
  });
});

module.exports = router;
