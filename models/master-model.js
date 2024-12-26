const mongoose = require('mongoose');

// Define schemas
const organizationRoleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });
  
  const insuranceRoleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });
  
// Define models
const organizationRole = mongoose.model('OrganizationRole', organizationRoleSchema);
const insuranceRole = mongoose.model('InsuranceRole', insuranceRoleSchema);
module.exports = {
    organizationRole,
    insuranceRole,  
};