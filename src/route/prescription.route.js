const express = require('express');
const route = express.Router();
const prescriptionget = require('../controller/prescription/prescription.get');
const presciptionpost = require('../controller/prescription/prescription.post');
const presciptionput = require('../controller/prescription/prescription.put');
const presciptiondelete =require('../controller/prescription/prescription.delete');
const validate = require('../validation/header');
const rules = require('../validation/prescription.validation')
const { auth } = require("../middleare/auth");

route.get('/', validate(rules.prescriptionget) , prescriptionget.getAllpresciption);
route.post('/', validate(rules.prescriptionpost) , presciptionpost.presciptionPost);
route.put('/:id',auth, validate(rules.prescriptionput) , presciptionput.presciptionPut);
route.delete('/:id', auth, validate(rules.prescriptiondelete) , presciptiondelete.presciptiondelete);


module.exports = route