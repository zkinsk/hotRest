// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//================================================
var reservations = [];
var wait = [];
// ====================================================
// Create New Tables and store them in reservations or waitlist accordingly - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newtable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  
    console.log(newtable);
    
    // Checks the "reservations" array and if it's full (five entries) push new input the "wait" array
    if (reservations.length > 4) {
        wait.push(newtable);
    }
    // If the "reservations" array has space, push input to that array
    else {
        reservations.push(newtable);
    };
    res.json(newtable);
});
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  // Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
// Displays the current reservations
app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});
// Displays the waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(wait);
});
app.post("/api/clear", function(req, res) {
  reservations = [];
  wait = [];
});