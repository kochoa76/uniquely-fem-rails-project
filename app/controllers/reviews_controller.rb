class ReviewsController < ApplicationController

  def index
    @company = Company.find(params[:company_id])
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @company}
    end 
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

    def highest_rated
      # @review = Review.avg_rated
      @reviews = Review.all

    end

     def edit
            @company = Company.find(params[:company_id])
            @review = @company.reviews.find(params[:id])
        end

    def update
            @company = Company.find(params[:company_id])
            @review = @company.reviews.find(params[:id])
            if @review.update(reviews_params)
                redirect_to company_reviews_path(@company)
            else
                render :edit
            end
        end

    def destroy
            @company= Company.find(params[:company_id])
            @review = @company.reviews.find(params[:id])
            if @review.user_id == current_user.id
              @review.destroy
              redirect_to company_reviews_path(@company)
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
