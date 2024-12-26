const mongoose = require('mongoose');

// Define schemas
const engineSchema = new mongoose.Schema({
    _id: String,
    name: String,   
    // Add any other properties for the engine here if needed
  });
  
  const modelSchema = new mongoose.Schema({
    _id: String, // Change _id to a string type
    brand_id: String,
    name: String,   
  });
  
  const brandSchema = new mongoose.Schema({
    _id: String,
    name: String,
  });
  const engineDoorSchema = new mongoose.Schema({
    _id: String,
    door: String,
    name: String
  });
  
  
// Define models
const Engine = mongoose.model('Engine', engineSchema);
const Model = mongoose.model('Model', modelSchema);
const Brand = mongoose.model('Brand', brandSchema);
const EngineDoor = mongoose.model('EngineDoor', engineDoorSchema);
module.exports = {
  Engine,
  Model,
  Brand,
  EngineDoor
};