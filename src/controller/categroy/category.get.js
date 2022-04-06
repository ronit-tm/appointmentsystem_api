const { Category } = require("../../model/categroy.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceCategroy = require("../../service/mongoDbService")({ model: Category });

exports.getAllcategroy = async (req, res) => {
  try {
     const select = ["categoryName"];
     await mongoDbServiceCategroy.getDocumentByQuery({}, select)
      .then((data) => {
        return sendResponse(res, messages.successResponse(responescode.success, data));
      })
      .catch((err) => {
        console.log(err);
        return sendResponse( res, messages.internalServerError(responescode.internalServerError));
      });
  } catch (err) {
    console.log(err);
    return sendResponse( res, messages.internalServerError(responescode.internalServerError));
  }
};

exports.categoryGetId = async (req, res) => {
  try {
    let { id } = req.params;
    const select = ["categoryName"];
    await mongoDbServiceCategroy.getDocumentById(id, select)
      .then((data) => {
        return sendResponse( res, messages.successResponse(responescode.success, data));
      })
      .catch((err) => {
        console.log(err);
        return sendResponse(res, messages.internalServerError(responescode.internalServerError));
      });
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
