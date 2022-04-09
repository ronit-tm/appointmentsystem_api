const { Presciption } = require("../../model/prescription.model");
const messages = require("../../utils/messegs");
const responescode = require("../../utils/responescode");
const { sendResponse } = require("../../helps/sendResponse");
const mongoDbServicePrescription = require("../../service/mongoDbService")({model: Presciption });

exports.getAllpresciption = async (req, res) => {
  try {
    let query = {};
    let { patient, doctor } = req.body;
    if (doctor && patient) {
      return (query = { patient, doctor });
    } else if (patient) {
      return (query = { patient });
    } else if (doctor) {
      return (query = { doctor });
    }
    let getPresciption = await mongoDbServicePrescription.getDocumentByQuery(query);;
    if (!getPresciption) {
      return sendResponse(res, messages.notFound(responescode.notFound));
    }
    const select = ["doctor", "patient", "note", "date", "media"];
    await mongoDbServicePrescription.getDocumentByQuery(query, select)
      .then((data) => {
        return sendResponse(res, messages.successResponse(responescode.success, data));
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



exports.prescriptionGetId = async (req, res) => {
  try {
    let { id } = req.params;
    const select = ["doctor", "patient", "note", "date", "media"];
    await mongoDbServicePrescription.getSingleDocumentById (id, select)
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
