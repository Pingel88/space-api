/*eslint-disable*/
import $ from 'jquery';
/*eslint-disable*/
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import EpicEarth from './js/services/epic-earth.js';
import Pixabay from './js/services/pixabay.js'

function randomImage(length) {
  return Math.floor(Math.random() * length);
}


$(document).ready(function() {
  $('#dateForm').submit(function(event) {
    event.preventDefault();
    const userDateInput = $('#date-input').val();
    const dateSlash = userDateInput.replace(/-/g, "/");
    (async function() {
      const earthResponse = await EpicEarth.makeEpicApiCall(userDateInput);
      if (earthResponse.length === 0) {
        $('#image').html("<h1>please select another date</h1>");
      } else {
        console.log(earthResponse);
        const imageNumber = randomImage(earthResponse.length);
        const imageFile = earthResponse[imageNumber].image;
        $('#image').html(`<img src="https://epic.gsfc.nasa.gov/archive/enhanced/${dateSlash}/png/${imageFile}.png" alt="EPIC Image">`);
      }
    })();
  })
  $('#imageForm').submit(function(event) {
    event.preventDefault();
    const userSearchInput = $('#image-input').val();
    (async function () {
      const imageResponse = await Pixabay.makePixabayApiCall(userSearchInput);
      if (imageResponse.total === 0) {
        $('#pixaImage').html("<p>No results found. Please enter a different input.</p>");
      } else {
        const pixaImageNumber = randomImage(imageResponse.hits.length);
        const pixaImageUrl = imageResponse.hits[pixaImageNumber].largeImageURL;
        const pixaTags = imageResponse.hits[pixaImageNumber].tags;
        $('#pixaImage').html(`<img src="${pixaImageUrl}" alt="${pixaTags}">`)
      }
      console.log(imageResponse);
    })();
  })
})