var validator = require('validator');
const User = require("../Models/User");
const cloudImageModel  = require("../Models/cloudImageModel");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const  jwt = require('jsonwebtoken'); 
const cloudinary = require("../Utils/cloudinary");
const upload = require("../Utils/multer");

var randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.user_register = function(request,response){
  
       
           const email  = request.body.email; 
     
           if(validator.isEmail(email))
           {
               User.find({email :request.body.email})
               .exec()
               .then(function(results)
               {
                if(results.length >=1){
          
                      return  response.status(409).json({message :'Mail  Already  Exist'});
                }
                else{
                  //try sending a mail to check for validity 
                  // then save data upon OK response 

               
            let mailTransporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: process.env.USER_MAIL ,
                 pass: process.env.USER_PASSWORD
             }
            });
            
           let mailDetails = {
             from:  process.env. USER_MAIL ,
             to: email,
             subject: 'CRM APP',
             text:"Hi " + request.body.username + ","
                   + "\n"
                   +"Congratulations , Your registration for CRM APP was successfull" 
 
         };
           
         mailTransporter.sendMail(mailDetails, function(err, data) {
             if(err) {
                 console.log({error: err});
             } else {
                 console.log(data);
            // then register user contact to mongodb


            const hash = bcrypt.hashSync(request.body.password, saltRounds);
        
            const user = new User({
           
                _id: new mongoose.Types.ObjectId,
                 fullname: request.body.fullname,
                 username: request.body.username,
                 email : request.body.email,
                 password: hash,
                 phoneNumber : request.body.phoneNumber
                // userImageUrl: cloudResponse.avatar,
                // userImageCloudId: cloudResponse.cloudinary_id,
          
            });

            user.save()
            .then(function (results) {
              response.status(200).json({
                _id: results._id,
                fullname: results.fullname,
                username: results.username,
               email : results.email,
               password: results.password,
               phoneNumber : results.phoneNumber,
               createdAt :results.createdAt,
               status: "200"
  
              });
              console.log(results);
          })
            .catch(function (error) {
        
              return response.status(500).json({ error: error.message });
              console.log({error : error.message});
  
            });
          

             // Upload image to cloudinary
    
        // cloudinary.uploader.upload(request.file.path)
        // .then(function(x)
        // {
        //   // Create new userCloud
      
        //   const cloud = new cloudImageModel({
        //     name: request.body.name,
        //     avatar: x.secure_url,
        //     cloudinary_id: x.public_id,
        //   });

         
      



        //   // Save userImage to cloud
        //    cloud.save()
        //      .then(function(cloudResponse)
      
        //    {  // if image is saved,  then go check  the rsponse and get its url
         
        //    // response.status(200).json(cloudResponse);  
        //     if(cloudResponse)
            
        //       {   

        //         const hash = bcrypt.hashSync(request.body.password, saltRounds);
        //         // console.log({body: request.body.userId})
        //         const user = new User({
               
        //             _id: new mongoose.Types.ObjectId,
        //              fullname: request.body.fullname,
        //              username: request.body.username,
        //              email : request.body.email,
        //              password: hash,
        //              phoneNumber : request.body.phoneNumber
        //             // userImageUrl: cloudResponse.avatar,
        //             // userImageCloudId: cloudResponse.cloudinary_id,
              
        //         });
              
        //         user.save()
        //           .then(function (results) {
        //             response.status(200).json({
        //               _id: results._id,
        //               fullname: results.fullname,
        //               username: results.username,
        //              email : results.email,
        //              password: results.password,
        //              phoneNumber : results.phoneNumber,
        //              userImageUrl: results.userImageUrl,
        //              userImageCloudId: results.userImageCloudId,
        //              createdAt :results.createdAt,
        //              status: "200"
  
        //             });
        //             console.log(results);
        //         })
        //           .catch(function (error) {
              
        //             return response.status(500).json({ error: error.message });
        //             console.log({error : error.message});
      
        //           });
              
              
        //       }
        //       else {
        //         response.status(501).json({error : error.message});
        //         console.log({error : error.message});
      
        //       }
      
        //     })
        //     .catch(function (error) {
              
        //       return response.status(502).json({ error: error.message });
        //       console.log({error : error.message});
      
        //     });
        // })
        // .catch((error) => {
        //   response.status(503).send({
        //     message: "failed",
        //     error,
        //   }); 
        // });   
            

             }
         });
 
                }
               })
               .catch();
           }
           else{
            response.status(504).json({message: "Email is invalid"});
           }
 
 
    }
   
    
exports.user_login = function(request,response){
     //Todo check verification for user before loging in
  const username  = request.body.username;
  const password  =  request.body.password;

  User.find({username: username})
  .exec()
  .then(function(data)
   {   
      if(data.length < 1){
        return response.status(401).json({message :  'Auth failed'});
      }
      else {
              
                bcrypt.compare(password, data[0].password,function(err,result){
                  if(!result)
                  {
                    return response.status(401).json({message : 'Auth failed'});
                  }
                 if(result)
                 {
                     
                     const token =  jwt.sign({
                         email : data[0].email,
                         userId : data[0]._id
                     }
                     ,process.env.TOKEN_KEY,
              
                    {expiresIn : "1h"} )
                     

                      const responseObject = {messgage: "AUTH SUCCESFUL",
                       token : token,
                       userId:data._id,
                       cheker : "OK",
                      status : "200"
                  }
                  
                 response.status(200).json(responseObject)              
  
                 }
               
              });
              }
      
  })
  .catch(function (error){
        response.status(500).json({error:error});

    });

   
  }
     
  exports.user_forgot_password = function(request,response)
  {
      
      const username  = request.body.username ;

      const resetToken =  randomstring.generate(12);

      mongoose.set('returnOriginal', false);
      User.findOneAndUpdate({username:username },{ resetPasswordToken : resetToken},{useFindAndModify:false})
      .exec()
      .then(function (results) {
           //Todo send a mail to the email of user using node mailer

          
  
       let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env. USER_MAIL ,
            pass: process.env. USER_PASSWORD
        }
    });
      
    let mailDetails = {
        from:  process.env. USER_MAIL ,
        to: results.email,
        subject: ' Password Reset for CRM APP' ,
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +  
        'Please copy, or paste this code to  complete the process:\n\n' +  
        results.resetPasswordToken + '\n\n' +  
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log({error: err});
        } else {
          const responseObject = {sentToken: results.resetPasswordToken,
            detail :{
               message  : " An e-mail has been sent to " + results.email + " with further instructions.'",
                 status : "200"
            }
         }  
         response.status(200).json(responseObject)  
          //  console.log(results);
               
        }
    });
      
      })
      .catch(function(error)
      {
        response.status(506).json({error:error.message});
       });

  }
  
  



  exports.user_reset_password = function(request,response)
  {
        
     const username  = request.body.username;
     const newPassword = request.body.newPassword;
     const sentToken =  request.body.verificationCode;

     User.findOne({username : username})
     .exec()
     .then(function(results){
        //return  response.status(200).json({result: results})
            
         if(results) 
         {       
               if(sentToken == results.resetPasswordToken )
               {
                
                const hash = bcrypt.hashSync(newPassword, saltRounds);

                 User.findOneAndUpdate({'email' :results.email},{ 'password' : hash},{returnOriginal: false ,useFindAndModify:false})
                 .then(function(results){
                  if(!results){
                    return response.status(400).send({
                      error: "email does not exist"
                    })
                  }
                  
                  const responseObject = {messgage: " SUCCESFUL", status : "200",detail:results}
                                               
                  response.status(200).json(responseObject)       
                      }
                  )
                 .catch(function(error){
                  response.status(404).json({error: error.message})
                                        });
               }

               else{
                 console.log(key,ID,pin)
                 return  response.status(509).json({mesage : "Authentication Failed"});
                

               }
           }
       else{
            return  response.status(404).json({mesage : "Username does  not exist"});
       }
       

     })
     .catch(function(error){
       console.log(error);
       response.status(500).json({error:error.message});
   
       });


  
  }