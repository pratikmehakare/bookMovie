const Payment = require("../models/Payments");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.orderPayment = async (req, res) => {
  const { amount } = req.body;
  
  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex")    
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({
        success: true,
        message: "Order success",
        data:order,

      });
      console.log(order);
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error!",
    });
    console.log(err);
  }
};

exports.verifyPayment = async (req, res) => {
  const { 
    movieId,
    seatNumber,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const userId = req.user.id;
  if (!userId) {
    return res.status(403).json({
      success: false,
      message: "User ID not found"
    });
  }


  try {
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // Create ExpectedSign
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // console.log(razorpay_signature === expectedSign);

    // Create isAuthentic
    const isAuthentic = expectedSign === razorpay_signature;

    // Condition
    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        movies: [
          {
            movieId,
            seatNumber,
          },
        ],
        userId:userId
        
      });

      // Save Payment
      await payment.save();

      // Send Message
      return res.json({
        success: true,
        message: "Payement Successfully",
        data: payment,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error!",
    });
    console.log(error);
  }
};
