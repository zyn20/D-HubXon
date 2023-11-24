const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const hostname = "127.0.0.1";
const port = 5000;
const path = require("path");
const sequelizee = require("./config");
const freelancerroute = require('./routes/freelancerroutes');
const clientroute = require('./routes/clientroutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use('/freelancer', freelancerroute)
app.use('/client', clientroute)

app.get("*", function (req, res) {
  res.status(404).send("404 error: page not found");
});



sequelizee.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });





