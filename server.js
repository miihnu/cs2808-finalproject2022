const mysql = require("mysql2");
const express = require("express");
const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const costFactor = 6;
const salt = "teamjj";

let authenticated = false;
let currUser;

const app = express();
app.use(express.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host:   "localhost",
    user:   "root",
    password:   "SQLTeam2021!",
    database:   "cs2803"
});
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/views/" + "index.html")
})
app.get("/update-authenticated", function(req, res) {
    authenticated = false;
    res.json({success: true})
})
app.get("/registration", function(req, res){
    res.sendFile(__dirname + "/public/views/" + "registration.html");
})
app.get("/main", function(req, res){
    res.sendFile(__dirname + "/public/views/" + "index.html");
})
app.get("/game", function(req, res) {
    res.sendFile(__dirname + "/public/views/" + "game.html")
})
app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/public/views/" + "login.html")
})

app.use(express.json());

app.get("/leaderboard", function(req, res) { 
    connection.query("select username, highscore from users", function(err, rows) {
        if (err) {
            res.json({success: false, message: "query failed"})
        } else {
            // console.log(rows);
            res.json({success: true, message: "query successful", response: rows})
        }
    })
})
app.get("/checkedLoggedIn", function(req, res) { 
    // console.log("Server received POST to /checkedLoggedIn...");
    if (authenticated) {
        res.json({success: true, message: "User is signed in", user: currUser})
    } else {
        res.json({success: false, message: "User not signed in"})
    }
})

app.post("/attempt-login", function(req, res){
    // console.log("Server received POST to /attempt-login....");    
    connection.query("select password from users where username = ?", [req.body.username], function (err, rows) {
        // console.log(rows.length);
        if (err) {
            res.json({success: false, message: "database query error"});
        } 
        if (rows.length === 0) {
            res.json({success: false, message: "incorrect username or password"});
        } else {
            storedPassword = rows[0].password
            if (bcrypt.compareSync(salt + req.body.password, storedPassword)){
                res.json({success: true, message: "logged in", user: req.body.username})
                authenticated = true;
                currUser = req.body.username;
                // console.log(currUser);
            }else {
                res.json({success: false, message:"incorrect username or password"})
            }
        }
    })
})
app.post("/save-quote", function(req, res) {
    saveQuery = "update users set quote=? where username=?";
    connection.query(saveQuery, [req.body.quote, req.body.username], function(err, rows) {
        if (err) {
            res.json({success:false, message:"server error, location one"})
        } else {
            res.json({success:true})
        }
    })
    

});
app.get("/display-quote", function(req, res) {
    userQuery = "select username, quote from users where username=?"
    connection.query(userQuery, [req.query.username], function(err, rows) {
        if (err) {
            res.json({success: false, message:"database query failed for /display-quote"})
        } else {
            res.json({success: true, quote: rows[0].quote})
        }
    })
})

app.post("/attempt-register", function(req, res) {
    console.log("Server received POST to /attempt-register....");    
    usernameQuery = "Select username from users where username  = ?"
            connection.query(usernameQuery, [req.body.username], function(err, rows){ 
                if(err){
                    res.json({success: false, message: "server error, location one"})
                }
                if (rows.length > 0){
                    res.json({success: false, message: "username taken"})
                }
                else{
                    passwordHash = bcrypt.hashSync(salt + req.body.password, costFactor);                    
                    insertUser = "insert into users (username, password, highscore) values (?, ?, 0)"
                    connection.query(insertUser, [req.body.username, passwordHash], function(err, rows){
                        if (err){
                            res.json({success: false, message: "server error, location two"})
                        }
                        else{
                            res.json({success: true, message: "user registered"})
                        }
                    })
                }
            });
});

connection.connect(function(err) {
    if (err) {
        console.log("Database connection failed....");
    } else {
        console.log("Database connection successful....");
    }
});


app.use(express.static("public"))

app.listen(3000, function() {
    console.log("Listening on port 3000....")
})
