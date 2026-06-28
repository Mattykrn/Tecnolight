const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const security = require('../src/security');

router.use(authenticate, authorizeAdmin);

router.get('/', clientController.list);
router.get('/:id', clientController.getById);
router.post('/', security.validateMiddleware.client, security.injectionDetection, clientController.create);
router.put('/:id', security.validateMiddleware.client, security.injectionDetection, clientController.update);
router.delete('/:id', clientController.remove);

module.exports = router;
