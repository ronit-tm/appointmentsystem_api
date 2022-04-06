const { Appointment } = require('../../model/appointment.model');
const bcrypt = require("bcrypt");
const messages = require('../../utils/messegs');
const responescode = require('../../utils/responescode');
const { sendResponse } = require('../../helps/sendResponse');
const { User } = require('../../model/user.model')
const mongoDbServiceAppointment = require('../../service/mongoDbService')({model: Appointment});
const mongoDbServiceuser = require("../../service/mongoDbService")({model: User});
const { Category} = require('../../model/categroy.model')
const mongoDbServiceCategroy = require("../../service/mongoDbService")({ model: Category});


exports.appointmentPost = async(req,res) => {
  try {
    let { role, name,appointmentdate, email, phone,password  , doctor , message } = req.body;
    console.log('req.body: ', req.body);
    let user = await mongoDbServiceuser.getSingleDocumentByQuery({email})  
    
  console.log("user",user);
  if (user) { 
  
  let appointmentData = {
     doctor,
     patient: user._id,
     appointmentdate ,
     message
    }
  let createAppointment = await mongoDbServiceAppointment.createDocument(appointmentData);
   let createdAppointment = await mongoDbServiceAppointment.getSingleDocumentByIdPopulate(
    createAppointment._id ,
     ["_id","doctor","patient", "appointmentdate","applyDate","message"],
    [ {path : "doctor" , select : "_id name email phone address"} , 
    {path: "patient" , select : "_id name email phone"}]
    )
      return sendResponse(res, messages.successResponse(responescode.success, createdAppointment));
    } else {
      if(password){
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
      }
    let userData = {
      role: role,
      password, 
      name,
      email,
      phone,
    }
    let createdUser = await mongoDbServiceuser.createDocument(userData)
    console.log(createdUser);
    let appointmentData = {
      doctor,
      patient: createdUser._id,
      appointmentdate,
      message
    }
    let createdAppointment = await mongoDbServiceAppointment.createDocument(appointmentData);
    createdAppointment = await mongoDbServiceAppointment.getSingleDocumentByIdPopulate(
      createdAppointment._id ,
       ["_id","doctor","patient","appointmentdate","applyDate","message"],
      [ {path : "doctor" , select : "_id name email phone address "} , 
    {path: "patient" , select : "_id name email phone message"}]
    )
    return sendResponse( res, messages.successResponse(responescode.success,createdAppointment));
    }
  } catch (error) {
    console.log(error);
    return sendResponse( res, messages.internalServerError(responescode.internalServerError)
    );
  }
};
