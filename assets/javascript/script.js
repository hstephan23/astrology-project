let sign = "libra";
let date = "tomorrow";
const URL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${date}`;

let sign_search = "libra%20zodiac%20sign";
let offset = 1;
const gifURL = `https://api.giphy.com/v1/gifs/search/?api_key=PBjbldrcJfkATLfhbj07XguuikPsv0qv&q=${sign_search}&limit=1&offset=${offset}&rating=g`

fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    });

fetch(gifURL)
.then(response => response.json())
.then(data => {
    console.log(data)
})

/* search button (event listener)



*/

/* modal buttons (for loop - event listener)



*/

/* Horoscope API



/*

/* GIPHY API




*/
