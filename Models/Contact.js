const mongoose =  require("mongoose");

const contactSchema  =  new mongoose.Schema({
     user: { type: String, required: true},
    _id : mongoose.Schema.Types.ObjectId,
    Group: { type: String, required: true}, 
    fullname: { type: String, required: true}, 
    first_name: { type: String, required: true}, 
    occupation: { type: String, required: true}, 
    mobile_phone: { type: String, required: true}, 
    home_phone: { type: String, required: true}, 
    alternate_phone: { type: String, required: true}, 
    email: { type: String, required: true}, 
    date_met: { type: String, required: true}, 
    last_contact_date: { type: String, required: true}, 
    type_of_last_contact: { type: String, required: true}, 
    referral: { type: String, required: true}, 
    ask_referal: { type: String, required: true}, 
    mailing_address: { type: String, required: true}, 
    town_city: { type: String, required: true}, 
    state: { type: String, required: true}, 
    zipcode: { type: String, required: true}, 
    country: { type: String, required: true}, 
    married: { type: String, required: true}, 
    spouses_name: { type: String, required: true}, 
    spouse_email: { type: String, required: true}, 
    spouse_mobile: { type: String, required: true}, 
    children: { type: String, required: true}, 
    children_name: { type: String, required: true}, 
    pets: { type: String, required: true}, 
    pet_type_name: { type: String, required: true}, 
    social_media: { type: String, required: true}, 
    invited_to_connect: { type: String, required: true}, 
    invited_to_facebook: { type: String, required: true}, 
    createdAt: { type: Date, default: Date.now }
    

});

module.exports = mongoose.model('Contact',contactSchema);
