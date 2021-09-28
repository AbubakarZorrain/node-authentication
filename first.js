const mongoose = require("mongoose");
var express = require('express');
const Router = require('./routes');
var app = express();
app.use(express.json());

// Connect to MongoDb Using Function: mongoose.connect()... 
const username = "zorain";
const password = "mnbv098765";
const cluster = "cluster0.qqg6t";
const dbname = "sample_airbnb";
mongoose.connect(

  'mongodb+srv://zorain:mnbv098765@cluster0.qqg6t.mongodb.net/sample_airbnb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  //    useFindAndModify: false,
  useUnifiedTopology: true
}
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(Router);

app.listen(3300, () => {
  console.log("Server is running at port 3300");
});