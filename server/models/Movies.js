const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId:{
    type:String
  },
  imageUrl:{
    type:String,
  
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  showTime: {
    type: String,
    required:true
  },
  totalSeat:{
    type:Number
  }
});

const Movies = mongoose.model("movies", movieSchema);
module.exports = Movies;
