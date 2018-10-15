

$(() => {
  reviewClickHandlers()
  seeReviews();
  submitReview();
})

const reviewClickHandlers = () => {
  $(document).on("click", ".js-nextReview", function(event) {
    event.preventDefault();
    let reviewId = $(this).attr('data-id')
    let companyId = $('.companyReviews').attr("data-id")
    let href = $(this).attr("href")
    companyName(href);
    seeNextReview(companyId, reviewId);
  })
}

const seeReviews = () => {
  $(document).on("click", "a#js-seeAllReviews", function(event){
    event.preventDefault();
    let href = $(this).attr("href")
     history.pushState(null, null, "/reviews")
    seeAllReviews(href)
  })
}

const submitReview = () => {
  $("form#new_review").on("submit", function(event){
    event.preventDefault();
    var $form = $(this)
    var action = $form.attr("action");
    var params = $form.serialize()
    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST",
    })
    .success(function(json){
      $('#app-container').html("")
      reviewFormat(json)
    })
  })
}

const companyName = (href) => {
  $.ajax({
    method: 'get',
    url: href,
    dataType: "json",
    success: function(company){
      $("#app-container").html("")
      let newCompany = new Company(company)
      let companyNameHTML = newCompany.formatCompanyName();
      $("#app-container").append(companyNameHTML)

    }
  })
}

Company.prototype.formatCompanyName = function() {
  seeCompanyNameHTML = `
    <h2><strong> Reviews for ${this.name}</strong></h2>
    `
    return seeCompanyNameHTML
  }

const seeAllReviews= (href) => {
  $.ajax({
    method: 'get',
    url: href,
    dataType: "json",
    success: function(reviews){
      $("#app-container").html("")
      reviews.forEach(review => {

         allReviewsHTML = `
        <h3><strong>Review for ${review.company.name}</strong></h3>
        <p><strong>${review.user.username}</strong> says: </p>
        <li><strong>salary:</strong> ${review.salary}</li>
        <li><strong>Women in leadership positions?:</strong> ${review.women_exec_roles}</li>
        <li><strong>Opportunities for promotion?:</strong> ${review.promo_opps} </li>
        <li><strong>Would you recommend a friend?: </strong> ${review.recommend}</li>
        <li><strong>Overall job satisfaction rating?:(1-5)  </strong> ${review.job_rating}</li>
        <li><strong>Other details (i.e. Maternity leave, remote work, training etc.): </strong> ${review.content}</li>
        `
        $("#app-container").append(allReviewsHTML).css({"border": "1px solid #999", "background": "#fff", "border-radius": "5px", "padding-top": "15px", "padding-bottom": "25px", "padding-left": "25px", "padding-right": "25px", "text-align": "left", "margin": "60px"})
      })
      }
    })
  }

const seeNextReview = (companyId, reviewId) => {
  $.ajax({
    method: 'get',
    url: `/companies/${companyId}/reviews/${reviewId}/next_review.json`,
    success: function(review) {

        let newReview = new Review(review)
        let nextReviewHTML = newReview.formatNextReview();
        $("#app-container").append(nextReviewHTML)
        $("#app-container").css({"border": "1px solid #999", "background": "#fff", "border-radius": "5px", "padding-top": "15px", "padding-bottom": "25px", "padding-left": "25px", "padding-right": "25px", "text-align": "left", "margin": "60px"});
        $(".js-nextReview").css({"border": "1px solid #999", "color": "#4B0082", "border-color": "#4B0082", "font-size": "16px", "padding": "3px", "border-radius": "5px", "font-family": "serif"})
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
  <p><strong>${this.username}</strong> says:</p>
  <li><strong>salary:</strong><br>${this.salary}</li></br>
  <li><strong>Women in leadership positions?</strong><br>${this.women_exec_roles}</li></br>
  <li><strong>Opportunities for promotion?</strong><br>${this.promo_opps}</li></br>
  <li><strong>Would you recommend a friend? </strong><br>${this.recommend}</li></br>
  <li><strong>Overall job satisfaction rating?(1-5) </strong><br>${this.job_rating}</li></br>
  <li><strong>Other details (i.e. Maternity leave, remote work, training etc.)</strong></li>
    ${this.content}</p><br>
  <a class="companyReviews" data-id="${this.company_id}">
  <a class="js-nextReview" data-id="${this.id}"><strong>See Next Review..</strong></a><br></br>

  `
  return seeNextReviewHTML
}

const reviewFormat=(json)=> {
  seeReviewHTML = `
  <h2> Thank you for submitting your review! </h2>

  <p><strong>Your review for ${json.company.name}:</strong>
  <li><strong>salary:</strong> ${json.salary}</li>
  <li><strong>Women in leadership positions?:</strong> ${json.women_exec_roles}</li>
  <li><strong>Opportunities for promotion?:</strong> ${json.promo_opps} </li>
  <li><strong>Would you recommend a friend?: </strong> ${json.recommend}</li>
  <li><strong>Overall job satisfaction rating?:(1-5)  </strong> ${json.job_rating}</li>
  <li><strong>Other details (i.e. Maternity leave, remote work, training etc.): </strong> ${json.content}</li>
  </p>
  <input type="button" onclick="location.href='/companies'" class="buttonTo" value="Main Page"</input><br>
  `
  $("#app-container").append(seeReviewHTML).css({"border": "1px solid #999", "background": "#fff", "border-radius": "5px", "padding-top": "15px", "padding-bottom": "25px", "padding-left": "25px", "padding-right": "25px", "text-align": "left", "margin": "60px"});
}
