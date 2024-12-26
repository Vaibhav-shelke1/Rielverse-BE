const mongoose = require('mongoose');
const { string } = require('zod');

const otpVerificationSchema = new mongoose.Schema({
    email : {
        type : String,
    },
    otp : {
        type : String
    },
    createdAt : {
        type : Date,
    },
    expiredAt : {
        type : Date
    }
});

const UserOTPVerification = mongoose.model("UserOTPVerification", otpVerificationSchema);

module.exports = UserOTPVerification;