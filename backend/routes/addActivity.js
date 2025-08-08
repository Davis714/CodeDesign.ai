const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const {Activity ,validateActivity} = require("../models/Activity");
  router.post("/activity", async (req, res) => {
    try {
      const { error, value } = validateActivity.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
      const { member, type, hours, date, tags } = req.body;
      const checkMember = await Member.findById(member);
      if (!checkMember) {
        return res.status(404).json({ error: "Member not found" });
      }
      const newActivity = new Activity({
        member,
        type,
        hours,
        date,
        tags: tags || []
      });
  
      await newActivity.save();
  
      res.status(201).json({activity: newActivity });
    } catch (err) {
      console.error("Error adding activity:", err);
      res.status(500).json({ error: "Server Error" });
    }
  });

  module.exports = router;
  