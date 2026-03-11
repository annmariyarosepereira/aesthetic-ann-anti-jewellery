const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} = require('../controllers/orderController');




router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);
router.get('/stats', auth, getOrderStats); 
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);
router.put('/:id/cancel', auth, cancelOrder);
router.get('/', auth, getAllOrders); 

module.exports = router;