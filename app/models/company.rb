class Company < ApplicationRecord
  has_many :reviews
  has_many :users, :through=> :reviews
  validates :name, presence: true
  validates :name, uniqueness: true

  # def self.company_highest_rating
  #   rating_desc.first
  # end

  # scope :avg_rated, -> {group(:company_id).order('avg(job_rating) desc').first}
  # scope :avg_rated_company, -> {group(:company_id).order('avg(job_rating) desc').first}

  def next
    company = Company.where("id > ?", id).first

    if company
      company
    else
      Company.first
    end

  end




end
