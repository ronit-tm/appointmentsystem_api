const messages = module.exports = {};

messages.successResponse = (statusCode,data) => ({
  "Content-Type": "application/json",
  statusCode,
  data: {
    status: "SUCCESS",
    message: "Your request is successfully executed",
     data

  },
});

messages.successResponseMessage = (statusCode,data) => ({
  "Content-Type": "application/json",
  statusCode,
  data: {
    status: "SUCCESS",
    message: data,
     data: {}

  },
});

messages.notFound = (statusCode, error) => ({
    "Content-Type" : "application/json",
    statusCode,
    data:{
        status: "NOT FOUND",
        messages:"Requested data can not found",
        data:{}
    },
});

messages.internalServerError = (statusCode, data) => ({         
  "Content-Type" : "application/json",
  statusCode,
  data:{
      status: "internal server error ",
      messages: "Something went wrong!",
      data:{}
  },
});

messages.badRequest = (statusCode, data) => ({         
  "Content-Type" : "application/json",
  statusCode,
  data:{
      status: "bad Request ",
      messages:"Requested data are invalid",
      data:{}
  },
});

messages.unAuthorizedRequest = (statusCode, data) => ({         
  "Content-Type" : "application/json",
  statusCode,
  data:{
      status: "unAuthorizedRequest ",
      messages:"You are not authorise to use this",
      data:{}
  },
});

messages.conflict = (statusCode, data) => ({         
  "Content-Type" : "application/json",
  statusCode,
  data:{
      status: "conflict",
      messages:"Requsted data are already associated with other data",
      data:{}
  },
});

messages.validationError = (statusCode, data) => ({         
  "Content-Type" : "application/json",
  statusCode,
  data:{
      status: "validationError ",
      messages:"validation error ",
      data:{}
  },
});
