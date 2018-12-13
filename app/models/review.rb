class Review < ApplicationRecord
  belongs_to :company
  belongs_to :user
  accepts_nested_attributes_for :company
  validates :salary, presence: true
  validates :company, presence: true
  validates :job_rating, presence: true

  # scope :rating_desc, -> { includes(:job_rating).order(job_rating: :desc) }

  scope :avg_rated, -> {Review.select(:company_id, :job_rating).group(:company_id, :job_rating).order('avg(job_rating) desc').first}

  def company_attributes=(company_attribute)
      self.company = Company.find_or_create_by(company_attribute)
  end

  def next_review
    next_review = Review.where(company_id: company).where("id > ?", id).first

    if next_review
      next_review
    else
      Review.where(company_id: company).first
    end
  end




end
