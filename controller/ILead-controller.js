
const InsuranceLead = require("../models/form-lead");


async function createILead(req, res){
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST'); // Allow POST method
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        const { email, firstName, lastName, mobileNo, insuranceName } = req.body;
        const leadData = { firstName, lastName, mobileNo, insuranceName};
        
        const user = await InsuranceLead.findOne({ email });

        if (user) {
            const pushedLeadToUser = await InsuranceLead.findOneAndUpdate(
                { email },
                { $push: { ileads: leadData } },
                { new: true }
            );
            return res.status(200).json({
                msg: "New lead created",
                result: true
            });
        } else {
            const newUser = await InsuranceLead.create({
                email,
                ileads: [leadData]
            });
            return res.status(200).json({
                msg: "Lead created successfully",
                result: true
            });
        }
    } catch (e) {
        return res.status(400).json({
            error: "Error while creating lead: " + e.message
        });
    }
}

async function getAllILeads(req, res){
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const allLeads = await InsuranceLead.find();
        return res.status(200).json({
            data : allLeads,
            result : true
        })
    }
    catch(e){
        return res.status(400).json({
            error : "error while fetching all leads" + e.message,
            result : false
        })
    }
}

module.exports = {createILead, getAllILeads};