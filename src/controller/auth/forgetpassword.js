const { User } = require("../../model/user.model");
const bcrypt = require("bcrypt");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");

exports.forgotpassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await mongoDbServiceUser.findExistsData({email});
    if (!user) {
      return sendResponse(res, messages.notFound(responescode.notFound));
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.save()
      .then((data) => {
        data = data.toJSON();
        sendResponse( res, messages.successResponse(responescode.success, { ...data, token }));
      })
      .catch((err) => {
        console.log(err);
        sendResponse(res, messages.internalServerError(responescode.notFound));
      });
  } catch (err) {
    console.log(err);
    sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
