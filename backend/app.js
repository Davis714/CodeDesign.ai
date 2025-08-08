const express = require("express");
const app = express();
const reportRoutes = require("./routes/report");
const teamReportsRoutes = require('./routes/teamreport');
const memberRepoertsRoutes = require('./routes/memberreport');
const addActivity = require('./routes/addActivity');
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/companydb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error("Couldnt connect to MongoDB"))
app.use(express.json())
app.use("/report", reportRoutes);
app.use("/report" , teamReportsRoutes);
app.use("/report" , memberRepoertsRoutes);
app.use("/",addActivity);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});