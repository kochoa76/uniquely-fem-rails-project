class CompaniesController < ApplicationController
  before_action :set_company, only: [:next, :edit, :update, :show, :destroy]
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
    @next_company = @company.next
    render json: @next_company
  end

  def edit
  end

  def update
   if @company.update(company_params)
     redirect_to @company
   else
     render :edit
   end
 end

  def show
     respond_to do |f|
       f.html
       f.json {render json: @company}
     end
  end

  def destroy
        @company.delete
        redirect_to companies_path
      end

  private

  def set_company
    @company = Company.find(params[:id])
  end 

  def company_params
    params.require(:company).permit(
      :name,
      :size,
      :city,
      :state)
  end
end
