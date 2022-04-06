const { body, param, header } = require("express-validator");
const { User } = require("../model/user.model");
const { promise } = require("bcrypt/promises");
const { query } = require("express");
const mongoDbServiceuser = require("../service/mongoDbService")({model: User});

module.exports = {
  // user/post
  userpost: [
    body("role").exists().isString(),
    body("name", "name is required").exists().isString(),
    body("email", "email must be required").exists().isEmail(),
    body("password", "password must be required").exists(),
    body("phone").isMobilePhone(),
    body("category").optional().isString(),
  ],
  //user/get
  userget: [query("id")],
  // user/put
  userput: [

    body("name", "name is required").exists(),
    body("address", "address is required").exists().trim().isString(),
    body("phone").isMobilePhone(),
    body("category").optional().isString(),
  ],
  // user/delete
  userdelete: [
    param("id").custom((value) => {
      return mongoDbServiceuser.getDocumentById(value).then((user) => {
        if (!user) {
          return Promise.reject("can not found ID");
        }
      });
    }),
  ],
};
