class ReviewsController < ApplicationController

  def index
    @company = Company.find(params[:company_id])
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @company, include: :reviews}
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
              respond_to do |f|
                f.html {redirect_to company_reviews_path(@review.company) }
                f.json {render json: @review}
              end
            else
              redirect_to user_path(current_user), :notice => "boxes can't be blank"
            end
      else
          @company = Company.find(params[:company_id])
          @review = @company.reviews.create(reviews_params)
          @review.user_id = current_user.id
            if @review.save
              respond_to do |f|
                f.html {redirect_to company_reviews_path(@review.company)}
                f.json {render json: @review}
              end
            else
               redirect_to new_company_review_path, :notice => "boxes can't be blank"
            end
          end
        end

        def next_review
          @review = Review.find(params[:id])
          @next_review = @review.next_review
          respond_to do |f|
            f.html {render @next_review}
            f.json {render json: @next_review.to_json(
              { :include => [
                  user: {
                    only: [:username]
                  },
                  company: {
                   only: [:name]
                  }
                ]
              }
            )
          }
          end
        end

    def all_reviews
      @reviews = Review.all
      respond_to do |f|
        f.html {render @reviews}
        f.json {render json: @reviews.to_json(
          { :include => [
              user: {
                only: [:username]
              },
              company:{}
            ]
          }
        )
      }
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

    def users_reviews
      @user = User.find_by_id(session[:user_id])
    end

    def show
      @review = Review.find(params[:id])
      respond_to do |f|
        f.html {render @review}
        f.json {render json: @review}
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
