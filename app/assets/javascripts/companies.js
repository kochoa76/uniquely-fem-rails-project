// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//

  $(document).on("click", ".seeMore", function(){
    let id= ($(this).attr('data-id'))
      seeMore(id);
  }
)

$(() => {
  $(document).on("click", "#sortedReviews", function(event) {
    event.preventDefault();
    console.log(event)
    let href = $(this).attr("href")
    seeSortedReviews(href);
  })
})


  const seeSortedReviews = (href) => {
    $.ajax({
      method: 'get',
      url: href,
      dataType: "json",
      success: function(company) {

      company.reviews.sort(function(a, b){
        return a.job_rating - b.job_rating
      })
      company.reviews.forEach(review => {
        let seeSortedReviews=
        `
         <p>${review.job_rating}</p>
         <p>${review.content}</p>

        `
        
        $(".sortedReviews").append(seeSortedReviews)
      })
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

function Company(company) {
  this.id= company.id
  this.name = company.name
  this.size = company.size
  this.city = company.city
  this.state = company.state
  this.description = company.description
}


  Company.prototype.formatSeeMore = function() {
    console.log(this.description)
    let seeMoreHTML = `
    <span><strong>Location:</strong> ${this.city}
    <strong>Employees:</strong> ${this.size} </span>
    <p> ${this.description}</p>

   `
   return seeMoreHTML
  }
