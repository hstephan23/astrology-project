let selectedSign;
const randomBtn = document.getElementById('random-button');
const previousGifsBtn = document.getElementById('display-gifs');
const gifBtns = document.getElementById("horoscope-container");
const homeBtn = document.getElementById("home");
const headerEl = document.querySelector('header');
const mainEl = document.querySelector('main');
const horoscopeTitle = document.querySelector("#horoscope-title");
const gifContainer = document.querySelector("#gif-container");

function startApplication() {
    selectedSign = document.querySelector('#horoscope-modal select[name="zodiac-sign"]').value;
    const selectedDay = document.querySelector('#horoscope-modal select[name="day"]').value;
    const selectedTimeFrame = document.querySelector('#horoscope-modal select[name="time-frame"]').value;
    horoscopeTitle.textContent = selectedSign;
    callHoroscopeAPI(selectedTimeFrame, selectedDay);
    callGiphyAPI();
    removeHeading();
    gifBtns.classList.remove("is-hidden");
}

function callGiphyAPI() {
    const offset = randomOffset();
    const updatedSign = `${selectedSign}%20zodiac%20sign`
    const gifURL = `https://api.giphy.com/v1/gifs/search?api_key=PBjbldrcJfkATLfhbj07XguuikPsv0qv&q=${updatedSign}&limit=1&offset=${offset}&rating=g`;
    fetch(gifURL)
    .then(response => response.json())
    .then(gifData => {
        // Set the src attribute of the image to the GIF URL from the Giphy API
        gifContainer.src = gifData.data[0].images.original.url;
        accessLocalStorage(gifData.data[0].images.original.url);
    })
    .catch(error => console.error('Error fetching GIF:', error));
};

//function to make things go back to home
function returnHome() {
  headerEl.classList.remove("is-hidden");
  mainEl.classList.remove("is-hidden");
  gifBtns.setAttribute("class", "is-hidden");
  horoscopeTitle.setAttribute("class", "is-hidden");
  gifContainer.setAttribute("class", "is-hidden");
  const previousGifs = document.querySelectorAll(".previousGif");
  if (previousGifs) {
    for (let i = 0; i < previousGifs.length; i++){ 
      previousGifs[i].setAttribute("class", "is-hidden");
    }
  }
}

//function to make things disappear
function removeHeading() {
  headerEl.setAttribute("class", "is-hidden");
  mainEl.setAttribute("class", "is-hidden");
  horoscopeTitle.classList.remove("is-hidden");
  gifContainer.classList.remove("is-hidden");
}

// function to access local storage and verfiy we have necessary data
function accessLocalStorage(url) {
  const storedGifs = localStorage.getItem("gifs");
  if (storedGifs) {
    const gifsArray = JSON.parse(storedGifs);
    if (gifsArray.length > 9) {
      gifsArray.shift();
    }
    gifsArray.push(url);
    localStorage.setItem("gifs", JSON.stringify(gifsArray));
  } else {
    const gifsArray = []
    gifsArray.push(url)
    localStorage.setItem("gifs", JSON.stringify(gifsArray));
  }
}

//function to display gifs
function displayGifs() {
  const previousGifs = document.querySelectorAll(".previousGif");
  // remove the selected index from its piece
  for (let index = 0; index < previousGifs.length; index++){
    previousGifs[index].remove();
  };
  const storedGifs = localStorage.getItem("gifs");
  if (storedGifs) {
    const gifsArray = JSON.parse(storedGifs);
    //create the image and display it
    for (let i = 0; i < gifsArray.length; i++){
      const createImg = document.createElement("img");
      createImg.src = gifsArray[i];
      createImg.setAttribute("class", "previousGif");
      const gifsSection = document.getElementById("previous-gifs");
      gifsSection.append(createImg);
    }
  } else {
    return;
  }
};

/* function for random offset */
function randomOffset() {
  const random = Math.floor(Math.random() * 49);
  return random;
};
//

/* function for showing correct options */
function showDaily() {
  const element = document.querySelector('#daily');
  const selectedOption = document.querySelector('#horoscope-modal select[name="time-frame"]').value;
  if (selectedOption === "daily") {
    element.classList.remove("is-hidden");
  } else {
    element.setAttribute("class", "is-hidden");
  };
};

//

/* Horoscope API */
function callHoroscopeAPI(selectedTimeFrame, selectedDay) {
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let horoscopeURL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${selectedTimeFrame}?sign=${selectedSign}&day=${selectedDay}`;
    if (selectedTimeFrame === "monthly" || selectedTimeFrame === "weekly") {
      horoscopeURL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${selectedTimeFrame}?sign=${selectedSign}`;
    };
    fetch(corsProxyUrl + horoscopeURL)
        .then(response => response.json())
        .then(horoscopeData => {
            const horoscopeQuote = document.getElementById("horoscope-quote");
            const horoscopeDate = document.getElementById("horoscope-date");
            if (selectedTimeFrame === "monthly") {
              horoscopeDate.textContent = horoscopeData.data.month;
            } else if (selectedTimeFrame === "weekly") {
              horoscopeDate.textContent = horoscopeData.data.week;
            } else if (selectedTimeFrame === "daily") {
              horoscopeDate.textContent = horoscopeData.data.date;
            } else {
              console.log("error");
            }
            horoscopeQuote.textContent = horoscopeData.data.horoscope_data;
        })
        .catch(error => console.error(error));
};

// Event listener for the "Save changes" button in the modal
document.querySelector('.modal-card-foot .is-success').addEventListener('click', startApplication);

// Event listener for returning to the "main page"
homeBtn.addEventListener("click", returnHome);

// Event listener for the changing of the selected item
document.querySelector('#time').addEventListener("change", showDaily);

// Event listener for the random button
randomBtn.addEventListener('click', callGiphyAPI);

// Event listener for the previous gifs button
previousGifsBtn.addEventListener('click', displayGifs);

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }
    
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const $target = document.getElementById("horoscope-modal");

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeAllModals();
        }
    });
});






