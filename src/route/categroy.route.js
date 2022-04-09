const express = require('express');
const router = express.Router();
const categoryget = require('../controller/categroy/category.get');
const categorypost =require('../controller/categroy/category.post');
const categoryput = require('../controller/categroy/category.put');
const categorydelete = require('../controller/categroy/category.delete');
const categorygetid = require('../controller/categroy/category.get');
const validate = require('../validation/header');
const rules = require('../validation/categroy.validation')
const { auth } = require("../middleare/auth");

router.get('/', validate(rules.categoryget) , categoryget.getAllcategroy);
router.post('/', validate(rules.categorypost) , categorypost.categoryPost);
router.put('/:id', auth, validate(rules.categroyput) , categoryput.categoryPut);
router.delete('/:id', auth, validate(rules.categroydelete) , categorydelete.categoryDelete);
router.get('/:id', auth, validate(rules.categoryget) , categorygetid.categoryGetId);


module.exports = router

