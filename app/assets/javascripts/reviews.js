

$(() => {
  reviewClickHandlers()
})

const reviewClickHandlers = () => {
  $(document).on("click", ".js-nextReview", function() {
    let reviewId = $(this).attr('data-id')
    let companyId = $('.companyReviews').attr("data-id")
    // let trueId = parseInt(reviewId) + 1
    // history.pushState(null, null, `companies/${companyId}/reviews/${trueId}`)
    companyName(companyId);
    seeNextReview(companyId, reviewId);
  })
}

$(document).on("click", ".next-review", function() {
  let reviewId = $(this).attr('data-id')
  let companyId = $('.companyReviews').attr("data-id")
  companyName(companyId);
  seeNextReview(companyId, reviewId)
})

const companyName = (companyId) => {
  $.ajax({
    method: 'get',
    url: `/companies/${companyId}.json`,
    success: function(company){
      $("#app-container").html('')
      let newCompany = new Company(company)
      let seeCompanyNameHTML = newCompany.formatCompanyName();
      $("#app-container").append(seeCompanyNameHTML)
    }
  })
}

// const showReview = (companyId) => {
//   $.ajax({
//     method: 'get',
//     url: `/companies/${companyId}/reviews.json`
//     success: function(company) {
//       $('#app-container').html('')
//       let newCompany = new Company(company)
//       let companyHTML = newCompany.formatShow()
//       $('#app-container').append(companyHTML)
//     }
//     })
//   }


const seeNextReview = (companyId, reviewId) => {
  $.ajax({
    method: 'get',
    url: `/companies/${companyId}/next_review.json`,
    success: function(review) {

        let newReview = new Review(review)
        let nextReviewHTML = newReview.formatNextReview();
        $("#app-container").append(nextReviewHTML)
        $("#app-container").css({"border": "1px solid #999", "background": "#fff", "border-radius": "5px", "padding-top": "15px", "padding-bottom": "25px", "padding-left": "25px", "padding-right": "25px", "text-align": "left", "margin": "60px"});
        $(".js-nextReview").css({"border": "1px solid", "color": "#4B0082", "border-color": "#4B0082", "font-size": "16px", "border-radius": "5px", "font-family": "serif"})
      }
    })
}

function Review(review, user) {
  this.id = review.id
  this.user_id = review.user_id
  this.company_id = review.company_id
  this.content = review.content
  this.salary = review.salary
  this.job_rating = review.job_rating
  this.promo_opps = review.promo_opps
  this.women_exec_roles = review.women_exec_roles
  this.created_at = review.created_at
  this.recommend = review.recommend
  this.username = review.user.username


}

Company.prototype.formatCompanyName = function() {
  seeCompanyNameHTML = `
    <h2><strong> Reviews for ${this.name}</strong></h2>
    `
    return seeCompanyNameHTML
  }

// Company.prototype.formatShow = function() {
//   showReviewHTML = `
//   <p><strong>${this.username}</strong> says:</p>
//   <li><strong>salary:</strong><br>${this.salary}</li></br>
//   <li><strong>Women in leadership positions?</strong><br>${this.women_exec_roles}</li></br>
//   <li><strong>Opportunities for promotion?</strong><br>${this.promo_opps}</li></br>
//   <li><strong>Would you recommend a friend? </strong><br>${this.recommend}</li></br>
//   <li><strong>Overall job satisfaction rating?(1-5) </strong><br>${this.job_rating}</li></br>
//   <li><strong>Other details (i.e. Maternity leave, remote work, training etc.)</strong></li>
//     ${this.content}</p><br>
//   <a class="js-nextReview" data-id="${this.id}" href="/companies/${this.company_id}/next_review.json">See Next Review></a><br></br>
//   `
//   return showReviewHTML
// }

Review.prototype.formatNextReview = function() {
  console.log(this)
let companyId = $('.companyReviews').attr("data-id")

  seeNextReviewHTML = `
  <p><strong>${this.username}</strong> says:</p>
  <li><strong>salary:</strong><br>${this.salary}</li></br>
  <li><strong>Women in leadership positions?</strong><br>${this.women_exec_roles}</li></br>
  <li><strong>Opportunities for promotion?</strong><br>${this.promo_opps}</li></br>
  <li><strong>Would you recommend a friend? </strong><br>${this.recommend}</li></br>
  <li><strong>Overall job satisfaction rating?(1-5) </strong><br>${this.job_rating}</li></br>
  <li><strong>Other details (i.e. Maternity leave, remote work, training etc.)</strong></li>
    ${this.content}</p><br>
  <a class="js-nextReview" data-id="${this.id}" href="/companies/${this.company_id}/next_review.json">See Next Review></a><br></br>

  `
  return seeNextReviewHTML
}
