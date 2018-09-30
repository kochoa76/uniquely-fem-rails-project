class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :size
  has_many :reviews
end
