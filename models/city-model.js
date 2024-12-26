// Import mongoose
const mongoose = require('mongoose');

// Define City schema
const citySchema = new mongoose.Schema({
    _id: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  // Other properties you may want to include
  // E.g., latitude, longitude, region, etc.
});

// Create City model
const City = mongoose.model('City', citySchema);

// Export City model
module.exports = City;
