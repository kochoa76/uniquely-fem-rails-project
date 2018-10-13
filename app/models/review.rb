class Review < ApplicationRecord
  belongs_to :company
  belongs_to :user
  accepts_nested_attributes_for :company
  validates :salary, presence: true
  validates :company, presence: true
  validates :job_rating, presence: true

  # scope :rating_desc, -> { includes(:job_rating).order(job_rating: :desc) }

  # scope :avg_rated, -> {group(:company_id).order('avg(job_rating) desc').first}
  # scope :avg_review, -> {group(:company_id).order('avg(job_rating) desc').first}

  def company_attributes=(company_attribute)
      self.company = Company.find_or_create_by(company_attribute)
  end

  def next_review
    next_review = Review.where(company_id: company).where("id > ?", id).first

    if next_review
      next_review
    else
      Review.first
    end
  end




end
