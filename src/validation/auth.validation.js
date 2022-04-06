const { body, header } = require('express-validator');

module.exports = {
    // POST  /auth/login
 login:[
    //  body('body.req' , ),
    body('email','Email is invalid').exists({checkFalsy:true}).isEmail(),
    body('password', 'Passwords must be at least 6 chars long').exists({checkFalsy:true})
 ],

 // POST  /auth/forget
 forgetPassword:[
     body("email","Email is required").exists().isEmail(),
     body('newpassword','passwords must be at least 6 chars long').exists({checkFalsy:true})
 ],

 //POST  /auth/resetpassword
 resetpassword:[
     body("email",'Email is required').exists().isEmail(),
     body('oldpassword', 'oldpassword is requires').exists()
 ]

}