const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    dateofbirth: String,
    phoneNumber: Number,
    email: String
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;