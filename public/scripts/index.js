let loginButton = document.getElementById("loginbutton")
let username = document.getElementById("loginuser")
let password = document.getElementById("loginpassword")
let logout = document.getElementById("log-out-div")
let authenticated = false;
let currUser;
var quote;
const APIKEY = "a9eb78acce258mjsf5a8f1q821";
document.getElementById("save-quote").addEventListener("click", saveQuote)

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("quote-div").style.display="block";
       document.getElementById("save-quote").style.display="none";
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
        currUser = this.response.user;
        console.log("In authenticator: currUser = " + currUser);
        authenticated = true;
        displayQuote();
    } else {
        authenticated = false;
        document.getElementById("save-quote").style.display="none";
    }
    check();
}

function check() {
    if (authenticated) {
        console.log("Authentication check called....");
        document.getElementById("hello-user").innerText += ", " + currUser;
        logout.style.display = "block";
        displayQuote();
    } else {
        currUser = "";
        document.getElementById("hello-user").innerText = "Hello"
        logout.style.display = "none";
        document.getElementById("save-quote").style.display="none";
        document.getElementById("quote-div").style.display="none";
        document.getElementById("user-quote").style.display="none";
    }
}

function saveQuote() {
    let xhr = new XMLHttpRequest;
    let kanyeQuote = document.getElementById("kanyeQuote").innerText;
    console.log(kanyeQuote);
    xhr.addEventListener("load", saveQuoteHandler);
    if (!quote) {
        kanye();
    }
    let query = `username=${currUser}&quote=${kanyeQuote}`;
    xhr.responseType = "json";
    xhr.open("POST", "/save-quote");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(query);
}

function saveQuoteHandler() {
    if (this.response.success) {
        displayQuote();
    } else {
        console.log(this.response.message);
    }
}
function displayQuote() {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", displayQuoteHandler)
    query=`username=${currUser}`;
    xhr.responseType="json";
    xhr.open("GET", "/display-quote?" + query)
    xhr.send();
}
function displayQuoteHandler() {
    if (this.response.success) {
        if (this.response.quote) {
            document.getElementById("user-quote").innerHTML = `Your saved quote: <i>${this.response.quote}</i>`;
        }
    } else {
        console.log(this.response.message);
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

// loginButton.addEventListener("click", login);

document.getElementById("log-out-button").addEventListener("click", function(event) {
    authenticated = false;
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", serverCheck)
    url = `/update-authenticated`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    xhr.send();
    check();
})

function serverCheck() {
    if (this.response.success) {
        console.log("good response from update-authenticated");
    } else {
        console.log("bad response from update-authenticated");
    }
}

window.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#kanye").addEventListener('click', function() {
        kanye();
    })
})

function kanye() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceivedHandler);
    xhr.responseType = "json";
    xhr.open("GET", "https://api.kanye.rest/" + APIKEY);
    xhr.send()
    
}

function responseReceivedHandler() {    
    if (this.status === 200) {
       let kanyeParagraph = document.getElementById("kanyeQuote");
       quote = this.response.quote;
       kanyeParagraph.innerHTML = `<i>${this.response.quote}</i>`;
       document.getElementById("quote-div").style.display="block";
       if (authenticated) {
        document.getElementById("save-quote").style.display="block";
       } else {
        document.getElementById("save-quote").style.display="none";
       }
    } else {
       console.log("failure");
    }
 }