const { Category } = require("../../model/categroy.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceCategroy = require("../../service/mongoDbService")({ model: Category});

exports.categoryPost = async (req, res) => {
  try {
    let { categoryName } = req.body;
    let getCategory = await mongoDbServiceCategroy.getSingleDocumentByQuery({ categoryName }, ["categoryName" ]);;
    if (getCategory) {
      return sendResponse(res, messages.conflict(responescode.conflict));
    }
    let category = {
      categoryName,
    };
    let createCategory = await mongoDbServiceCategroy.createDocument(category);
    if (createCategory) {
      return sendResponse(res, messages.successResponse(responescode.success, createCategory));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
