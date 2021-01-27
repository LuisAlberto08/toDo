//jshint esversion:6

/* Need a few packages from NPM     
    Express
    Body Parser
    EJS
    Mongoose
*/

//Global Variable for new items

const items = [];

//Request NPM Packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + "/modules/date.js");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//Serve Static landing page with EJS
app.get('/', function (req, res) {
const todayIs = date.getDate();
res.render("list", {day:todayIs , addedItems:items});
});
 
app.post("/", (req , res)=>{
    const item = req.body.newItem;
    items.push(item);
    console.log(items);
    res.redirect("/");
})

// Create Server
app.listen(3000);
