/*eslint-disable*/
import $ from 'jquery';
/*eslint-disable*/
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import EpicEarth from './js/epic-earth.js';

function randomImage(length) {
  return Math.floor(Math.random() * length);
}


$(document).ready(function() {
  $('#dateForm').submit(function(event) {
    event.preventDefault();
    const userDateInput = $('#date-input').val();
    const dateSlash = userDateInput.replace(/-/g, "/");
    (async function() {
      const response = await EpicEarth.makeEpicApiCall(userDateInput);
      console.log(response);
      if (response.length === 0) {
        $('#image').html("<h1>please select another date</h1>");
      } else {
        const imageNumber = randomImage(response.length);
        const imageFile = response[imageNumber].image;
        $('#image').html(`<img src="https://epic.gsfc.nasa.gov/archive/enhanced/${dateSlash}/png/${imageFile}.png" alt="EPIC Image">`);
      }
    })();
  })
})