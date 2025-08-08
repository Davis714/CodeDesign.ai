const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

exports.Company = mongoose.model("Company", companySchema);
