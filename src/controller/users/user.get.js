const { User } = require("../../model/user.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbserviceUser = require("../../service/mongoDbService")({ model: User});

exports.getUser = async (req, res) => {
  try {
    let query = {};
    let { role } = req.query;
       if(role =="doctor") {
         query = {role :"doctor"};
       }
       else if(role=="patient") {
        query = {role: "patient"};
       }
       const select = ["name", "address", "email", "phone", "role", "category"];
     const populate = [{ path: "category", select: "categoryName" }];
        await mongoDbserviceUser.getDocumentByQueryPopulate(query, select, populate)
      .then((data) => {
        return sendResponse(res,messages.successResponse(responescode.success, data));
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


exports.getoneUser = async (req, res) => {
  try {
    let { id } = req.params;
    if (!req.params) {
      return sendResponse(res, messages.notFound(responescode.notFound));
    }
    const select = ["name", "status", "email", "phone", "role", "category"];
    await mongoDbserviceUser.getSingleDocumentByQuery({id}, select)
      .then((data) => {
        return sendResponse(res, messages.successResponse(responescode.success, data));
      })
      .catch((err) => {
        console.log(err);
        return sendResponse(res, messages.internalServerError(responescode.internalServerError));
      });
  } catch (err) {
    console.log(err);
    return sendResponse( res, messages.internalServerError(responescode.internalServerError)
    );
  }
};


exports.getDoctor = async (req, res) => {
  try{
          let search = req.query.category
          ? {
            category : req.query.category
          }
          : {};
   let searchCategroy = await mongoDbserviceUser.getDocumentByQuery(search,["name", "email", "phone",  "role", "category"] )
    if(searchCategroy){

       return sendResponse(res, messages.successResponse(responescode.success,searchCategroy))
       }  else {
        return sendResponse(res, messages.notFound(responescode.notFound))
       }
} catch(err){
  console.log(err);
    return sendResponse( res, messages.internalServerError(responescode.internalServerError));
}
}

