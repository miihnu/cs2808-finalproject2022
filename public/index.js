let loginButton = document.getElementById("loginbutton")
let username = document.getElementById("loginuser")
let password = document.getElementById("loginpassword")
let logout = document.getElementById("log-out-div")
let authenticated = false;
let currUser;

document.addEventListener("DOMContentLoaded", (event) => {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", authenticator)
    url = `/checkedLoggedIn`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    console.log("GET leaderboard request to server....");
    xhr.send();
});

function authenticator() {
    if (this.response.success) {
        currUser = this.response.user;
        console.log("In authenticator: currUser = " + currUser);
        authenticated = true;
    } else {
        authenticated = false;
    }
    check();
}

function check() {
    if (authenticated) {
        console.log("Authentication check called....");
        document.getElementById("login-info").style.display = "none";
        document.getElementById("h1-hello").innerText += ", " + currUser;
        document.getElementById("reg-link").style.display = "none";
        logout.style.display = "block";
    } else {
        document.getElementById("login-info").style.display = "block";
        document.getElementById("h1-hello").innerText = "Hello"
        document.getElementById("reg-link").style.display = "inline";
        logout.style.display = "none";
        document.getElementById("message").style.display = "none";
        document.getElementById("login-form").reset();
    }
}

function login(event){
    console.log("Login button clicked....");
    event.preventDefault()
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    query=`username=${username.value}&password=${password.value}`
    console.log(`Query: ${query}`);
    url = `/attempt-login`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    console.log("POST request to server....");
    xhr.send(query)
}

function responseHandler(){
    console.log("POST response from server....");
    let message = document.getElementById("message")
    message.style.display = "block"
    if (this.response.success) {    
        message.innerText = this.response.message;
        authenticated = true;
        currUser = this.response.user;
        check();

    }else {
        message.innerText = this.response.message;
        authenticated = false;
    }
}

loginButton.addEventListener("click", login);
document.getElementById("log-out-button").addEventListener("click", function(event) {
    authenticated = false;
    currUser = "Should not see";
    check();
})