const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Lead = require("../models/lead-model");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const UserOTPVerification = require('../models/otpverification-model');

let transporter = nodemailer.createTransport({
    service : "gmail",
    secure : true,
    port : 465,
    auth : {
        user : "OTPrielverse@gmail.com",
        pass : "ymgnaljwgigunnpm"
    }
})



async function createLead(req, res) {
    try {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Destructure email and other relevant data from the request body
        const { email, carBrand, carModel, carYear, engineSize, suminsuredValue, provinceCity } = req.body;

        // Create lead data object
        const leadData = {
            carBrand,
            carModel,
            carYear,
            engineSize,
            suminsuredValue,
            provinceCity
        };

        // Find if the user already exists
        let user = await Lead.findOne({ email });

        if (user) {
            // Update existing user with new lead data
            user.leads.push(leadData);
            await user.save();

            // Get the _id of the last lead in the array (assuming it's the newly added one)
            const leadId = user.leads[user.leads.length - 1]._id;

            // Send success response with lead _id
            return res.status(200).json({
                msg: "Lead created successfully",
                result: true,
                leadId: leadId // Send back the _id of the created lead object
            });
        } else {
            // Create a new user with lead data
            user = await Lead.create({
                email,
                leads: [leadData]
            });

            // Send success response with user _id
            return res.status(200).json({
                msg: "Lead created successfully",
                result: true,
                leadId: user.leads[0]._id // Send back the _id of the created lead object
            });
        }
    } catch (e) {
        // Handle errors
        console.error("Error while creating lead:", e);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}



async function updateLead(req, res) {
    const { engineValue, suminsuredValue, leadId, email } = req.body;

    try {
        // Find the user by email
        const user = await Lead.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the lead by leadId in the user's leads array
        console.log(user);
        const leadToUpdate = user.leads.find(lead => lead._id.toString() === leadId);

        if (!leadToUpdate) {
            return res.status(404).json({ error: "Lead not found" });
        }

        // Update lead properties
        leadToUpdate.engineSize = engineValue;
        leadToUpdate.suminsuredValue = suminsuredValue;

        // Save the updated user document
        await user.save();

        return res.status(200).json({
            msg: "Lead updated successfully",
            updatedLead: leadToUpdate
        });

    } catch (error) {
        console.error("Error updating lead:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}




async function getAllLeads(req, res){
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        const allLeads = await Lead.find();
        return res.status(200).json({
            data : allLeads,
            result : true
        })
    }
    catch(e){
        return res.status(400).json({
            error : "error while fetching all leads"+ e.message,
            result : false
        })
    }
};


async function sendOTPVerificationEmail(req, res){
    const {email} = req.body;
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from : "otp@rielverse.com",
            to : email,
            subject : "Email Verification Code",
            html : `<p>Use this code <b>${otp}</b> to verify</p>
            <p>This code <b>expires in 2 minutes</b></p>`
        };
        // hashing the otp
        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        await UserOTPVerification.create({
            email : email,
            otp : hashedOtp,
            createdAt : Date.now(),
            expiredAt : Date.now() + 300000
        })
        await transporter.sendMail(mailOptions);
        res.json({
            status : "pending",
            message : "verification otp main sent",
            data : {
                email : email
            }
        })
    }
    catch(e){
        res.json({
            status : "failed",
            message : e
        })
    }
}

async function verifyOTP(req, res) {
    try {
        const { email, otp } = req.body;
        const userOtpVerification = await UserOTPVerification.findOne({ email });
        if (!userOtpVerification) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid email"
            });
        }

        const isOtpValid = await bcrypt.compare(otp, userOtpVerification.otp);

        if (!isOtpValid) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid or expired OTP"
            });
        }
        await UserOTPVerification.deleteOne({ email });

        return res.status(200).json({
            status: true,
            message: "OTP verified successfully",
            data: { email }
        });
    } catch (e) {
        return res.status(400).json({
            status: false,
            message: e.message
        });
    }
}


async function resendOTP(req, res) {
    try {
        const { email } = req.body;

        // Check if user exists
        const userOtpVerification = await UserOTPVerification.findOne({ email });

        if (!userOtpVerification) {
            return res.status(400).json({
                status: false,
                message: "Invalid email"
            });
        }

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: "otp@rielverse.com",
            to: email,
            subject: "Email Verification Code",
            html: `<p>Use this code <b>${otp}</b> to verify</p>
                   <p>This code <b>expires in 2 minutes</b></p>`
        };

        // Hashing the OTP
        const saltRounds = 10;
        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        await UserOTPVerification.updateOne(
            { email: email },
            { otp: hashedOtp, createdAt: Date.now(), expiredAt: Date.now() + 300000 } // 5 minutes
        );

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            status: "pending",
            message: "Verification OTP resent",
            data: { email }
        });
    } catch (e) {
        return res.status(400).json({
            status: false,
            message: e.message
        });
    }
}



module.exports = {createLead, getAllLeads, sendOTPVerificationEmail, verifyOTP, resendOTP, updateLead};