//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');
const _ = require("lodash");

const homeStartingContent = "Welcome to voyager, here you can post anything that you like, from all the tech related articles, various coding doubts and all other various tech developements. ";
const aboutContent = "This website was created by Mridul Verma for his personal use.";
const contactContent = "You can contact us at mridulverma478@gmail.com"

const app = express();
let posts = [];

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
  res.render("home",{homeText: homeStartingContent,posts: posts});
})

app.get("/posts/:topic",function(req,res){
  let requestedTitle = _.lowerCase(req.params.topic);
  for (let i = 0; i < posts.length; i++) {
    let currentTitle = _.lowerCase(posts[i].title);
    if(currentTitle===requestedTitle)
    {
      res.render("post",{pageTitle: posts[i].title, pageContent: posts[i].content});
    }
  }
})

app.get("/about",function(req,res){
  res.render("about",{aboutText: aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactText: contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  posts.push(
    {
      title: req.body.postTitle,
      content: req.body.postBody,
    }
  )
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started!");
});
