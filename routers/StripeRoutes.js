require("dotenv").config()
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, name, quantity } = req.body;
    
    // Convert amount to cents as Stripe expects amount in the smallest currency unit
    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name, // Replace with your product name
            },
            unit_amount: amountInCents,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.send({
      sessionId: session.url,
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
