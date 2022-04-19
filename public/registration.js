let username = document.getElementById("username")
let password = document.getElementById("password")
let registerButton = document.getElementById("register")

username.style.backgroundColor = "orange";
password.style.backgroundColor = "orange";


username.addEventListener("input", checkUsername)
password.addEventListener("input", checkPassword)

let usernameValid = false;
let passwordValid = false;

function checkUsername(event) {
    username.style.backgroundColor = "orange";
    usernameValid = false;

    if (username.value.length >= 5 && username.value.length <= 16) {
        usernameValid = true;
        username.style.backgroundColor = "lightgreen";
    }
}
function checkPassword(event) {
    password.style.backgroundColor = "orange";
    passwordValid = false;

    if (password.value.length >= 7 && password.value.length <= 16) {
        passwordValid = true;
        password.style.backgroundColor = "lightgreen";
    }
}
function validate(event) {
    let message = document.getElementById("message");
    message.style.display = "block";
    if (!(usernameValid && passwordValid)) {
        event.preventDefault();
        if (!usernameValid && !passwordValid) {
            message.innerText = "invalid username and password";
        } else if (!usernameValid && passwordValid) {
            message.innerText = "invalid username";
        } else if (!passwordValid && usernameValid) {
            message.innerText = "invalid password";
        } else {
            message.innerText = "undefined behavior"
        }
        
    } else {
        login(event);
    }
    
}

function login(event){
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
    }else{
        //message.innerText = this.response = "register success";
        message.innerText = this.response.message;
    }
}

registerButton.addEventListener("click", validate)
