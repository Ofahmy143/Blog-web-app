const express = require('express');
const app = express();
const https = require('https');
const request = require('request');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');


app.listen(3000,function(){
    console.log("Server working on port 3000");
})
