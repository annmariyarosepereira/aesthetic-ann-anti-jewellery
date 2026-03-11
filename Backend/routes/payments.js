const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// Verify PayPal Payment
router.post('/paypal-pay', auth, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId || !paymentId) {
      return res.status(400).json({ message: 'Missing order details or payment ID' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
       return res.status(404).json({ message: 'Order not found' });
    }

    // Verify ownership
    if (order.user.toString() !== req.user._id.toString()) {
       return res.status(401).json({ message: 'Not authorized' });
    }

    // Mark as paid
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: paymentId,
        status: 'COMPLETED',
        email_address: req.user.email
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);

  } catch (error) {
    console.error('PayPal payment verification error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
