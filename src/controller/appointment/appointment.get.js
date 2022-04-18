const { Appointment } = require('../../model/appointment.model');
const messages = require('../../utils/messegs');
const responescode = require('../../utils/responescode');
const {sendResponse } = require('../../helps/sendResponse');
const mongoDbServiceAppointment = require('../../service/mongoDbService')({model : Appointment})

exports.getAllappointment = async (req,res) => {
    try{
       let query = {};
       let {patient , doctor } = req.body;
          if  (doctor&& patient){
          return query = {patient, doctor};
          }
          else if(doctor) {
          return  query = {doctor};
          }
          else if(patient) {
          return query = {patient};
          }
           const select = ["doctor", "patient", "date", "address" ,"phone","message" ,"appointmentdate"]
           const populate =  [{ path: "doctor", select: "_id name"}, { path: "patient", select: "_id name email phone" } ];
           await mongoDbServiceAppointment.getDocumentByQueryPopulate(query, select, populate )
           .then((data) => {
             return sendResponse(res, messages.successResponse(responescode.success, data))
           })
           .catch((err) => {
             console.log(err);
             return sendResponse(res,messages.internalServerError(responescode.internalServerError));
           })
       } catch(err){
           console.log(err);
         return sendResponse(res, messages.internalServerError(responescode.internalServerError));
       }
   }
   
    

   exports.appointmentGetId = async (req, res) => {
    try {
      let { id } = req.params;
      const select = ["doctor", "patient", "date", "address" , "message", "appointmentdate"];
      const populate =  [{ path: "doctor", select: "_id name"}, { path: "patient", select: "_id name  email phone " } ];
      await mongoDbServiceAppointment.getSingleDocumentByIdPopulate(id, select, populate)
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
  

