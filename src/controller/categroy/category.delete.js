const { Category } = require("../../model/categroy.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceCategory = require("../../service/mongoDbService")({ model: Category});

exports.categoryDelete = async (req, res) => {
  try {
    let { id } = req.params;
  
    let categorydelete = await mongoDbServiceCategory.deleteDocument(id);
    if (categorydelete) {
      return sendResponse(res, messages.successResponseMessage(responescode.success, "data successfull delete"));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
