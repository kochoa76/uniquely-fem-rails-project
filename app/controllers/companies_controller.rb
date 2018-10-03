class CompaniesController < ApplicationController
  def index
    @companies = Company.all
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @companies}
    end
  end

  def new
    @company= Company.new
  end

  def create
    @company= Company.create(company_params)
      if @company.save
        redirect_to company_path(@company)
      end
    end

  def next
  end 

  def edit
    @company = Company.find(params[:id])
  end

  def update
   @company = Company.find(params[:id])
   if @company.update(company_params)
     redirect_to @company
   else
     render :edit
   end
 end

  def show
     @company = Company.find(params[:id])
     respond_to do |f|
       f.html
       f.json {render json: @company}
     end
  end

  def destroy
      @company= Company.find(params[:id])
        @company.delete
        redirect_to companies_path
      end

  private

  def company_params
    params.require(:company).permit(
      :name,
      :size,
      :city,
      :state)
  end
end
