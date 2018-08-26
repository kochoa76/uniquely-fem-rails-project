class CompaniesController < ApplicationController
  def index
    @companies = Company.all
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

  def edit
  end

  def show
     @company = Company.find(params[:id])
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
      :size)
  end
end
