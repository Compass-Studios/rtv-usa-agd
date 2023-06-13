class AddClearanceToAdminUsers < ActiveRecord::Migration[7.0]
  def self.up
    change_table :admin_users do |t|
      t.string :encrypted_password, limit: 128
      t.string :confirmation_token, limit: 128
      t.string :remember_token, limit: 128
    end
    add_index :admin_users, :email
    add_index :admin_users, :confirmation_token, unique: true
    add_index :admin_users, :remember_token, unique: true
    Clearance.configuration.user_model.where(remember_token: nil).each do |user|
      user.update_columns(remember_token: Clearance::Token.new)
    end
  end

  def self.down
    remove_index :admin_users, :email
    remove_index :admin_users, :confirmation_token, unique: true
    remove_index :admin_users, :remember_token, unique: true
    change_table :admin_users do |t|
      t.remove :encrypted_password
      t.remove :confirmation_token
      t.remove :remember_token
    end
  end
end
