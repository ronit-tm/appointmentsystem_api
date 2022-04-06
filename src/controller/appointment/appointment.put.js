const { Appointment } = require('../../model/appointment.model');
const messages = require('../../utils/messegs')
const responescode = require('../../utils/responescode')
const { sendResponse} = require('../../helps/sendResponse');
const mongoDbServiceAppointment = require('../../service/mongoDbService')({model : Appointment})

exports.appointmentPut = async(req,res) => {
    try{
        let {id} = req.params
        let {doctor,patient,address, phone} = req.body

      let appointment = await mongoDbServiceAppointment.getSingleDocumentById(id);
      if(!appointment){
        return sendResponse( res, messages.unAuthorizedRequest(responescode.unAuthorizedRequest));
      }
      appointment = appointment.toJSON()
      appointment.doctor = doctor ? doctor : appointment.doctor
      appointment.patient = patient ? patient : appointment.patient
      appointment.address = address ? address : appointment.address
      appointment.phone = phone ? phone : appointment.phone

      let putappointment = await mongoDbServiceAppointment.findOneAndUpdateDocument({_id : id}, appointment , 
        {new : true});
         if(putappointment){
           return sendResponse(res, messages.successResponse(responescode.success, putappointment)) 
         } else {
           return sendResponse(res, messages.badRequest(responescode.badRequest))
         }
    } catch(err){
      console.log(err);
      return sendResponse(res, messages.internalServerError(responescode.internalServerError));
    }
  
}