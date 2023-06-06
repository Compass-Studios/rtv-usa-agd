class Order < ApplicationRecord
  after_initialize :set_default_values

  belongs_to :user
  belongs_to :product

  validates :user, presence: true, allow_nil: false
  validates :product, presence: true, allow_nil: false
  validates :quantity, presence: true, allow_nil: false

  def set_default_values
    self.price ||= self.product.price if self.product
    self.status ||= 'Pending'
  end
end
