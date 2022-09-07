const express = require('express');
const app = express();
const https = require('https');
const { post } = require('request');
const request = require('request');

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine','ejs');
app.use(express.json());

let posts = [];



app.listen(3000,function(){
    console.log("Server working on port 3000");
})



app.get("/",function(req,res){
    res.render("MainPage" , {posts:posts});
})



app.post("/compose",function(req,res){
    let post = {
        header : req.body.blogHeader,
        text : req.body.blogText
    }


    let headerLink = post.header.replace(/ /g,"-");



    posts.push(post);
    res.redirect("/");
})


app.get("/about",function(req,res){
    res.send("Yellooooo")
})
app.get("/contact",function(req,res){
    res.send("Yellooooo")
})
app.get(["/compose" ,"/posts/compose" , "/about/compose" ,"/contact/compose"],function(req,res){

    console.log("*************************************************");
    console.log(req.query)
    console.log(req.route);
    res.render("compose")
})
// app.post("/",function(req,res){
//     console.log(req.body);
//     for(let i=0 ; i<blogHeader.length ; i++){
//         if(req.body.blog[i]==='on'){
//         console.log("YES");
//         document.querySelectorAll(".blogContainer")[i].classList.addClass("invisible");
//        }else{
//         console.log("NO");
//        }
//         }
    


//     res.redirect("/");
// })

app.get("/posts/:postHeader" , function(req,res){
    let requestedTitle = req.params.postHeader.replace( /-/g," " );
    // console.log(requestedTitle);
    posts.forEach(function(post){
        let refactoredPostHeader = post.header.toLowerCase().replace( /[^a-zA-Z0-9-" " ]/g,"" );
        if(refactoredPostHeader===requestedTitle){
            res.render("Blog",{post:post});
        }
    })

    })