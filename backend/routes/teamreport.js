const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Company } = require("../models/Company");
const Team = require("../models/Team");
const Member = require("../models/Member");
const { Activity } = require("../models/Activity");

router.get("/company/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send("The company with given Id was not found");
    }

    const teams = await Team.find({ company: companyId });

    const activitySummaryMap = new Map();

    const teamReports = await Promise.all(
      teams.map(async (team) => {
        const members = await Member.find({ team: team._id });
        const memberIds = members.map((m) => m._id);

        const allActivities = await Activity.find({ member: { $in: memberIds } });

        const filteredActivities = allActivities.filter((activity) => {
          const activityDate = new Date(activity.date);
          if (start && activityDate < start) return false;
          if (end && activityDate > end) return false;
          return true;
        });

        const totalHours = filteredActivities.reduce((sum, act) => sum + act.hours, 0);

        const activityMap = {};
        const tagSet = new Set();

        filteredActivities.forEach((activity) => {
          activityMap[activity.type] = (activityMap[activity.type] || 0) + activity.hours;

          (activity.tags || []).forEach((tag) => tagSet.add(tag));

          // Global summary
          if (!activitySummaryMap.has(activity.type)) {
            activitySummaryMap.set(activity.type, { totalHours: 0, members: new Set() });
          }

          const typeSummary = activitySummaryMap.get(activity.type);
          typeSummary.totalHours += activity.hours;
          typeSummary.members.add(activity.member.toString()); // ensure uniqueness
        });

        const activityBreakdown = Object.entries(activityMap)
          .map(([type, totalHours]) => ({ type, totalHours }))
          .sort((a, b) => b.totalHours - a.totalHours);

        return {
          teamId: team._id,
          teamName: team.name,
          totalMembers: members.length,
          totalHours,
          activityBreakdown,
          uniqueTags: Array.from(tagSet),
        };
      })
    );

    const activitySummaryByType = {};
    for (const [type, { totalHours, members }] of activitySummaryMap.entries()) {
      activitySummaryByType[type] = {
        totalHours,
        members: members.size,
      };
    }

    res.json({
      companyId: company._id,
      companyName: company.name,
      teams: teamReports,
      activitySummaryByType,
    });
  } catch (err) {
    console.error("Error generating company overview:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

