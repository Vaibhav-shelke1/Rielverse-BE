const User = require("../models/master-model");
const axios = require('axios');
// const bcrypt = require('bcrypt');

const organizationRoleInsert = async(req,res)=>{
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const { roleName } = req.body;        
        const existingRole = await OrganizationRole.findOne({ name: roleName });
        if (existingRole) {
            return res.status(400).json({ message: 'Organization role with this name already exists' });
        }        
        const newRole = new OrganizationRole({ name: roleName });
        await newRole.save();
        res.status(201).json({ message: 'Organization role created successfully', role: newRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const InsuranceRoleInsert = async (req,     res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      const { name } = req.body;      
      const existingRole = await InsuranceRole.findOne({ name });
      if (existingRole) {
        return res.status(400).json({ message: 'Role with this name already exists' });
      }        
      const newRole = new InsuranceRole({ name });      
      await newRole.save();  
      res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const getorganizationRole = async(req,res)=>{
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const roles = await organizationRole.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getInsuranceRole = async(req,res)=>{
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const roles = await insuranceRole.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getcmotor= async(req,res)=>{
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
         // Define the base URL of the API
        const baseUrl = 'https://grandiosesg-sandbox-sg.insuremo.com';
      // Append the endpoint to the base URL
        const apiUrl = `${baseUrl}/cas/ebao/v2/json/tickets`;
      // Data to be sent in the request body
        const requestData = {
            username: 'Grandiose.User',
            password: 'Grandiose@1234'
        };  
        // Make a POST request to the API with data in the request body

        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'x-mo-client-id':"key",
                'x-mo-tenant-id':"grandiosesg",
                'x-mo-user-source-id':"platform",
            }
        });
        const apiMasterUrl = `${baseUrl}/api/platform/dd/code/cache/v1/record/list/byName?name=VPC_VehicleMaster`;
        const responseMaster = await axios.post(apiMasterUrl,requestData,  {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${response.data.access_token}`
            }
          });
          res.status(200).json(responseMaster.data);
    }catch(error){
        console.error('Error fetching data:', error);
        res.status(500).json({ message: "Error fetching insurance Master", error: error.message });
    }
}
const getUserList = async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  }
module.exports = {organizationRoleInsert,InsuranceRoleInsert,getorganizationRole,getInsuranceRole,getcmotor,getUserList};