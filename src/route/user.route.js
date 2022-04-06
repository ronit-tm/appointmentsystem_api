const express = require('express');
const router = express.Router();
const userGet = require('../controller/users/user.get');
const userPost = require('../controller/users/user.post');
const userPut = require('../controller/users/user.put');
const userDelete = require('../controller/users/user.delete');
const usergetone = require('../controller/users/user.get');

const validate = require('../validation/header');
const rules = require('../validation/user.validation');
const { auth } = require("../middleare/auth");

// router.use(auth);
router.get('/',  validate(rules.userget) , userGet.getUser);
router.post('/', validate(rules.userpost) , userPost.postUser);
router.get ('/get-doctor' , userGet.getDoctor)
router.put('/:id',auth, validate(rules.userput) , userPut.putUser);
router.delete('/:id',auth, validate(rules.userdelete) , userDelete.deleteUser);
router.get('/:id', auth, validate(rules.userget) , usergetone.getoneUser);


module.exports = router;
