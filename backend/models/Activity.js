// models/Activity.js
const mongoose = require("mongoose");
const Joi = require("joi");

const activitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  hours: { type: Number, required: true },
  tags: [String],
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
});

// Joi validation schema
const validateActivity = Joi.object({
  member: Joi.string().hex().length(24).required(), // from req.body
  type: Joi.string().valid("coding", "design", "meeting", "review", "testing").required(),
  hours: Joi.number().positive().required(),
  date: Joi.date().required(),
  tags: Joi.array().items(Joi.string()).required()
});

module.exports = {
  Activity: mongoose.model("Activity", activitySchema),
  validateActivity
};


