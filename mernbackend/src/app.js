const express = require("express");
const app=express();
const path =require("path");
const bodyparser = require("body-parser");
const hbs = require(("hbs"))
const mongoose = require("mongoose");
const { stringify } = require("querystring");
require("../public/resp.js");

require("./db/conn");
const port =process.env.PORT || 3000;
const static_path= path.join(__dirname,"../public")
const template_path= path.join(__dirname,"../template/views")
const partials_path= path.join(__dirname,"../template/partials")

//define schema//
const contactSchema =new mongoose.Schema({
  name: String,
  phone: String,
  email: String,

})

const contact = mongoose.model('contact', contactSchema);

app.use(express.static(static_path))
console.log(path.join(__dirname,"../public"))
app.set("view engine","hbs");
app.set("views",template_path)
hbs.registerPartials(partials_path)

app.get("/",(req,res) =>{
    res.render("index")
})


//app.get("/",(req,res)=>{
  //  res.send("hello from this is our sever")

//});

app.post('/index.hbs', (req, res)=>{ 
  var myData=new contact(req.body);
  myData.save().then(()=>{
      res.send("this item has been saved to the data base")
  }).catch(()=>{
      res.status(400).send("item was not send to the data base")
  })
 // res.status(200).render('contact.pug');
})

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`)
});