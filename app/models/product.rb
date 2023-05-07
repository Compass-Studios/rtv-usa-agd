class Product < ApplicationRecord
  has_one_attached :image
  has_many :orders

  validates :name, presence: true
  validates :price, presence: true

  def image_url(size)
    Rails.application.routes.url_helpers.rails_blob_path(
      self.image.variant(resize_to_limit: [size, size]),
      only_path: true,
    )
  end

  def image_sm
    image_url(256)
  end

  def image_lg
    image_url(1024)
  end
end
