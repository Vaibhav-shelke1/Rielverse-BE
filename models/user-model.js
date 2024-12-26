const mongoose = require('mongoose');

// Create a schema for User
const userSchema = new mongoose.Schema({
    organizationRole: {
        type: String
    },
    insuranceRole: {
        type: String
    },
    reportsTo: {
        type: String
    },
    title: {
        type: String
    },
    fullName: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String,
        required: true,        
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    maritalStatus: {
        type: String
    },
    pincode: {
        type: String
    },
    aadharNumber: {
        type: String
    },
    panNumber: {
        type: String
    },
    licenseNumber: {
        type: String
    },
    username: {
        type: String,
        required: true       
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
