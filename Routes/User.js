const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");
const upload = require("../Utils/multer");




    //router.post('/register',upload.single('userImage'),userController.user_register);
    router.post('/register',userController.user_register);
    
    router.post('/login', userController.user_login)
   
     router.post('/forgot_password',userController.user_forgot_password);
     
     router.post('/confirm_new_password',userController.user_reset_password); //verifying the token sent, so as to update new password


   




module.exports = router;
