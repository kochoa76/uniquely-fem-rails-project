class ReviewsController < ApplicationController

  def index
    @company = Company.find(params[:company_id])
  end

  def new
    if !params[:company_id]
      @review = Review.new
      @review.build_company
    else
      @review = Review.new
      @company = Company.find(params[:company_id])
    end
  end


  def create
      if !params[:company_id]
          @review = Review.create(reviews_params)
          @review.user_id = current_user.id
            if @review.save
              redirect_to company_reviews_path(@review.company), :notice => "Thank you for submitting your review"
            else
              redirect_to user_path(current_user), :notice => "boxes can't be blank"
            end
      else
          @company = Company.find(params[:company_id])
          @review = @company.reviews.create(reviews_params)
          @review.user_id = current_user.id
            if @review.save
               redirect_to company_reviews_path(@review.company), :notice => "Thank you for submitting your review"
            else
               redirect_to new_company_review_path, :notice => "boxes can't be blank"
            end
          end
        end

    def show
         @user = User.find(params[:user_id])
         @review = Review.find(params[:id])

         redirect_to :controller => 'reviews', :action => 'show'
     end

     def edit
            @company = Company.find(params[:company_id])
            @review = @company.comments.find(params[:id])
        end

    def update
            @company = Company.find(params[:company_id])
            @review = @company.reviews.find(params[:id])
            if @review.update(review_params)
                redirect_to @company
            else
                render 'companies/show'
            end
        end

    def destroy
            @company= Company.find(params[:company_id])
            @review = @company.reviews.find(params[:id])
            if @review.user_id == current_user.id
              @review.destroy
              redirect_to company_path
            end
          end


  private

  def reviews_params
    params.require(:review).permit(
      :user_id,
      :company_id,
      :content,
      :salary,
      :job_rating,
      :women_exec_roles,
      :promo_opps,
      :recommend,
      company_attributes: [:name]

      )
  end
end
