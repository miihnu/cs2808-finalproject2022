document.addEventListener("DOMContentLoaded", (event) => {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    url = `/leaderboard`
    xhr.responseType = "json";   
    xhr.open("GET", url)
    console.log("GET leaderboard request to server....");
    xhr.send()
});

// const loadLeaderboard = setInterval(leaderboard, 5000)

function leaderboard() {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    url = `/leaderboard`
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
        let sortedScores = this.response.response.sort((a,b) => b.score - a.score)
        for (let i = 0; i < this.response.response.length; i++) {
            if (i == 0) {
                message.innerText = `${i + 1}: User: ${sortedScores[i].username} Score: ${sortedScores[i].score}`
                message.innerText += "\n";
            } else if (i == this.response.response.length - 1) {
                message.innerText += `${i + 1}: User: ${sortedScores[i].username} Score: ${sortedScores[i].score}`
            } else {
                message.innerText += `${i + 1}: User: ${sortedScores[i].username} Score: ${sortedScores[i].score}`
                message.innerText += "\n";
            }
        }
    } else {
        message.innerText = this.response.message;
    }
}

// implement function that upon gameend, saves user score if its better than their previous high score and 
// loads that score to leaderboard database, which is then called to see their sorted list.

