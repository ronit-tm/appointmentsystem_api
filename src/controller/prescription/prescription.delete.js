const { Presciption } = require("../../model/prescription.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServicePrescription = require("../../service/mongoDbService")({ model: Presciption });

exports.presciptiondelete = async (req, res) => {
  try {
    let { id } = req.param;
    let presciptiondelete = await mongoDbServicePrescription.deleteDocument(id);
    if (presciptiondelete) {
      return sendResponse(res, messages.successResponseMessage(responescode.success, "data successfull delete" ));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
