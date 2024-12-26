const User = require("../models/user-model");
// const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // If email and password are valid, return user data (excluding password)
        res.status(200).json({ data:user });
    } catch (error) {
        res.status(400).json({ error: error.message }); // Return error message
    }
}

const register = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const { username, email, organizationRole, insuranceRole, reportsTo, title, fullName, dateOfBirth, phoneNumber, maritalStatus, pincode, aadharNumber, panNumber, licenseNumber, password, confirmPassword } = req.body;
        // Check if the email is already in use
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Create the new user
        const newUser = await User.create({ 
            username, 
            email, 
            organizationRole, 
            insuranceRole, 
            reportsTo, 
            title, 
            fullName, 
            dateOfBirth, 
            phoneNumber, 
            maritalStatus, 
            pincode, 
            aadharNumber, 
            panNumber, 
            licenseNumber, 
            password 
        });

        res.status(201).json({ data: newUser });  // Updated status code to 201 for resource creation
    } catch (error) {
        res.status(400).json({ error: error.message }); // Return error message
    }
}
const updateuser = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const userId = req.body.id; // Assuming you pass user ID in the URL params
        const updatedData = req.body;

        // Check if the user exists
        const user = await User.findById({_id : userId});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user data
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        res.status(200).json({ data: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllUsers = async (req, res)=>{
    try{
        const users = await User.find();
        return res.status(200).json({
            data : users
        });
    }
    catch(e){
        return res.status(404).json({
            msg : "error while fetching the users"
        })
    }
}



const getUserById = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not  found" })
    }
    res.status(200).json({ data: user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};
module.exports = {login,register,updateuser,getUserById, getAllUsers}