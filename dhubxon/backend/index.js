const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();
const hostname = "127.0.0.1";
const port = 5000;
const path = require("path");
const cors = require('cors');
const sequelizee = require("./config");
const freelancerroute = require('./routes/freelancerroutes');
const clientroute = require('./routes/clientroutes');

app.use(cors());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use('/freelancer', freelancerroute)
app.use('/client', clientroute)

app.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


sequelizee.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });





