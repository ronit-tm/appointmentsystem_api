const { User } = require("../model/user.model");
const jwt = require('jsonwebtoken')
const config = require("../config/defult.json")
const { sendResponse } = require("../helps/sendResponse");
const messages = require("../utils/messegs");
const responescode = require("../utils/responescode");
const mongoDbServiceUser = require("../service/mongoDbService")({model: User});


exports.auth = async (req, res, next) => {
  
  const token = req.header("X-auth-token");
   if(!token) {
     return sendResponse(res, messages.badRequest(responescode.badRequest))
   }
  try {
    const decoded = jwt.verify(token,  config.jwtPrivatKey)
    req.user = decoded
   if(!req.id == decoded._id ){
    return sendResponse(res, messages.badRequest(responescode.badRequest))
   }
   next();
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.badRequest(responescode.badRequest));
  }
};
