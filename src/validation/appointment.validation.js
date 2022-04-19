const { promise } = require("bcrypt/promises");
const { query } = require("express");
const { body, param, header } = require("express-validator");
const { User } = require("../model/user.model");
const { Appointment} = require('../model/appointment.model')
const mongoDbServiceAppointment = require('../service/mongoDbService')({model : Appointment})
const mongoDbServiceUser = require("../service/mongoDbService")({model: User});

module.exports = {
  
  // GET /appointment
  appointmentget: [ param('id').custom(value => {
    return mongoDbServiceAppointment.getDocumentById(value)
    .then((appointment) => {
        if(!appointment){
        return Promise.reject('can not found ID')
        }
    })
}).optional()],

  // POST  /appointment
  appointmentpost: [
    body("doctor").custom(async(value) => {
      return await mongoDbServiceUser.getDocumentById(value).then((appointment) => {
        if (!appointment) {
          return Promise.reject("can not found ID");
        }
      });
    }),
    body("email").optional(),
    body("phone").optional(),
    body("message" ).optional()
  ],

  
  //  PUT /appointment
  appointmentput: [
    body("doctor").custom((value) => {
      return mongoDbServiceUser.getDocumentById(value).then((appointment) => {
        if (!appointment) {
          return Promise.reject("can not found ID");
        }
      });
    }),
    body("email", "email must be required").isEmail().optional(),
    body("phone", "phone numbar must be required").optional(),
    body("message" ).optional()
  ],

  // DELETE /appointment
  appointmentdelete: [
    param("id").custom((value) => {
      return mongoDbServiceAppointment.getDocumentById(value).then((appointment) => {
        if (!appointment) {
          return Promise.reject("can not found ID");
        }
      });
    }),
  ],
};
