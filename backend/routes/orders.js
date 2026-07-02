const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const security = require('../src/security');

/**
 * POST /api/orders/quick
 * Pedido rápido desde el carrito público (sin auth)
 * Crea un cliente genérico "Web" si no existe y registra el pedido
 */
router.post('/quick', orderController.createQuick);

router.use(authenticate, authorizeAdmin);

router.get('/', orderController.list);
router.get('/:id', orderController.getById);
router.post('/', security.validateMiddleware.order, security.injectionDetection, orderController.create);
router.put('/:id', security.validateMiddleware.order, security.injectionDetection, orderController.update);
router.patch('/:id/status', security.validateMiddleware.orderStatus, orderController.updateStatus);
router.delete('/:id', orderController.remove);

module.exports = router;
