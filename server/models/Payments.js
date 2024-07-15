const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  movies: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
      },
      seatNumber: {
        type: Number,
        required: true,
      },
    },
  ],
  userId:{
    type:String,
   
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("payment", PaymentSchema);
module.exports = Payment;
