const mysql = require("mysql2");
const express = require("express");
const { json } = require("express/lib/response");


const app = express();

const connection = mysql.createConnection({
    host:   "localhost",
    username:   "root",
    password:   "jonathan",
    database:   "cs2803"
});

app.get("/registration", function(req, res){
    res.sendFile(__dirname + "/public/" + "registration.html");
})
app.get("/main", function(req, res){
    res.sendFile(__dirname + "/public/" + "index.html");
})
app.post("/attempt-login", function(req, res){
    console.log(req.body);
    // we check for the username and password to match to same name database values;
    // if match, res.json({success:true})
    // else, res.json({success:false})
})
app.post("/attempt-register", function(req, res){
    console.log(req.body)
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
