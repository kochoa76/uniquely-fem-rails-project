// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//


$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
    $('.get_main_page').on('click', (event) => {
      event.preventDefault();
      fetch(`/companies.json`)
      .then((res) => res.json())
      .then(data => console.log(data))
    })
  }
