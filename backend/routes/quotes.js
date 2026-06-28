const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const security = require('../src/security');

router.use(authenticate, authorizeAdmin);

router.get('/', quoteController.list);
router.get('/:id', quoteController.getById);
router.post('/', security.validateMiddleware.quote, security.injectionDetection, quoteController.create);
router.put('/:id', security.validateMiddleware.quote, security.injectionDetection, quoteController.update);
router.patch('/:id/status', security.validateMiddleware.quoteStatus, quoteController.updateStatus);
router.delete('/:id', quoteController.remove);
router.get('/:id/pdf', quoteController.generatePdf);

module.exports = router;
