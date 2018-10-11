// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//


$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
    $('.companyInfo').on('click', (event) => {
      event.preventDefault();
      history.pushState(null, null, "/companies")
      showCompanies();
    })
  }

  $(document).on("click", ".seeMore", function(){
    let id= ($(this).attr('data-id'))
      seeMore(id);
  }
)

  $(document).on('click', ".show_link", function(event){
    event.preventDefault();
    let id = ($(this).attr('data-id'))
    history.pushState(null, null, `/companies/${id}`)
      showCompanies(id);
  })

  $(document).on('click', '.next-company', function(event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    let trueId = parseInt(id) + 1
    history.pushState(null, null, `/companies/${trueId}`)
    nextCompany(id);
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

  const seeMore = (id) => {
    $.ajax({
      method: 'get',
      url: `/companies/${id}.json`,
      success: function(company) {
      $("#descrip-" +id).html('')
          let newCompany = new Company(company)
          let seeMoreHTML = newCompany.formatSeeMore();

          $('#descrip-' + id).append(seeMoreHTML);
        }
      })
    }




const getCompanies = () => {

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

const nextCompany = (id) => {

  $.ajax({
    method: 'get',
    url: `/companies/${id}/next.json`,
    success: function(company) {
    $("#app-container").html('')
      let newCompany = new Company(company)
      let nextCompanyHTML = newCompany.formatNext()

      $('#app-container').append(nextCompanyHTML)
    }
  })
  }


function Company(company) {
  this.id= company.id
  this.name = company.name
  this.size = company.size
  this.city = company.city
  this.state = company.state
  this.description = company.description
}

Company.prototype.formatIndex = function() {
  let companiesHTML = `
  <a href="/companies/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.name}</h1></a>
  `
  return companiesHTML
}

Company.prototype.formatShow = function() {
  console.log(this)
  let companyHTML = `

  <h3>Company Name: ${this.name}</h3>
  <h3>Number of Employees: ${this.size} </h3>
  <h3> Location (City): ${this.city} </h3>
  <h3> Location (State): ${this.state} </h3>
  <h3> Reviews: ${this.reviews}</h3>
  <a class="next-company" data-id="${this.id}" href="/companies/${this.id}/next.json">See Next Company</a>

  `
  return companyHTML
}

Company.prototype.formatNext = function() {
  let nextHTML = `

  <h3>Company Name: ${this.name}</h3>
  <h3>Number of Employees: ${this.size} </h3>
  <h3> Location (City): ${this.city} </h3>
  <h3> Location (State): ${this.state} </h3>
  <a class="next-company" data-id="${this.id}" href="/companies/${this.id}/next.json">See Next Company</button>
  `
  return nextHTML
  }

  Company.prototype.formatSeeMore = function() {
    console.log(this.description)
    let seeMoreHTML = `
    <p> ${this.description}</p>
   `
   return seeMoreHTML
  }
