const { Appointment } = require('../../model/appointment.model');
const messages = require('../../utils/messegs')
const responescode = require('../../utils/responescode')
const { sendResponse } = require('../../helps/sendResponse');
const mongoDbServiceAppointment = require('../../service/mongoDbService')({model : Appointment})

exports.deleteappointment = async(req,res) => {
    try{
        let {id} = req.params
      let appointmentdelete = await mongoDbServiceAppointment.deleteDocument(id);
      if(appointmentdelete){
        return sendResponse(res, messages.successResponseMessage(responescode.success, "data successfull delete"));
      } else {
        return sendResponse(res, messages.badRequest(responescode.badRequest))
      }
    }catch(err){
        console.log(err);
      return sendResponse(res, messages.internalServerError(responescode.internalServerError, err.messages));
    }
}