class Product < ApplicationRecord
  has_one_attached :image
  has_many :orders

  validates :name, presence: true
  validates :price, presence: true
end
