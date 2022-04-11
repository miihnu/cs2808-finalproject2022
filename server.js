const mysql = require("mysql2");
const express = require("express");
const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");


const app = express();

const connection = mysql.createConnection({
    host:   "localhost",
    user:   "root",
    password:   "SQLTeam2021!",
    database:   "cs2803"
});

app.get("/registration", function(req, res){
    res.sendFile(__dirname + "/public/" + "registration.html");
})
app.get("/main", function(req, res){
    res.sendFile(__dirname + "/public/" + "index.html");
})
app.post("/attempt-login", function(req, res){
    // we check for the username and password to match.
    if (req.body.username === username && req.body.password === password){
        res.json({success: true})
    }else{
        res.json({success: false});
    }    
})
app.post("/attempt-register", function(req, res){
    console.log("POST : /attempt-register: " + req.body);
    console.log(req.body);

    res.json({ success: false});
    
    // if there are no same username in database, res.json({success:true})
    // else, res.json({success:false})
})

connection.connect(function(err) {
    if (err) {
        console.log(err);
        console.log("Database connection failed....");
    } else {
        console.log("Database connection successful....");
    }
});

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"))

app.listen(3000, function() {
    console.log("Listening on port 3000....")
})
