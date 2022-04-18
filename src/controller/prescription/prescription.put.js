const { Presciption } = require("../../model/prescription.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServicePrescription = require("../../service/mongoDbService")({ model: Presciption});

exports.presciptionPut = async (req, res) => {
  try {
    let { id } = req.params;
    let { doctor, patient, note, media } = req.body;
    let prescription = await mongoDbServicePrescription.getSingleDocumentById(id )
    if (!prescription) {
      return sendResponse(res, messages.notFound(responescode.notFound));
    }
   prescription = prescription.toJSON()
   prescription.doctor = doctor ? doctor: prescription.doctor
   prescription.patient = patient ? patient : prescription.patient
   prescription.note = note ? note : prescription.note
   prescription.media = media ? media : prescription.media

    let updatePrescription = await mongoDbServicePrescription.findOneAndUpdateDocument({ _id : id}, prescription, {new : true});
    if (updatePrescription) {
      return sendResponse(res, messages.successResponse(responescode.success, updatePrescription));
    } else {
      return sendResponse(res, messages.badRequest(responescode.badRequest));
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, messages.internalServerError(responescode.internalServerError));
  }
};
