class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :company_id
      t.integer :user_id
      t.string :content
      t.integer :salary
      t.integer :job_rating
      t.boolean :women_exec_roles
      t.boolean :promo_opps
      t.boolean :recommend 
      t.timestamps
    end
  end
end
