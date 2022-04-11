let loginButton = document.getElementById("loginbutton")
let username = document.getElementById("loginuser")
let password = document.getElementById("loginpassword")

function login(event){
    console.log("Login button clicked");
    event.preventDefault()
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", responseHandler)
    query=`username=${username.value}&password=${password.value}`
    console.log("Query: " + query);
    url = `/attempt-login`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    console.log("POST request to server....");
    xhr.send(query)
}

function responseHandler(){
    console.log("POST response from server.....");
    let message = document.getElementById("message")
    message.style.display = "block"
    if (this.response.success){    
        message.innerText = "Success"
    }else{
        console.log(this.response.success)
        message.innerText = "Failed"
    }
}

loginButton.addEventListener('click', login);