// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//
// $('.grid').masonry({
//   // options...
//   itemSelector: '.grid-item',
//   columnWidth: 200
// });

(() => {
  bindClickHandlers = () => {
    $('get_main_page').on("click", function(event) {
      event.preventDefault();
      fetch(`/companies.json`)
      .then(resp => resp.json())
      .then(data => console.log(data))
    })
  }
})
