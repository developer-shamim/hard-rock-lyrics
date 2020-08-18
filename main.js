    // Searech area
    const searchButton = document.getElementById('search-button');
searchButton.addEventListener("click", function(){
    const songName = document.getElementById('text-box').value;
    // console.log(songName);
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => showSearchResult(data))
})

function showSearchResult(data){
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = "";
    searchResult.classList.add("search-result", "col-md-8", "mx-auto", "py-4")
    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const title = element.album.title;
        const artist = element.artist.name;
        const child = ` <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${title}</h3>
                                <p class="author lead">Album by <span>${artist}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyrics('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>`;
        searchResult.innerHTML += child;
    }
}
    
// Code for lyrics

        function getLyrics(artist, title){
            console.log(artist, title);
            fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`) 
            .then(res => res.json())
            .then(function displayLyric(data){
                const currentLyric = data.lyrics;
                let lyric = '';
                const displayArea = document.getElementById("lyricArea");
                lyric=`<button class="btn go-back btn-success" onclick="hide()">Go-Back</button> 
                        <h2 class="text-success mb-4">${title}</h2>
                        <h4 class="text-success mb-4">${artist}</h4>
                        <pre id="lyrics" class="lyric text-white">${currentLyric}</pre>`;
                displayArea.innerHTML = lyric;
        })
        document.getElementById("searchResult").style.display = "none";

        document.getElementById("lyricArea").style.display = "block";
    }
        

    // to remove lyrics
    function hide(){
        const displayArea = document.getElementById("lyricArea");
         displayArea.style.display = "none";

         document.getElementById("searchResult").style.display = "block";
    }