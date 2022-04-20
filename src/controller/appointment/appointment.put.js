const { Appointment } = require('../../model/appointment.model');
const messages = require('../../utils/messegs')
const responescode = require('../../utils/responescode')
const { sendResponse} = require('../../helps/sendResponse');
const mongoDbServiceAppointment = require('../../service/mongoDbService')({model : Appointment})

exports.appointmentPut = async(req,res) => {
    try{
        let {id} = req.params
        let {doctor, phone, message} = req.body
        console.log('req.body: ', req.body);

      let appointment = await mongoDbServiceAppointment.getSingleDocumentById(id);
      if(!appointment){
        return sendResponse( res, messages.unAuthorizedRequest(responescode.unAuthorizedRequest));
      }
      appointment = appointment.toJSON()
      appointment.doctor = doctor ? doctor : appointment.doctor
      appointment.phone = phone ? phone : appointment.phone
      appointment.message = message ? message : appointment.message

      let updateAppointment = await mongoDbServiceAppointment.findOneAndUpdateDocument({_id : id}, appointment , 
        {new : true});
       
         if(updateAppointment){
          console.log("cdkcnd : ",updateAppointment);
           updateAppointment = updateAppointment.toJSON()
           delete updateAppointment.__v
           return sendResponse(res, messages.successResponse(responescode.success, updateAppointment)) 
         } else {
           return sendResponse(res, messages.badRequest(responescode.badRequest))
         }
    } catch(err){
      console.log(err);
      return sendResponse(res, messages.internalServerError(responescode.internalServerError));
    }
  
}