let currUser;
let authenticated = false;


document.addEventListener("DOMContentLoaded", (event) => {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", authenticator)
    url = `/checkedLoggedIn`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    console.log("GET /checkedLoggedIn request to server....");
    xhr.send();
});
document.getElementById("log-out-button").addEventListener("click", function(event) {
    authenticated = false;
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", serverCheck)
    url = `/update-authenticated`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    xhr.send();
    currUser = "Should not see";
    check();
})

function serverCheck() {
    if (this.response.success) {
        console.log("good response from update-authenticated");
    } else {
        console.log("bad response from update-authenticated");
    }
}

function authenticator() {
    if (this.response.success) {
        authenticated = true;
        currUser = this.response.user;
    } else {
        authenticated = false;    }
    check();
}

function check() {
    if (authenticated) {
        document.getElementById("registration").style.display = "none";
        document.getElementById("log-out").style.display = "block";
    } else {
        document.getElementById("registration").style.display = "block";
        document.getElementById("log-out").style.display = "none";
    }
}

let username = document.getElementById("username")
let password = document.getElementById("password")
let registerButton = document.getElementById("register")

username.style.backgroundColor = "white";
password.style.backgroundColor = "white";
document.getElementById("confirm-password").style.backgroundColor = "white"

username.addEventListener("input", checkUsername)
password.addEventListener("input", checkPassword)
document.getElementById("confirm-password").addEventListener("input", checkConfirmPassword)

let usernameValid = false;
let passwordValid = false;
let confirmValid = false;

function checkUsername(event) {
    username.style.backgroundColor = "white";
    document.getElementById("username-reqs").innerHTML = "<u>Username has to be at least 5 characters, not exceeding 16 charactors total.</u>";
    usernameValid = false;

    if (username.value.length >= 5 && username.value.length <= 16) {
        usernameValid = true;
        username.style.backgroundColor = "lightgreen";
        document.getElementById("username-reqs").innerText = ""
    }
}
function checkPassword(event) {
    password.style.backgroundColor = "white";
    document.getElementById("password-reqs").innerHTML ="<u>Password has to be at least 5 characters, not exceeding 16 charactors total.</u>";
    passwordValid = false;

    if (password.value.length >= 5 && password.value.length <= 16) {
        passwordValid = true;
        password.style.backgroundColor = "lightgreen";
        document.getElementById("password-reqs").innerText = "";
    }
}
function checkConfirmPassword(event) {
    let temp = document.getElementById("confirm-password")
    temp.style.backgroundColor = "white";
    document.getElementById("confirm-pass").innerHTML ="<u>Passwords have to match</u>";
    confirmValid = false;

    if (temp.value === document.getElementById("password").value) {
        confirmValid = true;
        temp.style.backgroundColor = "lightgreen";
        document.getElementById("confirm-pass").innerText = "";
    }
}
function validate(event) {
    let message = document.getElementById("message");
    message.style.display = "block";
    if (!(usernameValid && passwordValid && confirmValid)) {
        event.preventDefault();
        if (!usernameValid && !passwordValid) {
            message.innerText = "invalid username and password";
        } else if (!usernameValid && passwordValid) {
            message.innerText = "invalid username";
        } else if (!passwordValid && usernameValid) {
            message.innerText = "invalid password";
        } else if (!passwordValid || !confirmValid) {
            message.innerText = "passwords dont match"
        } 
        
    } else {
        register(event);
    }
    
}

function register(event){
    console.log("Register button clicked....");
    event.preventDefault()
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    query=`username=${username.value}&password=${password.value}`
    console.log(`Query: ${query}`);
    url = `/attempt-register`
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
    if (this.response.success){
        //message.innerHTML = "register failure";    
        message.innerText = this.response.message;
        authenticated = true;
        check();
    } else{
        //message.innerText = this.response = "register success";
        message.innerText = this.response.message;
        authenticated = false;
    }
}

registerButton.addEventListener("click", validate)