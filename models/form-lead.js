const { default: mongoose } = require("mongoose");
const { string } = require("zod");


const FormLead = new mongoose.Schema({
    email : {
        type : String
    },
    ileads : [{
        firstName : {
            type : String,   
        },
        lastName : {
            type : String
        }, 
        mobileNo : {
            type : String
        },
        insuranceName : {
            type : String
        }
    }]
})

const InsuranceLead = mongoose.model('InsuranceLead', FormLead);

module.exports =  InsuranceLead;