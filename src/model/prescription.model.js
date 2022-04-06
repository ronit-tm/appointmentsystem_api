const mongoose = require("mongoose");
const {User} = require("./user.model");

const presciptionSchema =  new mongoose.Schema({
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    note: {
      type: String,
      required: true,
    },
    media: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  })
const Presciption = mongoose.model("presciption" , presciptionSchema );

exports.Presciption = Presciption;
