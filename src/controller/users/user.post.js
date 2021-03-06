const bcrypt = require("bcrypt");
const { User } = require("../../model/user.model");
const { Category } = require("../../model/categroy.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceUser = require("../../service/mongoDbService")({model: User});
const mongoDbServiceCategory = require("../../service/mongoDbService")({model: Category});

exports.postUser = async (req, res) => {
  try {
    let { role, name, password, email,address, phone ,category } = req.body;
    let finduser = await mongoDbServiceUser.getSingleDocumentByQuery({email});
    if (finduser) {
      return sendResponse(res, messages.conflict(responescode.conflict));
    }
    let user;
    if(role === "doctor"){
       if(!category){
           return sendResponse(res, messages.badRequest(responescode.badRequest, "categroy must be required"));
       } 
       let categoryfind = await mongoDbServiceCategory.getSingleDocumentById(category);
       if(!categoryfind) {
         return sendResponse(res, messages.notFound(responescode.notFound))
       } 
       user = {
         name,
         email,
         password,
         address,
         phone,
         role,   
         category: categoryfind._id
       }
    }else {
      user = {
        name,
        email,
        password,
        phone,
        role: role?role: "patient"
      }
    }
    if(password){
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password.toString(), salt);
    }
    let createdUser = await mongoDbServiceUser.createDocument(user);
    console.log('createdUser: ', createdUser);
    if (createdUser) {
      const token = createdUser.generateAuthToken();
      createdUser = createdUser.toJSON();
      delete createdUser.password
      delete createdUser.__v
      return sendResponse( res, messages.successResponse(responescode.success, {...createdUser,token}));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (error) {
    console.log(error);
    return sendResponse( res, messages.internalServerError(responescode.internalServerError)
    );
  }
};
