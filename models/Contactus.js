const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "message is required"],
    trim: true,
  },
});
module.exports = mongoose.model('portfolio', ContactSchema);
