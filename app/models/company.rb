class Company < ApplicationRecord
  has_many :reviews
  has_many :users, :through=> :reviews
  validates :name, presence: true
  validates :name, uniqueness: true

end
