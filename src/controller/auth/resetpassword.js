const { User } = require('../../model/user.model');
const bcrypt = require("bcrypt") 
const messages = require('../../utils/messegs')
const responescode = require('../../utils/responescode')
const { sendResponse } = require('../../helps/sendResponse');
const mongoDbServiceUser = require('../../service/mongoDbService')({ model : User})


exports.resetpassword =async (req,res) => {
    try{
       let {oldPassword, newPassword,email} = req.body;

       let user = await mongoDbServiceUser.getSingleDocumentByQuery({email});
       if (!user) {                                                     
        return sendResponse(res, messages.notFound(responescode.notFound));
       }
        let password = await bcrypt.compare(oldPassword, user.password)
        if(!password) return sendResponse(res, messages.badRequest(responescode.badRequest));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword,salt)
        user.save()
        .then((data) => {
            return sendResponse(res, messages.successResponse(responescode.success,data));
        })
        .catch((err) => {
            console.log(err);
            return sendResponse(res, messages.internalServerError(responescode.internalServerError));
        })
    }catch(err){
        console.log(err);
        return sendResponse(res, messages.internalServerError(responescode.internalServerError));
    }
}
