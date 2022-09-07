const express = require('express');
const app = express();
const https = require('https');
const request = require('request');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(express.json());

let blogHeader = [];
let blogText = [];


app.listen(3000,function(){
    console.log("Server working on port 3000");
})



app.get("/",function(req,res){
    res.render("MainPage" , {blogHeader:blogHeader , blogText:blogText});
})

app.get("/blogs",function(req,res){
    res.send("Yellooooo")
})
app.get("/about",function(req,res){
    res.send("Yellooooo")
})
app.get("/contact",function(req,res){
    res.send("Yellooooo")
})
app.get("/compose",function(req,res){
    res.render("compose")
})
app.post("/compose",function(req,res){
    let header = req.body.blogHeader;
    let text = req.body.blogText;
    blogHeader.push(header);
    blogText.push(text);
    res.redirect("/");
})
app.post("/",function(req,res){
    console.log(req.body);
    for(let i=0 ; i<blogHeader.length ; i++){
        if(req.body.blog[i]==='on'){
        console.log("YES");
       }else{
        console.log("NO");
       }
        }
    


    res.redirect("/");
})