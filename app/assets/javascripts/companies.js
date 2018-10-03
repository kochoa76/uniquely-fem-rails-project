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
      getCompanies();
    })
  }

  $(document).on('click', ".show_link", function(event){
    event.preventDefault()
    let id = ($(this).attr('data-id'))
    // console.log(id)
      // fetch(`/companies/${id}.json`)
      // .then(res => res.json())
      // .then(company => {
      //   $('#app-container').html('')
      //   let newCompany = new Company(company)
      //   let companyHTML = newCompany.formatShow()
      //   $('#app-container').append(companyHTML)
      // })
      showCompanies(id);
  })

  $(document).on('click', '.next-post', function() {
    let id = $(this).attr('data-id')
    fetch(`companies/${id}/next`)
  })

const showCompanies = (id) => {

    $.ajax({
      method: 'get',
      url: `/companies/${id}.json`,
      success: function(company) {
      $('#app-container').html('')
      let newCompany = new Company(company)
      let companyHTML = newCompany.formatShow()
      $('#app-container').append(companyHTML)
    }
    })
  }

const getCompanies = () => {
//   fetch(`/companies.json`)
//   .then(res => res.json())
//   .then(companies => {
//     $("#app-container").html('')
//     companies.forEach(company => {
//     let newCompany = new Company(company)
//     let companyHTML = newCompany.formatIndex()
//
//     $('#app-container').append(companyHTML)
//     })
//   })
// }
$.ajax({
  method: 'get',
  url: '/companies.json',
  success: function(companies) {
    $("#app-container").html('')
    companies.forEach(company => {
    let newCompany = new Company(company)
    let companyHTML = newCompany.formatIndex()

      $('#app-container').append(companyHTML)
    })
  }
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

Company.prototype.formatShow = function() {
  console.log(this);
  let companyHTML = `
  <h3>${this.name}</h3>
  <button class="next-company">Next</button>
  `
  return companyHTML
}
