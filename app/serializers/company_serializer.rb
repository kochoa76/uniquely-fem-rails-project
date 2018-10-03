class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :city, :state, :description
  has_many :reviews
end
