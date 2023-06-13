class CreateAdminUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :admin_users do |t|
      t.string :email

      t.timestamps
    end
  end
end
