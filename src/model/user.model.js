const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Category } = require("../model/categroy.model");
const config = require("../config/defult.json");
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "patient",
    enum: ["admin", "doctor", "patient"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 10,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 256,
   
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 150,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10,
  },
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, config.jwtPrivatKey);
};
const User = mongoose.model("User", userSchema);

exports.User = User;
