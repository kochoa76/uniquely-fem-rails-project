class AddColumnToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :city, :string
    add_column :companies, :state, :string 
  end
end
