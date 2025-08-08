const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Company } = require("../models/Company");
const Team = require("../models/Team");
const Member = require("../models/Member");
const { Activity } = require("../models/Activity");

router.get("/overview", async (req, res) => {
  try {
    const [totalCompanies, totalTeams, totalMembers, totalActivities] = await Promise.all([
      Company.countDocuments(),
      Team.countDocuments(),
      Member.countDocuments(),
      Activity.countDocuments()
    ]);
    const activityMap = new Map();
    const { startDate, endDate } = req.query;
    const allActivities = await Activity.find();

    const filteredActivities = allActivities.filter((act) => {
      const actDate = new Date(act.date);
      if (startDate && actDate < new Date(startDate)) return false;
      if (endDate && actDate > new Date(endDate)) return false;
      return true;
    });
    const totalHours = filteredActivities.reduce((sum, act) => sum + act.hours, 0);

    for(var act of filteredActivities){
      if(activityMap.has(act.type))
        activityMap.set(act.type,activityMap.get(act.type) + act.hours);
      else
        activityMap.set(act.type,act.hours);
    }
    const topActivityTypes = [...activityMap.entries()].map(act => ({type : act[0] , totalHours : act[1] })).sort((a, b) => b.totalHours - a.totalHours);
    res.json({
      totalCompanies,
      totalTeams,
      totalMembers,
      totalActivities,
      totalHours,
      topActivityTypes
    });
  } catch (err) {
    console.error("Error in /overview:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

