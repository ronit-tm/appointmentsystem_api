const { User } = require("../../model/user.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceUser = require("../../service/mongoDbService")({model: User});
exports.deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
   
    let deleteuser = mongoDbServiceUser.softDeleteDocument(id);
    if (deleteuser) {
      return sendResponse(res, messages.successResponseMessage(responescode.success, "data successfull delete"));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
