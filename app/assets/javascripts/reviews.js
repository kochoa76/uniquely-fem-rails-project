

$(() => {
  reviewClickHandlers()
})

const reviewClickHandlers = () => {
  $(document).on("click", ".js-nextReview", function() {
    let reviewId = $(this).attr('data-id')
    let companyId = $('.companyReviews').attr("data-id")
    // let trueId = parseInt(reviewId) + 1
    // history.pushState(null, null, `companies/${companyId}/reviews/${reviewId}`)
    seeNextReview(companyId, reviewId); })
}


const seeNextReview = (companyId, reviewId) => {
  $.ajax({
    method: 'get',
    url: `/companies/${companyId}/next_review.json`,
    success: function(review) {

    $('#app-container').html('')

        let newReview = new Review(review)
        console.log(newReview)
        let nextReviewHTML = newReview.formatNextReview();

        $("#app-container").append(nextReviewHTML)
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

Review.prototype.formatNextReview = function() {
let companyId = $('.companyReviews').attr("data-id")

  seeNextReviewHTML = `
  <h2><strong>${this.company_id}</strong></h2><br>
  <p><strong>${this.username}</strong> says:</p>
  <li><strong>salary:</strong><br>${this.salary}</li></br>
  <li><strong>Women in leadership positions?</strong><br>${this.women_exec_roles}</li></br>
  <li><strong>Opportunities for promotion?</strong><br>${this.promo_opps}</li></br>
  <li><strong>Would you recommend a friend? </strong><br>${this.recommend}</li></br>
  <li><strong>Overall job satisfaction rating?(1-5) </strong><br>${this.job_rating}</li></br>
  <li><strong>Date Review Posted </strong><br>${this.created_at}.strftime('%m-%d-%Y')</li></br>
  <li><strong>Other details (i.e. Maternity leave, remote work, training etc.)</strong></li>
    ${this.content}</p></br>
  <a class="nextReview" href="/companies/${companyId}/next_review.json" data-id="${this.id}"><strong> See Next Review.. </strong></button>
  `
  return seeNextReviewHTML
}
