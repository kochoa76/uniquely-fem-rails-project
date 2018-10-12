class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :salary, :job_rating, :women_exec_roles, :recommend, :promo_opps, :user_id, :company_id
  belongs_to :user
  belongs_to :company
end
