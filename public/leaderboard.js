let updateLeaderBoard = false;
if (updateLeaderBoard == true) {
    updateLeaderBoard = false;
    leaderboard();
}
document.getElementById("update").addEventListener("click", leaderboard);

let authenticated = false;

document.addEventListener("DOMContentLoaded", (event) => {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    url = `/leaderboard`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    console.log("GET leaderboard request to server....");
    xhr.send();
});

document.addEventListener("DOMContentLoaded", (event) => {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", authenticator)
    url = `/checkedLoggedIn`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    console.log("GET leaderboard request to server....");
    xhr.send();
});

const loadLeaderboard = setInterval(leaderboard, 10000)

function leaderboard() {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    url = `/leaderboard`;
    xhr.responseType = "json";   
    xhr.open("GET", url)
    console.log("GET leaderboard request to server....");
    xhr.send()
}

function responseHandler(){
    console.log("GET response from server....");
    let message = document.getElementById("leaderboard-values")
    message.style.display = "block"
    if (this.response.success){
        let sortedhighscores = this.response.response.sort((a,b) => b.highscore - a.highscore)
        for (let i = 0; i < this.response.response.length; i++) {
            if (i == 0) {
                message.innerText = `${i + 1}: User: ${sortedhighscores[i].username} Score: ${sortedhighscores[i].highscore}`
                message.innerText += "\n";
            } else if (i == this.response.response.length - 1) {
                message.innerText += `${i + 1}: User: ${sortedhighscores[i].username} Score: ${sortedhighscores[i].highscore}`
            } else {
                message.innerText += `${i + 1}: User: ${sortedhighscores[i].username} Score: ${sortedhighscores[i].highscore}`
                message.innerText += "\n";
            }
        }
    } else {
        message.innerText = this.response.message;
    }
}
function authenticator() {
    let status = document.getElementById("authenticated");
    status.style.display = "block";

    if (this.response.success) {
        status.innerText = this.response.message;
        authenticated = true;
    } else {
        status.innerText = this.response.message;
        authenticated = false;
    }
}



// implement function that upon gameend, saves user highscore if its better than their previous high highscore and 
// loads that highscore to leaderboard database, which is then called to see their sorted list.

