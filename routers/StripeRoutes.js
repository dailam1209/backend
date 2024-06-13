require("dotenv").config()
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, name, email } = req.body;
    
    // Chuyển đổi amount từ USD sang cent
    const amountInCents = Math.round(amount * 100);
   
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_name: name,
        customer_email: email
      }
    });
    
    res.send({
      idInitSecret: paymentIntent.client_secret
    });
   
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;

router.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Xử lý hậu thanh toán ở đây (cập nhật cơ sở dữ liệu, gửi email, v.v.)
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
