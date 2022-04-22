let messageTwo = document.getElementById("messageTwo");
let message = document.getElementById("message");
let messageDiv = document.getElementById("result-div");

document.addEventListener("DOMContentLoaded", (event) => {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", authenticator)
    url = `/checkedLoggedIn`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    console.log("GET /checkedLoggedIn request to server....");
    xhr.send();
});

function authenticator() {
    if (this.response.success) {
        console.log("user already logged in");
        authenticated = true;
    } else {
        console.log("user not logged in");
        authenticated = false;    }
    check();
}
let loginButton = document.getElementById("loginbutton")
let username = document.getElementById("loginuser")
let password = document.getElementById("loginpassword")
let authenticated = false;
let currUser;

loginButton.addEventListener("click", login);

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
    message.style.display = "block";
    if (this.response.success) {    
        message.innerText = this.response.message;
        authenticated = true;
        currUser = this.response.user;
        username.value = "";
        password.value = ""
        check();
        authenticated = true;

    }else {
        message.innerHTML =`<p>${this.response.message}</p> <p>New user? Register <a id="reg" href=registration>here</a></p>`;
        authenticated = false;
    }
}
function check () {
    if (authenticated) {
        document.getElementById("login-div").style.display="none";
        message.style.display = "none";
        messageTwo.style.display = "block";
        
    } else {
        document.getElementById("login-div").style.display="block";
        message.style.display = "block";
        messageTwo.style.display = "none";
    }
}
document.getElementById("sign-out").addEventListener("click", function(event) {
    authenticated = false;
    console.log("working");
    check();
})