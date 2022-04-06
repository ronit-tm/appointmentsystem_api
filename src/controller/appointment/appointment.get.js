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
           const select = ["doctor", "patient", "date", "address" ,"phone"]
           await mongoDbServiceAppointment.getDocumentByQuery(query, select )
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
      const select = ["doctor", "patient", "date", "address"];
      await mongoDbServiceCategroy.getDocumentById(id, select)
        // await  Category.findById(id)
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
  

