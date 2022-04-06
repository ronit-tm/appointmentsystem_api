const { promise } = require("bcrypt/promises");
const { query } = require("express");
const { body, param, header } = require("express-validator");
const { Presciption } = require("../model/prescription.model");
const { User } = require("../model/user.model");
const mongoDbServiceuser = require("../service/mongoDbService")({model: User});
const mongoDbServicePrescription = require("../service/mongoDbService")({model: Presciption });

module.exports = {
  // GET /prescription
  prescriptionget: [
    query("id")
  ],
  // POST /prescription

  prescriptionpost: [
    body("doctor").custom((value) => {
      return mongoDbServiceuser.getDocumentById(value).then((prescription) => {
        if (!prescription) {
          return Promise.reject("can not found ID");
        }
      });
    }),
    body("patient").custom((value) => {
      return mongoDbServiceuser.getDocumentById(value).then((prescription) => {
        if (!prescription) {
          return Promise.reject("can not found ID");
        }
      });
    }),
    body("note", "note must be required").exists().trim().isString(),
  ],

  // PUT  /prescription

  prescriptionput: [
    body("doctor").custom((value) => {
      return mongoDbServiceuser.getDocumentById(value).then((prescription) => {
        if (!prescription) {
          return Promise.reject("can not found ID");
        }
      });
    }),
    body("patient").custom((value) => {
      return mongoDbServiceuser.getDocumentById(value).then((prescription) => {
        if (!prescription) {
          return Promise.reject("can not found ID");
        }
      });
    }),
    body("note", "address must be required").exists().trim().isString(),
  ],

  // DELETE  /prescription
  prescriptiondelete: [
    param("id").custom((value) => {
      return mongoDbServicePrescription.getDocumentById(value).then((prescription) => {
        if (!prescription) {
          return Promise.reject("can not found prescription ID");
        }
      });
    }),
  ],
};
