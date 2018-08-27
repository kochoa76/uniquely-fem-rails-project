class Company < ApplicationRecord
  has_many :reviews
  has_many :users, :through=> :reviews
  validates :name, presence: true
  validates :name, uniqueness: true

  # def self.company_highest_rating
  #   rating_desc.first
  # end

  


end
