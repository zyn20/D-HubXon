const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();
const hostname = "127.0.0.1";
const port = 5000;
const path = require("path");
const sequelizee = require("./config");
const freelancerroute = require('./routes/freelancerroutes');
const clientroute = require('./routes/clientroutes');
const check_record=require("./middleware/check_existing_record");
const Freelancer = require("./models/freelancermodel");  
const Client = require("./models/clientmodel");  
const { CronJob } = require('cron');


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));








app.use('/freelancer', freelancerroute)
app.use('/client', clientroute)
app.use('/forgetpassword',check_record)

app.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


const job = new CronJob(
	'0 0 * * * *',
  
  
  async () => {
    try {
      // Find and delete unverified freelancers
      const deletedFreelancersCount = await Freelancer.destroy({
        where: {
          Isverified: false,
        },
      });

      console.log(`Deleted ${deletedFreelancersCount} unverified freelancers at ${new Date()}`);

      // Find and delete unverified clients
      const deletedClientsCount = await Client.destroy({
        where: {
          Isverified: false,
        },
      });

      console.log(`Deleted ${deletedClientsCount} unverified clients at ${new Date()}`);
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }
  
  
  , // onTick
	null, // onComplete
	true, // start
	'Asia/Karachi' // timeZone
);




// const deleteUnverifiedUsersJob = new CronJob({
//   cronTime: '* * * * * *', // Run every minute
//   onTick: async () => {
//     try {
//       // Find and delete unverified freelancers
//       const deletedFreelancersCount = await Freelancer.destroy({
//         where: {
//           Isverified: false,
//         },
//       });

//       console.log(`Deleted ${deletedFreelancersCount} unverified freelancers at ${new Date()}`);

//       // Find and delete unverified clients
//       const deletedClientsCount = await Client.destroy({
//         where: {
//           Ssverified: false,
//         },
//       });

//       console.log(`Deleted ${deletedClientsCount} unverified clients at ${new Date()}`);
//     } catch (error) {
//       console.error('Error in cron job:', error);
//     }
//   },
//   start: true,
//   timeZone: 'Asia/Karachi', // Replace with your time zone if needed
// });

// deleteUnverifiedUsersJob.start();




sequelizee.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });





