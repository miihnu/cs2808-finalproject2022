const mysql = require("mysql2");
const express = require("express");
const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const costFactor = 6;
const salt = "teamjj"


const app = express();
app.use(express.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host:   "localhost",
    user:   "root",
    password:   "SQLTeam2021!",
    database:   "cs2803"
});


const logRequest = function(req, res, next){
    console.log(`Request: ${req}`)
    next() // definitely include this
}

app.use(logRequest);

app.get("/registration", function(req, res){
    res.sendFile(__dirname + "/public/" + "registration.html");
})
app.get("/main", function(req, res){
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.use(express.json());

app.post("/attempt-login", function(req, res){
    console.log("Server received POST to /attempt-login....");
    console.log("username: " + req.body.username); 
    console.log("password: " + req.body.password); 
    
    
    connection.query("select password from users where username = ?", [req.body.username], function (err, rows){
        if(err){
            res.json({success: false, message: "user doesn't exists"});
        }else{
            storedPassword = rows[0].password
            if (bcrypt.compareSync(req.body.password, storedPassword)){
            
                // authenticated = true;
                res.json({success: true, message: "logged in"})
            }else{
                res.json({success: false, message:"password is incorrect"})
            }
        }
    })
})

app.post("/attempt-register", function(req, res) {
    console.log("Server received POST to /attempt-register....");

    console.log("username: " + req.body.username); 
    console.log("password: " + req.body.password);
    
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
                    insertUser = "insert into users (username, password) values (?, ?)"
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

// app.use(express.urlencoded({ extended:false }));
app.use(express.static("public"))

app.listen(3000, function() {
    console.log("Listening on port 3000....")
})
