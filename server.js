const database = require("mysql2");
const express = require("express");
const { json } = require("express/lib/response");

const app = express();

const connection = database.createConnection({
    host:   "localhost",
    username:   "root",
    password:   "jonathan",
    database:   "cs2803"
});

connection.connect(function(err) {
    if (err) {
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
