class Review < ApplicationRecord
  belongs_to :company
  belongs_to :user
  accepts_nested_attributes_for :company
  validates :salary, presence: true
  validates :company, presence: true
  validates :job_rating, presence: true


  def company_attributes=(company_attribute)
      self.company = Company.find_or_create_by(company_attribute)
  end
end
