window.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#kanye").addEventListener('click', function() {
        kanye();
    })
})

function kanye() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceivedHandler);
    xhr.responseType = "json";
    xhr.open("GET", "https://api.kanye.rest/")
    xhr.send()
}

function responseReceivedHandler() {
    // console.log(this.response);
    
    if (this.status === 200) {
       // console.log(`Kanye Quote: ${this.response.quote}`);

       let kanyeParagraph = document.getElementById("kanyeQuote");
       kanyeParagraph.innerHTML = `<i>${this.response.quote}</i>`;
       
    } else {
       console.log("failure");
       
    }
 }