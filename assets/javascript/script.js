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

/* search button (event listener) */
// const formSubmit = document.querySelectorAll("#button")

// formSubmit.addEventListener("click", function(event){
//     event.preventDefault();
//     formSubmit.style.display = "flex"
// })

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

/* Horoscope API



/*

/* GIPHY API




*/

