const express = require("express");
const router = express.Router();
const validate = require("../validation/header");
const rules = require("../validation/appointment.validation");
const appointmentGet = require("../controller/appointment/appointment.get");
const appointmentPost = require("../controller/appointment/appointment.post");
const appointmentPut = require("../controller/appointment/appointment.put");
const appointmentDelete = require("../controller/appointment/appointment.delete");
const { auth } = require("../middleare/auth");

router.get("/",  validate(rules.appointmentget), appointmentGet.getAllappointment);
router.post("/publicRegistra",  validate(rules.appointmentpost), appointmentPost.appointmentPost);
router.delete("/:id", auth, validate(rules.appointmentdelete), appointmentDelete.deleteappointment);
router.put("/:id",auth, validate(rules.appointmentput), appointmentPut.appointmentPut);

module.exports = router;
