const mongoose = require("mongoose");
const User = require("../Models/User");
const Contact = require("../Models/Contact");


exports.contact_post = function (request, response) {
  //  response.status(200).json({message:"POST WORK"})
  User.find({ _id:request.body.user })
    .exec()
    .then(function (data) {

      const contact = new Contact({
        _id: new mongoose.Types.ObjectId,
        user: request.body.user,
        Group: request.body.Group,
        fullname: request.body.fullname,
        first_name: request.body.first_name,
        occupation: request.body.occupation,
        mobile_phone: request.body.mobile_phone,
        home_phone: request.body.home_phone,
        alternate_phone: request.body.alternate_phone,
        email: request.body.email,
        date_met: request.body.date_met,
        last_contact_date: request.body.last_contact_date,
        type_of_last_contact: request.body.type_of_last_contact,
        referral: request.body.referral,
        ask_referal: request.body.ask_referal,
        mailing_address: request.body.mailing_address,
        town_city: request.body.town_city,
        state: request.body.state,
        zipcode: request.body.zipcode,
        country: request.body.country,
        married: request.body.married,
        spouses_name: request.body.spouses_name,
        spouse_email: request.body.spouse_email,
        spouse_mobile: request.body.spouse_mobile,
        children: request.body.children,
        children_name: request.body.children_name,
        pets: request.body.pets,
        pet_type_name: request.body.pet_type_name,
        social_media: request.body.social_media,
        invited_to_connect: request.body.invited_to_connect,
        invited_to_facebook: request.body.invited_to_facebook,
       


      });


      contact.save()
        .then(function (results) {


          console.log({"results":results});

          return response.status(200).json({
            _id: results._id,
            user: results.user,
            Group: results.Group,
            fullname: results.fullname,
            first_name: results.first_name,
            occupation: results.occupation,
            mobile_phone: results.mobile_phone,
            home_phone: results.home_phone,
            alternate_phone: results.alternate_phone,
            email: results.email,
            date_met: results.date_met,
            last_contact_date: results.last_contact_date,
            type_of_last_contact: results.type_of_last_contact,
            referral: results.referral,
            ask_referal: results.ask_referal,
            mailing_address: results.mailing_address,
            town_city: results.town_city,
            state: results.state,
            zipcode: results.zipcode,
            country: results.country,
            married: results.married,
            spouses_name: results.spouses_name,
            spouse_email: results.spouse_email,
            spouse_mobile: results.spouse_mobile,
            children: results.childrenr,
            children_name: results.children_name,
            pets: results.pets,
            pet_type_name: results.pet_type_name,
            social_media: results.social_media,
            invited_to_connect: results.invited_to_connect,
            invited_to_facebook: results.invited_to_facebook,
            createdAt: results.createdAt
           });

        })
        .catch(function (error) {
          console.log({ error: error.message });

          return response.status(500).json({ error: error.message });

        })



    })
    .catch(function (error) {
      response.status(404).json({ error:error.message });
      console.log({ error: error.message });

    });


}
exports.contact_get = function (request, response) {
  // response.status(200).json({message:"GET WORK"})

  Contact.find({ user: request.params.userId })
    .exec()
    .then(function (results) {
      response.status(200).json({ message: "OK", result: results });
    })
    .catch(function (error) {
      response.status(404).json({ error: "User details not  found or user does not exist" });
      console.log({ error: error.message });

    });

}


exports.contact_update = function (request, response) {
  // response.status(200).json({message:"UPDATE WORK"})

  const newObject = {
    Group: request.body.Group,
    fullname: request.body.fullname,
    first_name: request.body.first_name,
    occupation: request.body.occupation,
    mobile_phone: request.body.mobile_phone,
    home_phone: request.body.home_phone,
    alternate_phone: request.body.alternate_phone,
    email: request.body.email,
    date_met: request.body.date_met,
    last_contact_date: request.body.last_contact_date,
    type_of_last_contact: request.body.type_of_last_contact,
    referral: request.body.referral,
    ask_referal: request.body.ask_referal,
    mailing_address: request.body.mailing_address,
    town_city: request.body.town_city,
    state: request.body.state,
    zipcode: request.body.zipcode,
    country: request.body.country,
    married: request.body.married,
    spouses_name: request.body.spouses_name,
    spouse_email: request.body.spouse_email,
    spouse_mobile: request.body.spouse_mobile,
    children: request.body.childrenr,
    children_name: request.body.children_name,
    pets: request.body.pets,
    pet_type_name: request.body.pet_type_name,
    social_media: request.body.social_media,
    invited_to_connect: request.body.invited_to_connect,
    invited_to_facebook: request.body.invited_to_facebook
  }

  mongoose.set('returnOriginal', false);
  Contact.findByIdAndUpdate(request.body._id, newObject, { useFindAndModify: false })
    .exec()
    .then(function (results) {
      const responseObject = {
        thought: results,
        detail: {
          type: "UPDATE",
          updated_Id: results._id
        }
      }
      response.status(200).json(responseObject)
    })
    .catch(function (error) {
      response.status(500).json({ error: error.message })
    });




}


exports.contact_delete = function (request, response) {

  //response.status(200).json({message:"DELETE WORK"})

  Contact.findByIdAndDelete(request.body._id)
    .exec()
    .then(function (results) {
      const responseObject = {
        detail: {
          status: "OK",
          type: "DELETE",
          deleted_Id: results._id
        }
      }

      response.status(200).json(responseObject)
    })
    .catch(function (error) {
      console.log(error)
      response.status(500).json({ error: error });

    });
}