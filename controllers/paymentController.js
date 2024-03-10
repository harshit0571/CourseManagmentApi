// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: "YOUR_KEY_ID",
//   key_secret: "YOUR_KEY_SECRET",
// });

// const initiatePayment = async (req, res) => {
//   const options = {
//     amount: 50000, // amount in the smallest currency unit (in this case, paise)
//     currency: "INR",
//     receipt: "order_rcptid_11",
//     payment_capture: "1",
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// const handlePaymentSuccess = (req, res) => {
//   const body = req.body;
//   const razorpay_signature = req.headers["x-razorpay-signature"];

//   // Verify signature
//   const isValidSignature = razorpay.webhooks.verifySignature(
//     JSON.stringify(body),
//     razorpay_signature,
//     "YOUR_WEBHOOK_SECRET"
//   );

//   if (isValidSignature) {
//     // Payment success
//     console.log("Payment successful");
//     res.status(200).send("Payment successful");
//   } else {
//     // Invalid signature
//     console.log("Invalid signature");
//     res.status(400).send("Invalid signature");
//   }
// };

// module.exports = {
//   initiatePayment,
//   handlePaymentSuccess,
// };
