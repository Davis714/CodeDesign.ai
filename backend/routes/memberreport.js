const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const { Activity } = require("../models/Activity");

router.get("/member/:memberId", async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const { startDate, endDate } = req.query;

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).send("The member with given Id was not found");
    }

    const allActivities = await Activity.find({ member: memberId });

    const filteredActivities = allActivities.filter((act) => {
      const actDate = new Date(act.date);
      if (startDate && actDate < new Date(startDate)) return false;
      if (endDate && actDate > new Date(endDate)) return false;
      return true;
    });

    const totalHours = filteredActivities.reduce((sum, act) => sum + act.hours, 0);

    const grouped = {};
    filteredActivities.forEach((act) => {
      const dateKey = act.date.toISOString().split("T")[0]; // YYYY-MM-DD

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          activities: [],
          hours: 0,
        };
      }

      grouped[dateKey].activities.push(act.type);
      grouped[dateKey].hours += act.hours;
    });

    const dailyBreakDown = Object.values(grouped);

    res.json({
      memberId: member._id,
      memberName: member.name,
      totalHours,
      dailyBreakDown,
    });
  } catch (err) {
    console.error("Error generating member report:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
