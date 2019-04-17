class AddCamposToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :nome, :string, null: false
    add_column :users, :matricula, :string, null: false
    add_column :users, :licenciatura, :string, null: false
    add_column :users, :periodo, :string, null: false
    add_column :users, :role, :integer, :default => 0
    add_column :users, :situacao, :integer, :default => 0
    add_column :users, :pdf_centro, :string, :default => 0
    add_column :users, :pdf_guarus, :string, :default => 0
    add_column :users, :pdf_outros, :string, :default => 0
  end
end
