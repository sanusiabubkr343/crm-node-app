const mongoose =  require("mongoose");

const userSchema  =  new mongoose.Schema({
   _id : mongoose.Schema.Types.ObjectId,
   fullname: { type: String, required: true, unique: true }, 
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true}, 
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true}, 
    userImageUrl :  {type :String ,required : true},
    userImageCloudId : {type :String ,required : true},
    resetPasswordToken :  {type :String },
    createdAt:   { type: Date, default: Date.now },
    

});

module.exports = mongoose.model('User',userSchema);
