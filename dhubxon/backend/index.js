const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const hostname = "127.0.0.1";
const port = 5000;
const path = require("path");
const sequelizee = require("./config");
const freelancerroute = require("./routes/freelancerroutes");
const clientroute = require("./routes/clientroutes");
const messageroute = require("./routes/messageroutes");
const check_record = require("./middleware/check_existing_record");
const Freelancer = require("./models/freelancermodel");
const Client = require("./models/clientmodel");
const { CronJob } = require("cron");
//const fileUpload = require("express-fileupload");
app.use(bodyParser.json());
//app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/freelancer", freelancerroute);
app.use("/client", clientroute);
app.use("/message", messageroute);
app.use("/forgetpassword", check_record);
app.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const job = new CronJob(
  "0 0 * * * *",
  async () => {
    try {
      // Find and delete unverified freelancers
      const deletedFreelancersCount = await Freelancer.destroy({
        where: {
          Isverified: false,
        },
      });
      console.log(
        `Deleted ${deletedFreelancersCount} unverified freelancers at ${new Date()}`
      );

      // Find and delete unverified clients
      const deletedClientsCount = await Client.destroy({
        where: {
          Isverified: false,
        },
      });

      console.log(
        `Deleted ${deletedClientsCount} unverified clients at ${new Date()}`
      );
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  }, // onTick
  null, // onComplete
  true, // start
  "Asia/Karachi" // timeZone
);
sequelizee.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
