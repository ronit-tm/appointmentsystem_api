const { Presciption } = require("../../model/prescription.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServicePrescription = require("../../service/mongoDbService")({model: Presciption});

exports.presciptionPost = async (req, res) => {
  try {
    let { doctor, patient, note, media } = req.body;
    let presciption = {
      doctor,
      patient,
      date : new Date(),
      note, 
      media,
    };
    let createPrescription = await mongoDbServicePrescription.createDocument( presciption );
    if (createPrescription) {
      createPrescription = createPrescription.toJSON();
   delete createPrescription.__v
      return sendResponse(res, messages.successResponse(responescode.success, createPrescription));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
    
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
