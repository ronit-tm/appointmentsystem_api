const { User } = require("../../model/user.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceUser = require("../../service/mongoDbService")({model: User});

exports.putUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, phone, categroy, address } = req.body;
    if (!user) {
      return sendResponse( res, messages.notFound(responescode.notFound));
    }
    user = user.toJSON()
   user.name = name? name: user.name
   user.phone = phone ? phone : user.phone
   user.categroy = categroy ? categroy : user.categroy
   user.address = address ? address : user.address
  
    let putuser = await mongoDbServiceUser.findOneAndUpdateDocument({_id:id}, user,{new:true})
  
    if (putuser) {
      putuser = putuser.toJSON();
      delete putuser.passwor
      delete putuser.__v
      return sendResponse(res, messages.successResponse(responescode.success, putuser)
      );
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError)
    );
  }
};
