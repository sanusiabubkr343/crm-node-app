const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/Contact");
;




    //router.post('/register',upload.single('userImage'),userController.user_register);
    router.post('/post_contact',contactController.contact_post);
    
    router.get('/get_contact',  contactController.contact_get)
   
     router.patch('/update_contact', contactController.contact_update);
     
     router.delete('/delete_contact', contactController.contact_delete); //verifying the token sent, so as to update new password


   




module.exports = router;
