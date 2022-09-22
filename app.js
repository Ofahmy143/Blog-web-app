
const express = require('express');
const app = express();
const https = require('https');
const { post } = require('request');
const request = require('request');
const nodemailer =require("nodemailer");
const mongoose = require("mongoose");

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine','ejs');
app.use(express.json());

// let posts = [];

// initiate the connection with the Database at mongoDB atlas
mongoose.connect("mongodb+srv://Fahmokky:7YFrcW5HWdobhBJd@clusterfah.3bcdud9.mongodb.net/blogDB")

/* -----------------------------------------------------------------------------Blogs Collection---------------------------------------------------------------------------------------*/


//create a schema for each post
const postSchema = new mongoose.Schema({
    header: String,
    text: String
})

const feedBackSchema = new mongoose.Schema({
    email: String,
    msg: String

})

// create a schema for each blog
const blogSchema = new mongoose.Schema({
    title: String,
    posts: [postSchema],
    feedBack: [feedBackSchema]
})

//create a collection for blogs
const blog = mongoose.model("blog",blogSchema);
/* -----------------------------------------------------------------------------Port listener---------------------------------------------------------------------------------------*/

//listening to port 3000 for local debugging and process.env for hosting on heroku
app.listen(3000,function(){
    console.log("Server working on port 3000");
})


/* -------------------------------------------------------------------------------GET methods---------------------------------------------------------------------------------------*/


app.get("/",function(req,res){
    blog.find(function(err,foundBlogs){
        if(err){
            coonsole.log(err);
        }else{
            res.render("MainPage" , {posts:foundBlogs[0].posts});
        }
    })
})



app.get("/about",function(req,res){
    res.render("about")
})
app.get("/contact",function(req,res){
    res.render("contact")
})
app.get("/compose" ,function(req,res){


    res.render("compose")
})
/* -----------------------------------------------------------------------------test Post---------------------------------------------------------------------------------------*/
let testPost1 = {
    header: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    +" quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum"
    +"dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
let testPost2 = {
    header: "Lorem Ipsum 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    +" quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum"
    +"dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

let defArr = [testPost1,testPost2];

const nBlog = new blog({
    title: "home",
    posts: defArr
})
// nBlog.save();

/* -----------------------------------------------------------------------------POST methods---------------------------------------------------------------------------------------*/





app.post("/compose",function(req,res){
    let post = {
        header : req.body.blogHeader.toLowerCase().replace( /[^a-zA-Z0-9-" " ]/g,"" ),
        text : req.body.blogText
    }
    // if(post.header === "" || post.text == ""){
    //     console.log("empty post")
        

    // }else if(posts.includes(post)){
    //     console.log("Duplicate try again");
    // }else{
        blog.findOneAndUpdate({title:'home'},{$push:{"posts":post}},{safe:true , upsert:true},function(err,model){
            if(err){
                console.log(err);
            }
        })
        res.redirect("/");

    // }


})

app.get("/posts/:postHeader" , function(req,res){
    let requestedTitle = req.params.postHeader.replace( /-/g," " );
    // console.log(requestedTitle);
    // posts.forEach(function(post){
    //     let refactoredPostHeader = post.header.toLowerCase().replace( /[^a-zA-Z0-9-" " ]/g,"" );
    //     if(refactoredPostHeader===requestedTitle){
    //         res.render("Blog",{post:post});
    //     }
    // })



    blog.find({title:'home'},function(err,foundBlog){
        if(err){
            console.log(err)
        }else{
            console.log(requestedTitle);

            const post = foundBlog[0].posts.find(el => el.header == requestedTitle);
            res.render("Blog",{post:post});
    }
    })


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




    app.post("/contact",function(req,res){
        let feedBack = {
            email: req.body.email,
            msg: req.body.messageContent
        }


        let transporter = nodemailer.createTransport({
    
            service: "gmail.com",
    
            auth: {
              user: "courseregisteration01iters@gmail.com",
              pass: "rfsngcynykfcffsy"
            },
            tls:{
                rejectUnauthorized:false
            }
          
        });
        
        var mailOptions = ({
        from: '"Anonymous reviewer" <courseregisteration01iters@gmail.com>',
        to: "ofahmy1234@gmail.com ",
        subject:"Blog FeedBack",
        html:"<div>" +
                " <h3>Email: "+ email+"</h3>"+
                "<h3>Msg=> <br> "+ msg+"</h3> </div>"
        });
        
        transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);

            res.redirect("/contact");
        }else{
            console.log("Email sent" +info.response);

           res.redirect("/contact");
        }
        });
    })


    

app.post("/",function(req,res){
    if(req.body.redirector === "home"){
        console.log(req.body.redirector);

        res.redirect("/");


    }else if(req.body.redirector === "about"){
        console.log(req.body.redirector);

        res.redirect("/about");


    }else if(req.body.redirector === "contact"){
        console.log(req.body.redirector);

        res.redirect("/contact");

    }else if(req.body.redirector === "compose"){
        
        console.log(req.body.redirector);
        res.redirect("/compose");


    }else{
        console.log("redirector error")
    }
})