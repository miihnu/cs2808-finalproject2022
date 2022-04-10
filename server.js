const databse = require("mysql2");
const express = require("express");
const { json } = require("express/lib/response");

const exp = express();

const connection = database.createConnection({
    host:   "localhost",
    username:   "root",
    password:   "jonathan",
    database:   "test"
});

connection.connect(function(err) {
    if (err) {
        console.log("shit broke");
    } else {
        console.log("shit didnt break");
    }
});

