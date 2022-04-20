const { body, param, header } = require("express-validator");
const { User } = require("../model/user.model");
const { promise } = require("bcrypt/promises");
const { query } = require("express");
const mongoDbServiceUser = require("../service/mongoDbService")({model: User});

module.exports = {
  // user/post
  userpost: [
    body("role").exists().isString(),
    body("name", "name is required").exists().isString(),
    body("email", "email must be required").exists().isEmail(),
    body("password", "password must be required").optional(),
    body("phone").optional(),
    body("category").optional().isString(),
    body("address", "address is required").optional().trim().isString(),
  ],
  //user/get
  userget: [query("id")],
  // user/put
  userput: [
    body("name", "name is required").exists(),
    body("address", "address is required").optional().trim().isString(),
    body("phone","valid").optional(),
    body("category","valid").optional().isString(),
  ],
  // user/delete
  userdelete: [
    param("id","please enter id").custom((value) => {
      return mongoDbServiceUser.getDocumentById(value).then((user) => {
        if (!user) {
          return Promise.reject("can not found ID");
        }
      });
    }),
  ],
};
