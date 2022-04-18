const mongoose = require("mongoose");
const {User} = require("./user.model");

const appointmentSchema = new mongoose.Schema({
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    appointmentdate: {
      type: String,
      default: new Date().toString(),
    },
    applyDate :{
      type : String,
      default: new Date().toString(),
    },
    message: {
      type : String,
      require:true
    }
  })
const Appointment = mongoose.model("appointment", appointmentSchema)

exports.Appointment = Appointment;
