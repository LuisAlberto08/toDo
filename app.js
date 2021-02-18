//jshint esversion:6

/* Need a few NPM packages      
    Express
    Body Parser
    EJS
    Mongoose
*/

//Request NPM Packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + "/modules/date.js");
const mongoose = require('mongoose')

//Mongo database connection
mongoose.connect('mongodb://localhost:27017/todoDB',{useNewParser: true, useUnifiedTopology: true})

//EJS config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Schema for item Database 
const itemsSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: "Welcome to your todo list!"
});

const item2 = new Item({
  name: "Click the + button to add a new item."
});

const item3 = new Item({
  name: "Hit this to delete an item ----->"
});

const defaultItems = [item1, item2, item3];



//Serve Static landing page with EJS
app.get('/', function (req, res) {
const todayIs = date.getDate();
Item.find({},(err,searchResults)=>{
if(searchResults.length === 0){
  Item.insertMany(defaultItems,(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Default items added");
    }
    res.redirect("/");
  });
}else{
res.render("list",{day:todayIs , addedItems:searchResults} )
}
});
});
 
app.post("/", (req , res)=>{
  const itemName = req.body.newItem;
  const item = new Item({
  name:itemName
});
  item.save();
    res.redirect("/");

})

// Create Server
app.listen(3000);
