// models/Team.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
});

module.exports = mongoose.model("Team", teamSchema);
