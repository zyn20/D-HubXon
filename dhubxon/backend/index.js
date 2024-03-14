const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require("path");
const { CronJob } = require('cron');
const fileUpload = require('express-fileupload');

const sequelize = require("./config");
const Freelancer = require("./models/freelancermodel");
const Client = require("./models/clientmodel");
const freelancerroute = require('./routes/freelancerroutes');
const clientroute = require('./routes/clientroutes');
const check_record = require("./middleware/check_existing_record");
const messageController = require('./controller/chatcontroller');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/freelancer', freelancerroute);
app.use('/client', clientroute);
app.use('/forgetpassword', check_record);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle 'message' event
  socket.on('message', async (data) => {
    try {
      const newMessage = await messageController.sendMessage(socket, data);
      // You can emit additional events if needed
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Handle additional events...
});

// Middleware for CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Cron Job
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
  },
  null,
  true,
  'Asia/Karachi'
);

// Start the server
sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
