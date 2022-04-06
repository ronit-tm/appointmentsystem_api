const { Category } = require("../../model/categroy.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceCategroy = require("../../service/mongoDbService")( { model: Category });

exports.categoryPut = async (req, res) => {
  try {
    let { categoryName } = req.body;
    let { id } = req.params;
    let findCategory = await mongoDbServiceCategroy.getSingleDocumentByQuery({categoryName, _id:{$ne: id}})
    if(findCategory){
      return sendResponse(res, messages.conflict(responescode.conflict))
    }
  
    let category = await mongoDbServiceCategroy.getSingleDocumentById(id);
    if (!category) {
      return sendResponse(res, messages.notFound(responescode.notFound));
    }
    category = category.toJSON()
    category.categoryName = categoryName ? categoryName : category.categoryName
    let putcategory = await mongoDbServiceCategroy.findOneAndUpdateDocument({_id : id} , category , { new : true});
    if (putcategory) {
      return sendResponse(res, messages.successResponse(responescode.success, putcategory));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
