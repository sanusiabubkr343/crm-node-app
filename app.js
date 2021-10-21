const express  = require('express');
const  http = require("http"); 
const  logger = require("morgan"); 
const cors = require('cors');
const mongoose = require('mongoose');
const  userRoutes = require ('./Routes/User');
const  contactRoutes = require ('./Routes/Contact');


const dotenv = require("dotenv");
dotenv.config(); 


 const app =  express();

// //middle wear 

 app.use(logger("dev"));
 app.use(cors());

// // for body parsers
 app.use(express.json());
 app.use(express.urlencoded({extended: false}));



 mongoose.connect('mongodb+srv://anova_96:'+process.env.MONGO_ATLAS_PW+'@cluster0.phpey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true ,  useUnifiedTopology: true 
}).then(() => {
    console.log('connected to db')
}).catch(err => {
    console.log('couldnt connect to db', err)
})

app.use('/user',userRoutes);
app.use('/contact',contactRoutes);


app.use('*',function(request,response)
{
    response.status(200).json({message:" CRM API is working , but routes not defined"});
});





//serverListener
http.createServer(app).listen(process.env.PORT || 3000);
