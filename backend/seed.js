const mongoose = require("mongoose");
const companiesData = require("./data/companies"); 

const {Company} = require("./models/Company");
const Team = require("./models/Team");
const Member = require("./models/Member");
const {Activity} = require("./models/Activity");

mongoose.connect("mongodb://localhost:27017/companydb", {
});

async function populateDatabase() {
  try {
    await mongoose.connection.dropDatabase(); 

    for (const company of companiesData) {
      const companyDoc = await new Company({
        companyId: company.companyId,
        name: company.name,
      }).save();

      for (const team of company.teams) {
        const teamDoc = await new Team({
          teamId: team.teamId,
          name: team.name,
          company: companyDoc._id,
        }).save();

        for (const member of team.members) {
          const memberDoc = await new Member({
            memberId: member.memberId,
            name: member.name,
            team: teamDoc._id,
          }).save();

          const activityDocs = member.activities.map(activity => ({
            ...activity,
            member: memberDoc._id,
          }));
          await Activity.insertMany(activityDocs);
        }
      }
    }

    console.log("Database populated successfully!");
  } catch (err) {
    console.error("Error populating database:", err);
  } finally {
    mongoose.connection.close();
  }
}

populateDatabase();

