let selectedSign;


function startApplication() {
    // const offset = 1;
    selectedSign = document.querySelector('#horoscope-modal select[name="zodiac-sign"]').value;
    // console.log(selectedSign) 
    const selectedDay = document.querySelector('#horoscope-modal select[name="day"]').value;
    // console.log(selectedDay)
    const selectedTimeFrame = document.querySelector('#horoscope-modal select[name="time-frame"]').value;
    // console.log(selectedTimeFrame)
    // const horoscopeURL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${selectedTimeFrame}?sign=${selectedSign}&day=${selectedDay}`;
    // const gifURL = `https://api.giphy.com/v1/gifs/search?api_key=PBjbldrcJfkATLfhbj07XguuikPsv0qv&q=${selectedSign}&limit=1&offset=${offset}&rating=g`;
    // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const horoscopeTitle = document.getElementById("horoscope-title");
    horoscopeTitle.textContent = selectedSign;

    callHoroscopeAPI(selectedTimeFrame, selectedDay);
    callGiphyAPI();
}

function callGiphyAPI() {
    const offset = 1;
    const gifURL = `https://api.giphy.com/v1/gifs/search?api_key=PBjbldrcJfkATLfhbj07XguuikPsv0qv&q=${selectedSign}&limit=1&offset=${offset}&rating=g`;
    fetch(gifURL)
    .then(response => response.json())
    .then(gifData => {
        // console.log('GIF:', gifData);

        // Get the reference to the gif-container div
        const gifContainer = document.getElementById("gif-container");

        // Set the src attribute of the image to the GIF URL from the Giphy API
        gifContainer.src = gifData.data[0].images.original.url;


    })
    .catch(error => console.error('Error fetching GIF:', error));

document.querySelector('.header').style.display = "none"
};


/* Horoscope API */
function callHoroscopeAPI(selectedTimeFrame, selectedDay) {
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    console.log(selectedSign);
    const horoscopeURL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${selectedTimeFrame}?sign=${selectedSign}&day=${selectedDay}`;
    fetch(corsProxyUrl + horoscopeURL)
        .then(response => response.json())
        .then(horoscopeData => {
            console.log(horoscopeData)

            const horoscopeQuote = document.getElementById("horoscope-quote");
            const horoscopeDate = document.getElementById("horoscope-date");
            horoscopeDate.textContent = horoscopeData.data.date;
            console.log(horoscopeQuote);
            horoscopeQuote.textContent = horoscopeData.data.horoscope_data;
        })
        .catch(error => console.error(error));
};

// Event listener for the "Save changes" button in the modal

document.querySelector('.modal-card-foot .is-success').addEventListener('click', startApplication);

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
        const modal = $trigger.dataset.target;
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






