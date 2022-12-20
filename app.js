//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to your daily journal, here you can post anything that you like, for example: how your day went, what all new things happened today etc. So what are you waiting for, go ahead and start posting.";
const aboutContent = "This website was created by Mridul Verma for his personal use.";
const contactContent = "You can contact him at mridulverma478@gmail.com"

const app = express();
let posts = [];

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

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
