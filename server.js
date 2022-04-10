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
    console.log("Listening on port: 3000npm....")
})
