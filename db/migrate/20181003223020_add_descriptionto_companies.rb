class AddDescriptiontoCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :description, :string
  end
end
