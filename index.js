const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.get("/", function (req, res) {
  res.send("Working");
});
const dotenv = require("dotenv").config();

const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/uploads',express.static('uploads'));
const db = require("./models");
mongoose.connect(
  db.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

require("./routes/user")(app);

app.listen(PORT, function () {
  console.log("Listening on port " + PORT + ".");
});