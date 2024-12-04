const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\d{11}$/, 
  },
  city: {
    type: String,
    required: true,
  },
  maxPictures: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  pictures: {
    type: [String],
    validate: [arrayLimit, "Exceeds the maximum allowed number of pictures"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: "User", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function arrayLimit(val) {
  return val.length <= 10; // Maximum of 10 pictures
}

module.exports = mongoose.model("Cars", CarsSchema);
