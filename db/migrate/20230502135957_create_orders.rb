class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.float :price
      t.integer :quantity
      t.string :status

      t.timestamps
    end
  end
end
