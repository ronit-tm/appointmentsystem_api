const { User } = require("../../model/user.model");
const bcrypt = require("bcrypt");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServiceUser = require("../../service/mongoDbService")({model : User})

exports.PostAuthlogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await mongoDbServiceUser.getSingleDocumentByQuery({email});
    if (!user) {
      return sendResponse(res, messages.notFound(responescode.notFound));
    }
    let valipassword = await bcrypt.compare(password.toString(), user.password);
    if (!valipassword) {
      return sendResponse(res, messages.conflict(responescode.badRequest));
    }
    const token = user.generateAuthToken();
    user = user.toJSON();
    delete user.__v

    return sendResponse(res, messages.successResponse(responescode.success, { ...user, token })
    );
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError)
    );
  }
};
