const express=require('express');
const Razorpay=require('razorpay');
const router=express.Router();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { product_name, amount, description } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    // Render a Razorpay checkout page
    res.render("razorpaycheckout", {
      key_id: process.env.RAZORPAY_ID_KEY,
      amount: amount * 100,
      product_name,
      description,
      order_id: order.id,
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, msg: "Something went wrong!" });
  }
});

module.exports = router;