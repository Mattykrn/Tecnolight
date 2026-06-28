const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.use(authenticate, authorizeAdmin);

router.get('/dashboard', salesController.dashboard);
router.get('/revenue', salesController.revenue);
router.get('/top-products', salesController.topProducts);

module.exports = router;
