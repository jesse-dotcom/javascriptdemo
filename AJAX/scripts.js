//  XMLHttpRequest -luokka joka vaaditaan AJAX toiminnetta varten
const ourRequest = new XMLHttpRequest();

// Luodaan nappi AJAX hakua varten
const buttonGET = document.querySelector(".button-get");
// Luodaan painike joka poistaa elokuvan sivulta
const buttonREMOVE = document.querySelector(".button-remove");

// Syöte kenttä
const input = document.querySelector(".input-field");
// Kenttä joka näyttää haetun elokuvan tiedot
const showingDiv = document.querySelector(".data-show");

let movieCount = 0;

// Tapahtuma mikä käynnistää AJAX pyynnön
buttonGET.addEventListener("click", function() {
    if(++movieCount > 1) {
        document.querySelector("body").style.overflow = "visible";
        movieCount = 0;
    }

    // Tämän avulla saadaan haku näkyviin ennen AJAX komentoa niin tiedämme minkä elokuvan valita
    const gottenInput = input.value;
    
    input.value = "";

    // Jos syöte on tyhjä niin silloin haku ei toimi
    if(gottenInput.length > 0) {
        
        ourRequest.open("GET", `https://www.omdbapi.com/?t=${gottenInput}&apikey=98c1e3ac`);

        
        ourRequest.onload = function() {
            // JSON muutettava objekteiksi ja taulukoiksi
            const data = JSON.parse(ourRequest.responseText);

            
            if(data.Response === "False") {
                wrongTitleDisplay();
            } else {
                // funktio joka toimii silloin kun hakuun kirjoitetaan oikea nimi
                appendHTML(data);

                
                const removeX = document.querySelector(".remove");

                removeX.addEventListener("click", function(e) {
                    
                    e.target.parentNode.remove();
                })
            }
            
        }
        
        ourRequest.send();
    }
});

// Luodaan tapahtuma painikkeelle joka poistaa tiedot sivulta
buttonREMOVE.addEventListener("click", function() {
    showingDiv.innerHTML = "";

    document.querySelector("body").style.overflow = "hidden";
})


function appendHTML(dt) {
    
    const htmlString = 
    `
    <div class="main">
        <div class="main-left">
            <h1 class="title">${dt.Title}</h1>
            <img src="${dt.Poster}" alt="${dt.Title}-movie-poster">
            <p class="movie-genre">Genre: ${dt.Genre}</p>
            <p class="movie-release">Release Date: ${dt.Released}</p>
        </div>
        <div class="main-right">
            <div class="rating-div">
                <p>IMDb rating</p>
                <p class="rating-number">${dt.imdbRating}</p>
            </div>
            <p class="director">Director: ${dt.Director}</p>
            <p class="actors">Actors: ${dt.Actors}</p>
            <p class="movie-plot">Plot: ${dt.Plot}</p>
        </div>
        <div class="remove">x</div>
    </div>`;


    // Tämä funktio muokkaa saadut arvot oikeaan HTML muotoon

    showingDiv.insertAdjacentHTML("afterbegin", htmlString);
}

// funkito mitä kutsutaan jos käyttäjä kirjoittaa virheellisen arvon syötteeseen
function wrongTitleDisplay() {
    const wrongTitleDiv = document.querySelector(".wrong-title-div");
    const wrongTitleButton = document.querySelector(".btn-wrong-title");

    wrongTitleDiv.style.display = "flex";

    wrongTitleButton.addEventListener("click", function() {
        wrongTitleDiv.style.display = "none";
    })
}