let sign_search = "libra%20zodiac%20sign";
let offset = 1;

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




/* modal buttons (for loop - event listener)



*/

/* Horoscope API */
// Event listener for the "Save changes" button in the modal

  document.querySelector('.modal-card-foot .is-success').addEventListener('click', () => {

    const selectedSign = document.querySelector('#horoscope-modal select[name="zodiac-sign"]').value; 
    // console.log(selectedSign) 
    const selectedDay = document.querySelector('#horoscope-modal select[name="day"]').value;
    // console.log(selectedDay)
    const selectedTimeFrame = document.querySelector('#horoscope-modal select[name="time-frame"]').value;
    // console.log(selectedTimeFrame)
    const horoscopeURL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${selectedTimeFrame}?sign=${selectedSign}&day=${selectedDay}`;
    const gifURL = `https://api.giphy.com/v1/gifs/search?api_key=PBjbldrcJfkATLfhbj07XguuikPsv0qv&q=${selectedSign}&limit=1&offset=${offset}&rating=g`;
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

    fetch(corsProxyUrl + horoscopeURL)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// fetch(horoscopeURL)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => console.error('Error fetching Horoscope:', error));


// return fetch(corsProxyUrl + gifURL);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('GIF:', data);
//     })
//     .catch(error => console.error(error));

fetch(gifURL)
.then(response => response.json())
.then(gifData => {
    console.log('GIF:', gifData);

    // Get the reference to the gif-container div
    const gifContainer = document.getElementById("gif-container");

    // Create a new image element
    const gifImage = document.createElement("img");

    // Set the src attribute of the image to the GIF URL from the Giphy API
    gifImage.src = gifData.data[0].images.original.url;

    // Append the image to the gif-container div
    gifContainer.appendChild(gifImage);
})
.catch(error => console.error('Error fetching GIF:', error));

    document.querySelector('.header').style.display = "none"
})





