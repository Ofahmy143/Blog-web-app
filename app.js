
const express = require('express');
const app = express();
const https = require('https');
const { post } = require('request');
const request = require('request');
const nodemailer =require("nodemailer");

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
    if(post.header === "" || post.text == ""){
        console.log("empty post")
        

    }else if(posts.includes(post)){
        console.log("Duplicate try again");
    }else{
        posts.push(post);
        res.redirect("/");

    }


})


app.get("/about",function(req,res){
    res.render("about")
})
app.get("/contact",function(req,res){
    res.render("contact")
})
app.get(["/compose" ,"/posts/compose" , "/about/compose" ,"/contact/compose"],function(req,res){


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


    app.post("/contact",function(req,res){
        let email = req.body.email;
        let msg = req.body.messageContent;

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

