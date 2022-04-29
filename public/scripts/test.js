let nextPageToken = ''
let apikey = "AIzaSyAPdUeWlJXE9XOmbnsAHf_Q0Hu63g0fHcY"
let button = document.getElementById("test")
let playlist = ["MKM90u7pf3U","1fpkdSfPzio","d9BMPmfxaoM", "6oHdAA3AqnE", "CZ_-O31R3p4",
    "yt3rfHIijZQ", "k8JflBNovLE", "EbDMNjT-QpI", "DTq4XEliPag"]
curr = 0;
currSong = "fMjasXiIhiQ"
let url1 = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCs6eXM7s8Vl5WcECcRHc2qQ&maxResults=5&order=relevance&q=moon&type=video&videoEmbeddable=true&key=" + apikey + "&pageToken=" + nextPageToken
button.addEventListener("click", (event) => {
    event.preventDefault()
    getVideos();
})
document.getElementById("next-song").addEventListener("click", (event) => {
    nextSong();
    document.getElementById("kanye-video").setAttribute("src", "https://www.youtube.com/embed/" + currSong)
})

function getVideos() {
    fetch(url1)
        .then((result) => {
            return result.json()
        }) .then((data) => {
        nextPageToken = data.nextPageToken;
        let videos = data.items;
        let videoContainer = document.querySelector(".youtube-container");
        for (let video of videos) {
            videoContainer.innerHTML += `<img src=${video.snippet.thumbnails.high.url} height="250" width="250"}>`
        }
        url1 = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCs6eXM7s8Vl5WcECcRHc2qQ&maxResults=5&order=relevance&q=moon&type=video&videoEmbeddable=true&key=" + apikey + "&pageToken=" + nextPageToken
    })
}
function nextSong() {
    curr += 1;
    let temp = curr % playlist.length;
    currSong = playlist[temp];
}
