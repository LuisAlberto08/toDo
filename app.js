//jshint esversion:6

/* Need a few packages from NPM     
    Express
    Body Parser
    EJS
    Mongoose
*/

//Request NPM Packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Create Server

app.get('/', function (req, res) {
  res.render("list");
});
 


//Serve Static landing page with EJS



app.listen(3000);
