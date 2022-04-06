const sendResponse = (res, a) => {
  return res.set(a.header).status(a.statusCode).send(a.data);
};
exports.sendResponse = sendResponse;
