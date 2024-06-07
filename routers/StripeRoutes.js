require("dotenv").config()
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // Số tiền tính bằng cent (20.00 USD)
      currency: 'usd',
      payment_method_types: ['card'],
    });
    console.log('paymentIntent.client_secret', paymentIntent.client_secret)
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

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
