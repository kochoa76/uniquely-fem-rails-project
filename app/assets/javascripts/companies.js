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
      history.pushState(null, null, "/companies")
      fetch(`/companies.json`)
      .then(res => res.json())
      .then(companies => {
        $("#app-container").html('')
        companies.forEach(company => {
          let newCompany = new Company(company)
          let companyHTML = newCompany.formatIndex()
          console.log(companyHTML)
          $('#app-container').append(companyHTML)
        })
    })
  })

  $(document).on('click', ".show_link", function(event){
    event.preventDefault()
      let id = ($(this).attr('data-id'))
      fetch(`/companies/${id}.json`)
      .then(res => res.json())
      .then(company => {
        console.log(company)
      })
  })
}

function Company(company) {
  this.id= company.id
  this.name = company.name
  this.size = company.size
  this.city = company.city
  this.state = company.state
}

Company.prototype.formatIndex = function() {
  console.log(this);
  let companyHTML = `
  <a href="/companies/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.name}</h1></a>
  `
  return companyHTML
}
